import { useEffect, useRef } from 'react';

const frames = Object.keys(import.meta.glob('/public/ScrollFrames/*.{png,webp,jpg,jpeg}'))
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
    let current = 0;
    let position = 0;
    let lastTime = 0;
    let raf = 0;
    let active = true;
    let nearby = false;

    const draw = () => {
      const image = cache.get(current);
      const next = cache.get(current + 1);
      if (!active || !image?.complete || !image.naturalWidth) return;
      const blend = next?.complete && next.naturalWidth ? position - current : 0;
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
      const masks = [
        context.createLinearGradient(left, 0, left + width, 0),
        context.createLinearGradient(0, top, 0, top + height),
      ];
      for (const mask of masks) {
        mask.addColorStop(0, 'rgba(0, 0, 0, 0)');
        mask.addColorStop(0.04, 'rgba(0, 0, 0, 0.15)');
        mask.addColorStop(0.12, 'rgba(0, 0, 0, 1)');
        mask.addColorStop(0.88, 'rgba(0, 0, 0, 1)');
        mask.addColorStop(0.96, 'rgba(0, 0, 0, 0.15)');
        mask.addColorStop(1, 'rgba(0, 0, 0, 0)');
        context.fillStyle = mask;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      context.restore();
    };

    const load = () => {
      const radius = motion.matches ? 0 : 8;
      for (let distance = 0; distance <= radius; distance += 1) {
        for (const index of new Set([current + distance, current - distance])) {
          if (index < 0 || index >= frames.length || cache.has(index)) continue;
          const image = new Image();
          image.decoding = 'async';
          image.onload = () => { if (index === current || index === current + 1) draw(); };
          cache.set(index, image);
          image.src = frames[index];
        }
      }
      for (const [index, image] of cache) {
        if (Math.abs(index - current) > 16) {
          image.onload = null;
          image.src = '';
          cache.delete(index);
        }
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
      const target = motion.matches ? 0 : progress * (frames.length - 1);
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      position += (target - position) * (1 - Math.exp(-elapsed / 75));
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
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) schedule();
    }, { rootMargin: '600px' });
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
