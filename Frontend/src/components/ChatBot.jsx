import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const CHAT_ENDPOINT = `${API_BASE_URL}/api/chat/`;
const MAX_HISTORY_MESSAGES = 6;

async function consumeChatStream(response, onEvent) {
  if (!response.body) {
    throw new Error('The chat response did not include a stream.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const processLines = (text) => {
    buffer += text;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    lines
      .map(line => line.trim())
      .filter(Boolean)
      .forEach(line => onEvent(JSON.parse(line)));
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    processLines(decoder.decode(value, { stream: true }));
  }

  processLines(decoder.decode());
  if (buffer.trim()) {
    onEvent(JSON.parse(buffer));
  }
}

function formatConversationContext(history) {
  return history
    .slice(-MAX_HISTORY_MESSAGES)
    .map(({ role, content }) => `${role}: ${content}`)
    .join('\n');
}

  const bronze_facts = [
    // 🪔 HERITAGE & CULTURE

    'Did you know bronze has been used for sacred objects and vessels in India for centuries?',
    'Have you ever wondered why bronze has remained part of Indian पूजा traditions for generations?',
    'Did you know bronze vessels are found among the ancient metal traditions of the Indian subcontinent?',
    'Did you know bronze was valuable enough in ancient societies to be used for ceremonial and royal objects?',
    'Have you noticed how traditional bronze objects can make a पूजा space feel more timeless?',
    'Did you know many traditional Indian metal crafts are built around skills passed from one generation of artisans to another?',
    'Have you ever wondered why traditional bronze vessels often have designs that look simple but take considerable skill to create?',
    'Did you know the beauty of a handcrafted bronze piece comes from both the material and the artisan’s finishing work?',
    'Have you wondered why traditional metal vessels often become family heirlooms rather than everyday replacements?',
    'Did you know bronze objects can carry both functional and cultural value at the same time?',

    // 🪔 POOJA & SPIRITUAL USE

    'Did you know bronze has a long association with traditional पूजा vessels and ritual objects?',
    'Have you ever noticed how bronze looks especially beautiful beside flowers, diyas, and पूजा decorations?',
    'Did you know the warm golden-brown appearance of bronze naturally complements traditional पूजा settings?',
    'Have you wondered why metal पूजा vessels remain popular even when modern alternatives are easily available?',
    'Did you know a well-crafted bronze पूजा vessel can become part of a family’s festive traditions for years?',
    'Have you ever thought about giving a traditional bronze vessel as a housewarming or festive gift?',
    'Did you know bronze can bring a traditional character to a पूजा room without looking overly decorative?',
    'Have you wondered why traditional vessels often become part of memories associated with festivals and family पूजा?',
    'Did you know the same bronze vessel can move from everyday पूजा use to special occasions and festivals?',
    'Have you ever noticed how bronze looks different under diya light compared with bright indoor lighting?',

    // ✨ BEAUTY & AGING

    'Did you know bronze does not have to stay perfectly shiny to remain beautiful?',
    'Have you wondered why an older bronze object can sometimes look more beautiful than a brand-new one?',
    'Did you know bronze develops a natural surface character as it ages?',
    'Have you noticed the rich brown and golden tones that can appear on aged bronze?',
    'Did you know the changing appearance of bronze is one reason architects and designers love the material?',
    'Have you wondered why bronze can become part of the character of a home rather than simply another decoration?',
    'Did you know two bronze pieces can develop slightly different appearances over time?',
    'Have you ever noticed how bronze looks warmer as its surface develops character?',
    'Did you know patina is a natural surface layer formed through interaction with the environment?',
    'Have you wondered why collectors often prefer preserving an original bronze surface instead of making it look brand new?',
    'Did you know aggressive polishing can remove some of the surface character that makes an older bronze object unique?',
    'Have you ever wondered why some bronze owners deliberately preserve the aged look of their pieces?',

    // 🛠️ CRAFTSMANSHIP

    'Did you know creating a bronze object can involve casting, finishing, polishing, and detailed surface work?',
    'Have you wondered how a craftsman turns molten metal into a detailed vessel?',
    'Did you know bronze casting can reproduce surprisingly fine decorative details?',
    'Have you ever looked at a traditional bronze vessel and wondered how its curves were created?',
    'Did you know the final beauty of a bronze object depends heavily on finishing after casting?',
    'Have you wondered why handmade bronze pieces can have tiny differences from one another?',
    'Did you know those small differences can be evidence of handcrafted production rather than factory uniformity?',
    'Have you ever noticed tiny variations in texture or finish on a handcrafted metal piece?',
    'Did you know traditional metalworking can require years of practical experience to master?',
    'Have you wondered why the same design can look completely different depending on the artisan’s finishing technique?',
    'Did you know chasing and polishing can dramatically change the appearance of a cast bronze surface?',
    'Have you ever wondered why the finishing stage can take almost as much attention as the casting itself?',

    // 💪 DURABILITY & LONG-TERM VALUE

    'Did you know bronze has survived in archaeological objects for thousands of years?',
    'Have you ever wondered what makes bronze capable of lasting for generations?',
    'Did you know bronze is valued for its combination of durability and distinctive appearance?',
    'Have you wondered why bronze is still used today despite the availability of modern materials?',
    'Did you know a properly cared-for bronze object can remain part of a home for decades?',
    'Have you ever thought about buying something once that your family can keep for years?',
    'Did you know bronze can be both a functional object and a long-lasting decorative piece?',
    'Have you wondered why bronze is often chosen for objects that are meant to age rather than be replaced?',
    'Did you know bronze can be repaired or refinished in many situations instead of simply being discarded?',
    'Have you ever wondered why traditional metal objects are often passed from parents to children?',

    // 🏡 HOME & INTERIOR

    'Did you know bronze can work surprisingly well in both traditional and modern interiors?',
    'Have you noticed how a single bronze object can add warmth to a minimalist room?',
    'Did you know bronze pairs naturally with wood, stone, marble, and warm-colored interiors?',
    'Have you wondered why bronze looks equally natural in a traditional home and a contemporary space?',
    'Did you know architects use bronze for doors, hardware, plaques, façades, and decorative details?',
    'Have you ever considered using bronze as an accent instead of filling a room with decorations?',
    'Did you know the natural aging of bronze can make an interior piece look more distinctive over time?',
    'Have you wondered why bronze often looks better under warm lighting than under harsh white light?',
    'Did you know bronze can add a sense of warmth without relying on bright colors?',
    'Have you ever noticed how bronze, wood, and natural stone create a timeless combination?',

    // 🎁 GIFTING

    'Have you ever wondered why a handcrafted bronze piece can make a more memorable gift than something mass-produced?',
    'Did you know traditional bronze vessels can work as gifts for housewarmings, weddings, festivals, and पूजा spaces?',
    'Have you ever thought about gifting something that can remain in a family for generations?',
    'Did you know a bronze gift can carry both practical and cultural meaning?',
    'Have you wondered why traditional metalware often becomes more meaningful after years of use?',
    'Did you know the story behind a handcrafted object can make the gift itself more personal?',
    'Have you ever received a traditional object that became part of your family’s memories?',

    // 🌱 RECYCLING & SUSTAINABILITY

    'Did you know copper-based alloys such as bronze can be recycled and remade into new products?',
    'Have you ever wondered why bronze can retain material value even after decades of use?',
    'Did you know copper alloys have been recycled by people for centuries?',
    'Have you wondered what happens to an old bronze object when it is no longer wanted?',
    'Did you know recycling bronze can recover valuable copper and other alloying metals?',
    'Have you ever thought about how a metal object can have more than one lifetime?',

    // 🔍 BUYING & AUTHENTICITY

    'Did you know the word “bronze” alone does not tell you exactly what alloy a product contains?',
    'Have you ever wondered why two products sold as bronze can look and behave differently?',
    'Did you know the quality of a bronze product depends on more than just its appearance?',
    'Have you wondered why craftsmanship and finishing can make a major difference between bronze products?',
    'Did you know a beautiful bronze finish does not necessarily mean the object was made using the same process as another bronze piece?',
    'Have you ever wondered whether that “antique” look is natural aging or an intentionally created finish?',
    'Did you know patina can be natural or intentionally developed by artisans?',
    'Have you wondered why knowing the material and manufacturing process matters when buying a bronze object?',
    'Did you know a handcrafted bronze piece can have subtle variations that make every piece slightly individual?',
    'Have you ever wondered what makes one bronze vessel feel more premium than another?',

    // 🤯 SURPRISING FACTS

    'Did you know bronze is not one single metal but a family of copper-based alloys?',
    'Have you ever wondered why the Bronze Age is actually named after a material rather than a civilization?',
    'Did you know bronze technology changed tools, weapons, agriculture, and ceremonial objects in ancient societies?',
    'Have you wondered how ancient craftsmen worked with molten metal without modern temperature sensors?',
    'Did you know some ancient bronze workshops were complex operations involving mining, furnaces, molds, casting, and finishing?',
    'Have you ever wondered how archaeologists can tell how an ancient bronze object was manufactured?',
    'Did you know casting seams, tool marks, and surface details can reveal how a bronze object was made?',
    'Did you know large bronze sculptures are often hollow rather than completely solid?',
    'Have you wondered why making a giant bronze sculpture does not require filling the entire sculpture with metal?',
    'Did you know large bronze sculptures can be cast in multiple sections and assembled afterward?',
    'Have you ever wondered how a bronze statue can survive outdoors for decades while still changing appearance?',
    'Did you know bronze can be durable without being completely corrosion-proof?',
    'Have you wondered why the same bronze object can look different after years in different environments?',
    'Did you know rain, humidity, salts, pollution, and air chemistry can influence how bronze ages?',
    'Have you ever wondered why coastal bronze objects can age differently from bronze objects kept inland?',

    // ❤️ EMOTIONAL / STORY-BASED

    'What if the object you buy today becomes something your children remember from your home?',
    'Have you ever wondered which objects in your home will still be there 20 years from now?',
    'Did you know some of the most valuable traditional objects are valuable because of the stories attached to them?',
    'Have you ever noticed how an everyday object can become special simply because your family used it for years?',
    'What makes a product an heirloom—the material, the craftsmanship, or the memories created around it?',
    'Have you ever wondered why people keep old metal vessels even when newer alternatives are available?',
    'Did you know bronze is one of those materials where age can become part of the beauty?',
    'Have you ever imagined your bronze piece becoming part of your family’s festive traditions?',
    'What if your next पूजा vessel is not just something you use, but something your family keeps?',
  ];


export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 384, height: 400 });
  const [isResizing, setIsResizing] = useState(false);
  const [randomFact, setRandomFact] = useState('');
  const [displayedFact, setDisplayedFact] = useState('');
  const [isTypingFact, setIsTypingFact] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasStartedConversation, setHasStartedConversation] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleOpenChat = () => {
    setIsOpen(true);

    if (!hasStartedConversation && randomFact) {
      setHasStartedConversation(true);

      setMessages([
        { role: 'assistant', content: randomFact }
      ]);

      setConversationHistory([
        { role: 'assistant', content: randomFact }
      ]);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Select a random bronze fact on component mount
    const randomIndex = Math.floor(Math.random() * bronze_facts.length);
    const fact = bronze_facts[randomIndex];
    setRandomFact(fact);
    
    // Start character-by-character typing animation
    setIsTypingFact(true);
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fact.length) {
        setDisplayedFact(fact.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingFact(false);
      }
    }, 30); // Typing speed - 30ms per character

    return () => clearInterval(typingInterval);
  }, []);

  const startResize = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (!isResizing) return undefined;

    const handleResize = (event) => {
      const width = Math.max(300, Math.min(800, window.innerWidth - event.clientX - 24));
      const height = Math.max(300, Math.min(700, window.innerHeight - event.clientY - 100));
      setWindowSize({ width, height });
    };
    const stopResize = () => setIsResizing(false);

    window.addEventListener('mousemove', handleResize);
    window.addEventListener('mouseup', stopResize);

    return () => {
      window.removeEventListener('mousemove', handleResize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing]);

  const handleSendMessage = async () => {
    const userMessage = inputValue.trim();
    if (!userMessage || isTyping) return;

    setInputValue('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          context: formatConversationContext(conversationHistory),
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat request failed with status ${response.status}.`);
      }

      let botMessage = '';
      await consumeChatStream(response, data => {
        if (data.type === 'chunk') {
          botMessage += data.content;
          setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            const nextMessage = { role: 'assistant', content: botMessage };

            return lastMessage?.role === 'assistant'
              ? [...prev.slice(0, -1), nextMessage]
              : [...prev, nextMessage];
          });
        } else if (data.type === 'error') {
          throw new Error(data.content);
        } else if (data.type === 'done') {
          setConversationHistory(prev => [
            ...prev,
            { role: 'user', content: userMessage },
            { role: 'assistant', content: botMessage },
          ].slice(-MAX_HISTORY_MESSAGES));
        }
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I couldn't complete that request. ${error.message}`,
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {/* Fact Preview */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={() => {
                setIsOpen(true);

                if (!hasStartedConversation && randomFact) {
                  setHasStartedConversation(true);

                  setMessages([
                    { role: 'assistant', content: randomFact }
                  ]);

                  setConversationHistory([
                    { role: 'assistant', content: randomFact }
                  ]);
                }
              }}
              className="fixed bottom-24 right-6 z-50 max-w-xs cursor-pointer bg-gradient-to-r from-amber-900 to-amber-800 text-amber-100 px-4 py-3 rounded-xl shadow-2xl border border-amber-600/30 text-sm"
            >
              <p className="font-medium">
                {displayedFact}
                {isTypingFact && <span className="animate-pulse">|</span>}
              </p>

              <p className="text-amber-300 text-xs mt-1">
                {isTypingFact
                  ? 'Typing...'
                  : 'Click to know more about this!'}
              </p>
            </motion.div>

            {/* Logo */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsOpen(true);

                if (!hasStartedConversation && randomFact) {
                  setHasStartedConversation(true);

                  setMessages([
                    { role: 'assistant', content: randomFact }
                  ]);

                  setConversationHistory([
                    { role: 'assistant', content: randomFact }
                  ]);
                }
              }}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-2xl flex items-center justify-center border-2 border-amber-400/30"
            >
              <img
                src="/logo.png"
                alt="LOGO"
                width="50"
                height="50"
              />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.5, 
              borderRadius: '50%',
              width: 56,
              height: 56,
              bottom: 24,
              right: 24
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              borderRadius: '16px',
              width: windowSize.width,
              height: windowSize.height,
              bottom: 24,
              right: 24
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.5, 
              borderRadius: '50%',
              width: 56,
              height: 56,
              bottom: 24,
              right: 24
            }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            style={{
              position: 'fixed',
              zIndex: 50,
              background: 'linear-gradient(to bottom right, #1c1917, #292524)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(217, 119, 6, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div className="bg-amber-600 px-4 py-3 flex items-center justify-between relative">
              {/* Resize Handle */}
              <div
                onMouseDown={startResize}
                className="absolute top-0 left-0 w-6 h-6 cursor-nwse-resize flex items-start justify-start p-1"
                title="Drag to resize"
              >
                <svg
                  className="w-4 h-4 text-amber-600 hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </div>
              
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <img src="/logo.png" alt="LOGO" />
                </div>
                <div>
                  <h3 className="text-bronze-950 font-semibold text-sm">THE BRONZE COMPANY</h3>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-4 space-y-4" style={{ height: windowSize.height - 140 }}>
              {messages.length === 0 && (
                <div className="text-center text-stone-400 py-8">
                  <svg
                    className="w-12 h-12 mx-auto mb-3 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p className="text-sm">Welcome! Ask me anything about The Bronze Co.</p>
                </div>
              )}

              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-amber-600 text-white'
                        : 'bg-stone-700 text-stone-100'
                    }`}
                  >
                    <div className="text-sm prose prose-invert prose-sm max-w-none prose-headings:text-amber-200 prose-a:text-amber-300 prose-strong:text-amber-100">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                          h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-sm font-medium mb-2">{children}</h3>,
                          ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                          li: ({ children }) => <li className="mb-1">{children}</li>,
                          code: ({ children }) => <code className="bg-black/30 px-1 py-0.5 rounded text-xs">{children}</code>,
                          pre: ({ children }) => <pre className="bg-black/30 p-3 rounded-lg overflow-x-auto mb-2">{children}</pre>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          a: ({ children, href }) => <a href={href} className="text-amber-300 hover:text-amber-200 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                          blockquote: ({ children }) => <blockquote className="border-l-4 border-amber-500 pl-3 italic">{children}</blockquote>,
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-stone-700 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-stone-700 p-4 mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-stone-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-stone-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-amber-600 hover:bg-amber-700 disabled:bg-stone-600 disabled:cursor-not-allowed text-white rounded-xl px-4 py-2 transition-colors"
                >
                  <svg
                    className="w-5 h-5 rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
