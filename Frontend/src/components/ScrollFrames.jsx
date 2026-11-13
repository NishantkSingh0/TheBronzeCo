import { useEffect, useRef } from 'react';

const frameFiles = Object.keys(import.meta.glob('/public/ScrollFrames/*.{png,webp,jpg,jpeg}'));
const preferredFrames = new Map();
for (const path of frameFiles) {
  const key = path.replace(/\.[^.]+$/, '');
  if (!preferredFrames.has(key) || path.endsWith('.webp')) preferredFrames.set(key, path);
}
const frames = [...preferredFrames.values()]
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((path) => `${import.meta.env.BASE_URL}${path.replace('/public/', '')}`);

export default function ScrollFrames() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context || !frames.length) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cache = new Map();
    const pending = new Set();
    const ready = new WeakSet();
    const failed = new Set();
    let direction = 1;
    let lookAhead = 0;
    let current = 0;
    let position = 0;
    let lastTime = 0;
    let raf = 0;
    let active = true;
    let nearby = false;
    const edgeMask = document.createElement('canvas');
    const maskContext = edgeMask.getContext('2d');
    let maskKey = '';
    let lastDraw = '';

    const draw = () => {
      const image = cache.get(current);
      const next = cache.get(current + 1);
      if (!active || !image || !ready.has(image)) return;
      const blend = next && ready.has(next) ? Math.round((position - current) * 100) / 100 : 0;
      const drawKey = `${current}:${blend}:${canvas.width}:${canvas.height}`;
      if (drawKey === lastDraw) return;
      lastDraw = drawKey;
      const paint = (frame, opacity) => {
        const scale = Math.min(canvas.width / frame.naturalWidth, canvas.height / frame.naturalHeight);
        const width = frame.naturalWidth * scale;
        const height = frame.naturalHeight * scale;
        context.globalAlpha = opacity;
        context.drawImage(frame, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      };
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      paint(image, 1 - blend);
      if (blend > 0) {
        context.globalCompositeOperation = 'lighter';
        paint(next, blend);
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = 'destination-in';
      const scale = Math.min(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      const left = (canvas.width - width) / 2;
      const top = (canvas.height - height) / 2;
      const geometryKey = `${canvas.width}:${canvas.height}:${width}:${height}`;
      if (maskContext && maskKey !== geometryKey) {
        edgeMask.width = canvas.width;
        edgeMask.height = canvas.height;
        const masks = [
          maskContext.createLinearGradient(left, 0, left + width, 0),
          maskContext.createLinearGradient(0, top, 0, top + height),
        ];
        for (const [index, mask] of masks.entries()) {
          mask.addColorStop(0, 'rgba(0, 0, 0, 0)');
          mask.addColorStop(0.04, 'rgba(0, 0, 0, 0.15)');
          mask.addColorStop(0.12, 'rgba(0, 0, 0, 1)');
          mask.addColorStop(0.88, 'rgba(0, 0, 0, 1)');
          mask.addColorStop(0.96, 'rgba(0, 0, 0, 0.15)');
          mask.addColorStop(1, 'rgba(0, 0, 0, 0)');
          maskContext.globalCompositeOperation = index === 0 ? 'source-over' : 'destination-in';
          maskContext.fillStyle = mask;
          maskContext.fillRect(0, 0, edgeMask.width, edgeMask.height);
        }
        maskKey = geometryKey;
      }
      if (maskContext) context.drawImage(edgeMask, 0, 0);
      context.restore();
    };

    const load = () => {
      if (!active || !nearby) return;
      const priorities = motion.matches ? [0] : [current, current + 1];
      if (!motion.matches) {
        for (let distance = 1; distance <= 16; distance += 1) {
          priorities.push(current + distance * direction);
          if (distance <= 6) priorities.push(current - distance * direction);
        }
        priorities.push(lookAhead, lookAhead + 1);
        for (let distance = 1; distance <= 8; distance += 1) {
          priorities.push(lookAhead + distance * direction);
        }
      }
      const wanted = new Set(priorities.filter((index) => index >= 0 && index < frames.length));
      for (const [index, image] of cache) {
        if (!wanted.has(index) && !pending.has(index)) {
          image.onload = null;
          image.onerror = null;
          image.src = '';
          cache.delete(index);
        }
      }
      for (const index of wanted) {
        if (pending.size >= 4) break;
        if (cache.has(index) || failed.has(index)) continue;
        const image = new Image();
        image.decoding = 'async';
        image.fetchPriority = index === current ? 'high' : 'low';
        cache.set(index, image);
        pending.add(index);
        const finish = (success) => {
          if (!active) return;
          pending.delete(index);
          image.onload = null;
          image.onerror = null;
          if (success) ready.add(image);
          else {
            failed.add(index);
            cache.delete(index);
          }
          schedule();
        };
        image.onload = () => {
          image.decode().then(() => finish(true), () => finish(false));
        };
        image.onerror = () => finish(false);
        image.src = frames[index];
      }
    };

    const update = (time) => {
      raf = 0;
      if (!nearby) {
        lastTime = 0;
        return;
      }
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / distance));
      const sequenceProgress = Math.max(0, Math.min(1, (progress - 0.03) / 0.89));
      const target = motion.matches ? 0 : sequenceProgress * (frames.length - 1);
      direction = target >= position ? 1 : -1;
      lookAhead = Math.floor(target);
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      position += (target - position) * (1 - Math.exp(-elapsed / 45));
      if (motion.matches || Math.abs(target - position) < 0.005) position = target;
      current = Math.floor(position);
      progressRef.current.style.transform = `scaleX(${position / Math.max(1, frames.length - 1)})`;
      load();
      draw();
      if (position !== target) raf = requestAnimationFrame(update);
      else lastTime = 0;
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    const resize = () => {
      lastDraw = '';
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, 1280 / Math.max(1, canvas.clientWidth), 900 / Math.max(1, canvas.clientHeight));
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) schedule();
    }, { rootMargin: '1500px' });
    const resizeObserver = new ResizeObserver(resize);
    observer.observe(section);
    resizeObserver.observe(canvas);
    window.addEventListener('scroll', schedule, { passive: true });
    motion.addEventListener('change', schedule);
    resize();

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      motion.removeEventListener('change', schedule);
      for (const image of cache.values()) {
        image.onload = null;
        image.onerror = null;
        image.src = '';
      }
      cache.clear();
    };
  }, []);

  return (
    <section ref={sectionRef} className="scroll-frames bg-cream-200" aria-labelledby="scroll-frames-heading">
      <div className="scroll-frames-stage">
        <div className="text-center px-6 relative z-10">
          <p className="section-label mb-3">The essence of bronze</p>
          <h2 id="scroll-frames-heading" className="section-heading">A timeless transformation.</h2>
          <p className="body-text mt-3">Discover the beauty behind every piece.</p>
        </div>
        <canvas ref={canvasRef} className="scroll-frames-canvas" role="img" aria-label="An animated transformation of bronze, revealed as you scroll" />
        <div className="scroll-frames-footer">
          <p className="section-label text-center">Scroll to discover <span aria-hidden="true">↓</span></p>
          <a href="#collections" className="text-xs text-brown-600 underline underline-offset-4">Skip to collections</a>
          <div className="h-px w-40 bg-brown-300/30 overflow-hidden" aria-hidden="true">
            <div ref={progressRef} className="h-full bg-brown-400 origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
