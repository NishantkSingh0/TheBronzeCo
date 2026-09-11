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
    'Do you know bronze is a family of copper-based alloys rather than one single fixed composition?',
    'Did you know traditional tin bronze is primarily copper with tin added?',
    'Have you ever wondered why bronze is often described as an alloy instead of a pure metal?',
    'Do you know the composition of bronze can be changed to emphasize strength, wear resistance, corrosion resistance, or casting behavior?',
    'Did you know some standardized tin bronzes contain roughly 6–20% tin, depending on the grade?',
    'Have you wondered why two objects both called bronze can behave very differently?',
    'Do you know lead, zinc, nickel, aluminum, iron, phosphorus, or silicon can be added to different bronze families?',
    "Did you know adding an alloying element can change bronze's hardness and mechanical strength?",
    'Have you ever wondered why bronze can have very different colors?',
    'Do you know bronze can range from reddish tones to golden and lighter hues depending on composition and surface condition?',
    'Did you know tin gives copper-tin bronze a characteristic golden appearance when the surface is freshly exposed?',
    'Have you wondered why an old bronze statue may look green even though the underlying metal is copper-rich?',
    'Do you know the green surface on many outdoor bronzes is called patina?',
    'Did you know patina is made from corrosion products rather than a new decorative paint?',
    'Have you ever wondered whether a green bronze surface means the metal is completely protected?',
    'Do you know conservation research shows that bronze corrosion can continue underneath or through a patina?',
    'Did you know acidic environmental conditions can accelerate corrosion of outdoor bronze?',
    'Have you wondered why conservators avoid aggressive cleaning of historic bronze?',
    'Do you know abrasive cleaning can remove original surface metal and sculptural detail?',
    'Did you know conservation treatments are often designed to be as minimal and reversible as practical?',
    'Have you wondered why a conservator may deliberately leave some patina on an old bronze object?',
    'Do you know bronze has survived in archaeological contexts for thousands of years?',
    'Did you know the durability of ancient bronze is one reason museums still hold large collections of bronze artifacts?',
    'Have you wondered why bronze became important enough to give an entire archaeological period its name?',
    'Do you know the Bronze Age is named for the widespread technological importance of bronze?',
    'Did you know bronze technology transformed tools, weapons, agriculture, and ceremonial objects in many ancient societies?',
    'Have you wondered why the invention of bronze was more than just a new material?',
    'Do you know bronze production required knowledge of mining, ore processing, high-temperature furnaces, alloying, casting, and finishing?',
    'Did you know ancient bronze production could involve many specialized workers?',
    'Have you wondered what a bronze workshop tells archaeologists about the organization of an ancient society?',
    'Do you know ancient Chinese bronze workshops involved mining, smelting, mold making, casting, and finishing?',
    'Did you know some early Chinese bronze foundries operated around 1700 BCE?',
    'Have you wondered why bronze technology could create major economic and political changes?',
    'Do you know bronze tools could replace or outperform some stone tools for particular tasks?',
    'Did you know durable bronze weapons could reshape military technology?',
    'Have you wondered why bronze became strongly associated with elite power and ritual in several ancient cultures?',
    'Do you know ancient Chinese bronze vessels were often connected with ancestor and religious ceremonies?',
    'Did you know some Chinese bronze vessels were buried with elites for use in the afterlife?',
    'Have you wondered why ancient bronzes sometimes carry inscriptions?',
    'Do you know inscriptions on ancient bronze objects can preserve information about rulers, events, ownership, or ritual use?',
    'Did you know bronze objects can be archaeological evidence for ancient trade networks?',
    'Have you wondered why tin was especially important to ancient bronze-making regions?',
    'Do you know tin and copper deposits are not always located near each other?',
    'Did you know ancient merchants could transport tin over long distances to support bronze production?',
    'Have you wondered how archaeologists reconstruct ancient metal trade?',
    'Do you know chemical analysis of bronze can help researchers study its composition and production history?',
    'Did you know trace elements can sometimes provide clues about the ores used to make an ancient alloy?',
    'Have you wondered why an ancient bronze object can contain evidence of its manufacturing process?',
    'Do you know casting defects, inclusions, seams, and microstructure can reveal how a bronze object was made?',
    'Did you know different civilizations developed different bronze casting traditions?',
    'Have you wondered why early Chinese bronze casting often differed from Mediterranean lost-wax casting?',
    'Do you know early Chinese bronze vessels were commonly made using piece-mold techniques?',
    'Did you know piece molds could be assembled around a core before molten bronze was poured?',
    'Have you wondered how ancient craftsmen created complicated decoration directly in a mold?',
    'Do you know lost-wax casting begins with a model made from wax or another suitable material?',
    'Did you know the wax model is encased in a refractory material before the wax is removed?',
    'Have you wondered why lost-wax casting is also called cire perdue?',
    'Do you know heating the mold can melt or burn out the wax and leave a cavity?',
    'Did you know molten bronze can then fill that cavity to reproduce the model?',
    'Have you wondered why lost-wax casting is especially useful for intricate sculptural forms?',
    'Do you know wax can be shaped and modified before metal is cast?',
    'Did you know lost-wax molds are commonly destroyed when the casting is removed?',
    'Have you wondered why this can make each casting technically unique?',
    'Do you know bronze casting can reproduce very fine surface details?',
    'Did you know ancient craftsmen used bronze for objects with complex geometric and animal decoration?',
    'Have you wondered how ancient artisans achieved such precise patterns without modern machinery?',
    'Do you know some ancient Chinese bronzes show extremely sophisticated mold-making techniques?',
    'Did you know bronze casting could require temperatures around 1,000°C or more depending on the alloy and process?',
    'Have you wondered why controlling heat was such a major challenge for ancient metalworkers?',
    'Do you know molten metal must flow through a mold before solidifying?',
    'Did you know mold design influences whether a bronze casting fills completely?',
    'Have you wondered why casting channels and vents matter?',
    'Do you know trapped air can interfere with complete filling of a mold?',
    'Did you know ancient casting methods sometimes used runners and openings to manage molten metal flow?',
    'Have you wondered why large bronze sculptures are sometimes cast in multiple pieces?',
    'Do you know large bronze components can be assembled after separate castings are completed?',
    'Did you know historical foundries used specialized pits, furnaces, molds, and finishing areas?',
    'Have you wondered why bronze casting was both an artistic and engineering discipline?',
    'Do you know bronze can be finished by grinding, chasing, polishing, or other surface-working methods?',
    'Did you know cold-working can change the surface and mechanical condition of some bronze alloys?',
    'Have you wondered why the same bronze object can contain both cast and worked sections?',
    'Do you know ancient Greek bronze vessels sometimes combined casting with hammered sheet-metal techniques?',
    'Did you know bronze vessels could have cast handles attached to hammered bodies?',
    'Have you wondered why thin bronze sheets can disappear archaeologically while thicker cast parts survive?',
    'Do you know burial environments can corrode bronze differently depending on soil chemistry?',
    'Did you know archaeological bronze is not necessarily chemically identical to the alloy originally cast?',
    'Have you wondered how corrosion can change the chemistry of an ancient bronze surface?',
    "Do you know conservation scientists can study corrosion layers to understand an artifact's history?",
    'Did you know chloride contamination can be especially troublesome for archaeological copper alloys?',
    'Have you wondered why conservators worry about active corrosion rather than only appearance?',
    'Do you know bronze disease is a term used for destructive chloride-related corrosion in archaeological copper alloys?',
    'Did you know active corrosion can continue when environmental conditions allow electrochemical reactions?',
    'Have you wondered why stable storage conditions are important for museum bronze?',
    'Do you know humidity and contaminants can influence corrosion behavior?',
    'Did you know outdoor bronze is exposed to rain, pollutants, salts, dust, and changing humidity?',
    'Have you wondered why bronze monuments in different cities can age differently?',
    'Do you know air pollution can influence the chemistry of bronze patinas?',
    'Did you know sulfur-containing pollutants can contribute to bronze corrosion products?',
    'Have you wondered why a bronze statue may develop different colors in different environments?',
    'Do you know patina chemistry depends on the surrounding environment as well as the alloy?',
    'Did you know copper carbonates and sulfates can occur among the corrosion products on outdoor bronze?',
    'Have you wondered why a bronze surface can change color without the object being repainted?',
    'Do you know some artists intentionally develop or accelerate bronze patinas?',
    'Did you know artificial patination can create colors that range from brown to green and other shades?',
    'Have you wondered why bronze conservators document surface appearance before treatment?',
    'Do you know aggressive blasting can remove both corrosion products and original surface material?',
    'Did you know softer blasting media can sometimes clean bronze while preserving more of its existing surface?',
    'Have you wondered why conservation is not simply about making an old bronze look new?',
    "Do you know historical surface layers can themselves be part of an object's evidence and appearance?",
    'Did you know bronze is valued for its casting characteristics in modern engineering?',
    'Have you wondered why bronze remains useful even after the development of steel and advanced plastics?',
    'Do you know tin bronze grades are used for engineering components such as bearings and other wear-related parts?',
    'Did you know some bronze alloys are selected for their resistance to wear and friction?',
    'Have you wondered why bronze is often used where moving metal parts contact each other?',
    'Do you know bronze can provide useful bearing performance under appropriate lubrication and operating conditions?',
    'Did you know bearing bronzes come in several composition families?',
    'Have you wondered why engineers do not use one bronze alloy for every bearing?',
    'Do you know leaded tin bronzes are one important family of bearing materials?',
    'Did you know some bearing bronzes combine copper, tin, lead, and zinc in controlled proportions?',
    "Have you wondered why small composition changes can alter an alloy's engineering behavior?",
    'Do you know standardized bronze grades can have specified tensile strength, yield strength, elongation, and hardness?',
    'Did you know the same bronze chemistry can have different properties depending on casting method and processing?',
    'Have you wondered why engineering specifications matter when choosing bronze?',
    'Do you know continuous casting, centrifugal casting, sand casting, and permanent-mold casting can produce different properties?',
    'Did you know centrifugal casting is used for some cylindrical bronze components?',
    'Have you wondered why bronze bearings can be manufactured as bushes, sleeves, and other shapes?',
    'Do you know bronze can be machined after casting to achieve precise dimensions?',
    'Did you know bronze is used for gears and other mechanical components in selected applications?',
    'Have you wondered why bronze gears can be useful in systems where wear and friction are concerns?',
    'Do you know bronze can offer good resistance to galling in some applications?',
    'Did you know galling is a form of adhesive wear that can occur when sliding metal surfaces interact?',
    'Have you wondered why material selection is critical for shafts, bearings, and gears?',
    'Do you know bronze and steel can be paired in mechanical systems because their properties can complement each other?',
    'Did you know bronze is used in some valves and pumps?',
    'Have you wondered why bronze appears in plumbing and fluid-handling equipment?',
    'Do you know certain bronze grades are designed for pressure-containing valve and fitting applications?',
    'Did you know marine engineering is one of the major modern fields for specialized bronzes?',
    'Have you wondered why bronze has a long history in marine hardware?',
    'Do you know silicon bronze has very good seawater corrosion resistance?',
    'Did you know silicon bronze is used for marine screws, bolts, washers, pins, and fasteners?',
    'Have you wondered why silicon bronze is popular in wooden boat construction?',
    'Do you know silicon bronze can offer good weldability compared with many other copper alloys?',
    'Did you know silicon bronze can combine corrosion resistance with useful mechanical strength?',
    'Have you wondered why marine engineers care about both corrosion and mechanical properties?',
    'Do you know nickel-aluminum bronze is widely used in marine applications?',
    'Did you know nickel-aluminum bronze is used for ship propellers?',
    'Have you wondered why propellers need resistance to cavitation and erosion?',
    'Do you know nickel-aluminum bronze can provide strong resistance to cavitation in suitable conditions?',
    'Did you know aluminum bronzes are used for valves, fittings, pumps, shafts, and heat-exchanger waterboxes?',
    'Have you wondered why aluminum bronze can be attractive for demanding marine components?',
    'Do you know aluminum bronze can combine mechanical strength with corrosion resistance?',
    'Did you know the microstructure of a bronze alloy can strongly influence its corrosion and mechanical performance?',
    'Have you wondered why two castings with similar chemistry can behave differently?',
    'Do you know heat treatment and cooling history can influence bronze microstructure?',
    'Did you know cold working can increase strength in some bronze alloys?',
    'Have you wondered why engineers specify both alloy composition and processing condition?',
    'Do you know phosphor bronze is another important bronze family?',
    'Did you know phosphorus additions can influence the properties of copper-tin alloys?',
    'Have you wondered why phosphor bronze is widely associated with springs and electrical contacts?',
    'Do you know phosphor bronze can provide a useful combination of strength and electrical conductivity?',
    'Did you know spring-tempered phosphor bronze can achieve high strength through cold working?',
    'Have you wondered why a spring material needs both strength and resistance to fatigue?',
    'Do you know bronze alloys are used in electrical connectors and contacts?',
    'Did you know bronze generally conducts electricity less effectively than pure copper?',
    'Have you wondered why engineers sometimes accept lower conductivity in exchange for greater mechanical strength?',
    'Do you know alloying copper can improve strength while reducing electrical conductivity?',
    'Did you know phosphor bronze grades can retain useful electrical conductivity while offering much higher strength than pure copper?',
    'Have you wondered why connectors need resistance to mechanical deformation?',
    'Do you know electrical contacts may require a balance of conductivity, spring force, wear resistance, and corrosion resistance?',
    "Did you know bronze's electrical properties vary considerably among alloy families?",
    'Have you wondered why the word bronze alone is not enough to predict electrical performance?',
    'Do you know some bronze alloys are chosen for their spring properties rather than their appearance?',
    'Did you know bronze can be used for fasteners where corrosion resistance and mechanical properties are important?',
    'Have you wondered why bronze screws can be valuable in marine environments?',
    'Do you know silicon bronze fasteners are common in certain boatbuilding applications?',
    'Did you know bronze can be easier to work with than some high-strength steels in particular fabrication processes?',
    'Have you wondered why machinability can matter as much as strength when selecting a material?',
    'Do you know some bronze alloys contain lead specifically to improve machining or bearing behavior?',
    'Did you know leaded bronzes are subject to different health and regulatory considerations than lead-free bronzes?',
    "Have you wondered why the alloy's exact composition matters when an object may contact food or drinking water?",
    'Do you know not every bronze alloy should automatically be assumed suitable for food contact?',
    'Did you know some historical bronze objects were vessels, but historical use does not by itself prove modern food-contact safety?',
    'Have you wondered why a decorative bronze vessel should not automatically be treated as cookware?',
    'Do you know modern food-contact suitability depends on the specific alloy, manufacturing process, surface condition, and applicable regulations?',
    'Did you know copper alloys can release metal ions into water under some conditions?',
    'Have you wondered why water chemistry matters when copper-based alloys contact drinking water?',
    'Do you know acidic or otherwise aggressive water can increase copper corrosion?',
    'Did you know hot water can dissolve copper more readily than cold water in plumbing systems?',
    'Have you wondered why material safety should be judged from the exact product rather than simply from the word bronze?',
    'Do you know bronze is not inherently a medical or nutritional treatment?',
    'Did you know the presence of copper in bronze does not mean every bronze object provides a useful dietary copper source?',
    'Have you wondered why traditional claims about metal vessels should be separated from laboratory evidence?',
    "Do you know bronze's historical importance does not automatically establish health benefits for every modern bronze utensil?",
    'Did you know some bronze objects may contain alloying elements that make them inappropriate for certain uses?',
    'Have you wondered why identifying the alloy grade is important before using bronze for food, water, or sensitive applications?',
    'Do you know bronze mirrors were made in several ancient cultures?',
    'Did you know ancient Chinese bronze mirrors could have highly polished reflective surfaces?',
    'Have you wondered how a metal alloy could function as a mirror before modern glass mirrors?',
    'Do you know polishing can make a bronze surface highly reflective?',
    'Did you know ancient bronze vessels could be both functional objects and symbols of status?',
    'Have you wondered why bronze became so closely connected with ceremonial life?',
    'Do you know ancient Chinese ritual bronzes could be used in offerings of food and wine to ancestors or deities?',
    'Did you know the production of elaborate bronzes required significant organization of labor?',
    'Have you wondered what the sheer number of surviving ancient bronzes tells us about historical workshops?',
    'Do you know bronze artifacts can reveal ancient social hierarchies as well as technical skills?',
    'Did you know elite tombs sometimes contained large collections of bronze vessels?',
    'Have you wondered why bronze was valuable enough to accompany rulers and nobles into tombs?',
    'Do you know bronze could serve as a medium for recording political or religious information through inscriptions?',
    'Did you know some bronze inscriptions are important historical documents?',
    'Have you wondered why archaeologists study both the object and its inscription?',
    'Do you know ancient bronze technology was connected to long-distance trade in raw materials?',
    'Did you know tin could be traded across large regions because it was needed for bronze production?',
    'Have you wondered why control of metal resources could influence political power?',
    'Do you know metalworking centers could become economically and politically important?',
    'Did you know bronze production required access to fuel as well as ore?',
    'Have you wondered why ancient metallurgy depended on forests and other fuel resources?',
    'Do you know smelting and casting required substantial heat management?',
    'Did you know ancient metalworkers had to control furnace temperatures without modern thermometers?',
    'Have you wondered how they judged whether a metal was hot enough to cast?',
    'Do you know practical knowledge could be transmitted through generations of metalworking specialists?',
    'Did you know bronze technology was not a single invention that appeared everywhere at the same moment?',
    'Have you wondered why different regions entered their Bronze Ages at different times?',
    'Do you know the chronology of bronze use varies greatly across regions?',
    'Did you know China, the Mediterranean, South Asia, and other regions developed distinctive bronze traditions?',
    'Have you wondered why archaeological labels such as Bronze Age can hide enormous regional differences?',
    'Do you know India has a very old history of copper and bronze metallurgy?',
    'Did you know bronze objects occur in archaeological traditions of the Indian subcontinent?',
    'Have you wondered how metallurgy contributed to the development of early South Asian societies?',
    'Do you know the exact composition of an archaeological Indian bronze can help researchers understand its production technology?',
    'Did you know bronze artifacts can preserve evidence of casting, hammering, polishing, and finishing?',
    'Have you wondered why archaeologists examine tool marks on ancient bronze?',
    'Do you know manufacturing marks can help distinguish different stages of production?',
    'Did you know mold seams can sometimes remain visible on cast bronze objects?',
    'Have you wondered why casting seams can be valuable evidence rather than just imperfections?',
    'Do you know bronze objects can be repaired after casting?',
    'Did you know ancient metalworkers sometimes assembled multiple cast components into one object?',
    'Have you wondered why some bronze sculptures have internal armatures or joins?',
    'Do you know modern monumental bronze sculptures may also be assembled from multiple cast sections?',
    'Did you know large bronze sculptures are often hollow rather than solid?',
    'Have you wondered why hollow construction dramatically reduces the amount of metal required for a large sculpture?',
    'Do you know hollow bronze sculptures can still be structurally strong when properly engineered?',
    'Did you know modern foundries can use ceramic shells, wax models, cores, vents, and gates to produce large bronzes?',
    'Have you wondered why a bronze sculpture can require extensive finishing after casting?',
    'Do you know casting may leave sprues, gates, seams, and surface irregularities that must be removed?',
    'Did you know chasing is used to refine and detail bronze surfaces after casting?',
    'Have you wondered why the final surface of a bronze sculpture can be almost as important as the casting itself?',
    'Do you know bronze sculptures can be chemically patinated after casting?',
    'Did you know wax coatings are commonly used in the conservation of outdoor bronze sculpture?',
    'Have you wondered why conservators may periodically renew protective coatings?',
    'Do you know protective coatings can reduce direct exposure of bronze to environmental contaminants?',
    'Did you know coating systems need maintenance because outdoor exposure can degrade them over time?',
    'Have you wondered why bronze monuments require conservation even though bronze is considered durable?',
    'Do you know durable does not mean corrosion-proof?',
    'Did you know bronze can corrode faster in aggressive environments than people often expect?',
    'Have you wondered why coastal salt, industrial pollution, and acidic rain can be concerns for bronze?',
    'Do you know chloride-rich environments can be particularly challenging for copper alloys?',
    'Did you know marine bronze selection is based on the specific water chemistry and mechanical conditions?',
    'Have you wondered why seawater resistance does not mean immunity to every marine corrosion mechanism?',
    'Do you know nickel-aluminum bronze can suffer localized corrosion under unfavorable conditions despite its strong reputation?',
    'Did you know alloy microstructure and service conditions both influence corrosion performance?',
    'Have you wondered why engineers test materials rather than relying only on general alloy names?',
    'Do you know bronze can be recyclable because copper alloys can be melted and remade into new products?',
    "Did you know copper-based alloys can retain significant material value at the end of a product's life?",
    'Have you wondered why copper recycling has been important for centuries?',
    'Do you know ancient people sometimes recycled bronze objects by melting them down?',
    'Did you know recycled metal can become part of new bronze objects?',
    'Have you wondered how recycling can complicate the archaeological story of an ancient bronze?',
    'Do you know an archaeological bronze may contain copper and tin that came through multiple cycles of use and recycling?',
    'Did you know metal recycling can reduce the need for newly mined material when collection and processing are effective?',
    'Have you wondered why bronze has remained economically valuable after thousands of years?',
    "Do you know copper's intrinsic material value contributes to the recyclability of many bronze products?",
    'Did you know recycling a bronze component can recover copper and other alloying elements?',
    'Have you wondered why identifying alloy composition can matter for efficient recycling?',
    'Do you know mixed copper-alloy scrap may require sorting before it can be converted into controlled new alloys?',
    'Did you know modern standards classify many bronze compositions using numerical alloy designations?',
    'Have you wondered why engineers use standardized alloy numbers instead of relying only on names such as bronze?',
    'Do you know the Unified Numbering System includes many cast bronze grades?',
    'Did you know tin bronze grades can have different copper and tin ranges?',
    'Have you wondered why some grades include small amounts of zinc, lead, nickel, iron, or phosphorus?',
    'Do you know alloy standards can specify maximum impurity levels?',
    'Did you know mechanical-property tables can distinguish tensile strength, yield strength, elongation, hardness, and fatigue strength?',
    'Have you wondered why hardness alone cannot tell you whether a bronze is suitable for an application?',
    'Do you know fatigue strength matters when a component experiences repeated loading?',
    'Did you know elongation provides information about how much a material can deform before fracture in a tensile test?',
    'Have you wondered why designers need several material properties rather than one headline number?',
    'Do you know bronze performance depends on temperature, loading, environment, manufacturing process, and geometry?',
    'Did you know material data measured at room temperature may not predict every real-world service condition?',
    'Have you wondered why engineering handbooks always specify test conditions?',
    'Do you know bronze can perform differently as a cast material versus a cold-worked material?',
    'Did you know cold work can increase strength but may reduce ductility in some copper alloys?',
    'Have you wondered why heat treatment and annealing can be used to modify copper-alloy properties?',
    'Do you know bronze selection is often a compromise between strength, ductility, conductivity, corrosion resistance, wear, cost, and manufacturability?',
    'Did you know there is no single bronze that is best for every application?',
    'Have you wondered why a sculptor and a marine engineer can both choose bronze for completely different reasons?',
    'Do you know artists value bronze for its casting flexibility and surface possibilities?',
    'Did you know engineers may value bronze for wear, corrosion resistance, or bearing behavior?',
    'Have you wondered why architects use bronze for doors, hardware, façades, plaques, and decorative details?',
    'Do you know bronze can develop a distinctive appearance as it ages outdoors?',
    'Did you know architects sometimes design specifically for the natural aging of bronze surfaces?',
    'Have you wondered why an architect might prefer a material that changes appearance over time?',
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
              className="fixed bottom-24 right-6 z-50 max-w-xs bg-gradient-to-r from-amber-900 to-amber-800 text-amber-100 px-4 py-3 rounded-xl shadow-2xl border border-amber-600/30 text-sm"
            >
              <p className="font-medium">
                {displayedFact}
                {isTypingFact && <span className="animate-pulse">|</span>}
              </p>
              <p className="text-amber-300 text-xs mt-1">
                {isTypingFact ? 'Typing...' : 'Click to know more about this!'}
              </p>
            </motion.div>
            
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
                  // Add the random fact as the first ASSISTANT message
                  setMessages([{ role: 'assistant', content: randomFact }]);
                  // Add to conversation history
                  setConversationHistory([{ role: 'assistant', content: randomFact }]);
                }
              }}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full shadow-2xl flex items-center justify-center border-2 border-amber-400/30"
            >
              <img src="/logo.png" alt="LOGO" width="50" height="50" />
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
