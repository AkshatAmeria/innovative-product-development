// import { useState, useRef, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { FiX } from 'react-icons/fi';
// import { GiMegaphone } from 'react-icons/gi';
// import { HfInference } from '@huggingface/inference';

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);
  
//   const hf = new HfInference(process.env.REACT_APP_HF_TOKEN);

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const isEmergencyRelated = async (text) => {
//     try {
//       const response = await hf.zeroShotClassification({
//         model: 'facebook/bart-large-mnli',
//         inputs: text,
//         parameters: {
//           candidate_labels: ['emergency', 'non-emergency'],
//         },
//       });
//       return response.labels[0] === 'emergency';
//     } catch (error) {
//       console.error('Classification error:', error);
//       return false;
//     }
//   };

//   const generateEmergencyResponse = async (text) => {
//     try {
//       const response = await hf.textGeneration({
//         model: 'google/flan-t5-xxl',
//         inputs: `As an emergency response assistant, provide concise steps for: ${text}. 
//                  Include contact numbers for relevant authorities. Keep response under 200 characters.`,
//         parameters: {
//           max_new_tokens: 200,
//           temperature: 0.7,
//         },
//       });
//       return response.generated_text;
//     } catch (error) {
//       console.error('Generation error:', error);
//       return "Please contact emergency services immediately. Here are important numbers: Police - 100, Fire - 101, Medical - 102.";
//     }
//   };

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;

//     // Add user message
//     const userMessage = { text: input, isBot: false };
//     setMessages(prev => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const isEmergency = await isEmergencyRelated(input);
      
//       if (isEmergency) {
//         const botResponse = await generateEmergencyResponse(input);
//         setMessages(prev => [...prev, { 
//           text: botResponse, 
//           isBot: true,
//           emergency: true 
//         }]);
//       } else {
//         setMessages(prev => [...prev, { 
//           text: "For emergency assistance only. Please ask about:\n- Medical emergencies\n- Fire hazards\n- Security threats\n- Natural disasters", 
//           isBot: true 
//         }]);
//       }
//     } catch (error) {
//       setMessages(prev => [...prev, { 
//         text: "⚠️ Error connecting to emergency services. Call directly:\nPolice: 100\nAmbulance: 102", 
//         isBot: true 
//       }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <button 
//         className="chatbot-toggle"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <FiX /> : <GiMegaphone />}
//       </button>

//       {isOpen && (
//         <motion.div 
//           className="chat-window"
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//         >
//           <div className="chat-messages">
//             {messages.map((msg, i) => (
//               <div 
//                 key={i} 
//                 className={`message ${msg.isBot ? 'bot' : 'user'} ${msg.emergency ? 'emergency' : ''}`}
//               >
//                 {msg.text.split('\n').map((line, idx) => (
//                   <p key={idx}>{line}</p>
//                 ))}
//               </div>
//             ))}
//             {isLoading && (
//               <div className="message bot loading">
//                 <div className="loading-dots">
//                   <div></div><div></div><div></div>
//                 </div>
//               </div>
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Describe your emergency..."
//               disabled={isLoading}
//             />
//             <button 
//               onClick={handleSend} 
//               disabled={isLoading}
//             >
//               {isLoading ? 'Sending...' : 'Send'}
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;




// import { useState } from "react";
// import { FiX } from "react-icons/fi";
// import { GiMegaphone } from "react-icons/gi";
// import { motion } from "framer-motion";

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [selectedCase, setSelectedCase] = useState(null);

//   const cases = {
//     Fire: [
//       { question: "What should I do in case of a fire?", answer: "Evacuate immediately and call emergency services at 101." },
//       { question: "How can I prevent fires at home?", answer: "Ensure electrical wiring is up to code and never leave stoves unattended." },
//       { question: "What should I do if my clothes catch fire?", answer: "Stop, drop, and roll to smother the flames." },
//       { question: "How do I use a fire extinguisher?", answer: "Remember PASS: Pull the pin, Aim at the base, Squeeze the handle, and Sweep side to side." },
//       { question: "What should I do if I’m trapped in a burning building?", answer: "Stay low to avoid smoke, find a safe exit, and signal for help from a window." },
//       { question: "Can I use water on an electrical fire?", answer: "No, use a Class C fire extinguisher instead." },
//       { question: "How often should I check my smoke alarms?", answer: "At least once a month." }
//     ],
//     Gas: [
//       { question: "How do I report a gas leak?", answer: "Leave the area and call emergency services at 1906." },
//       { question: "What are the signs of a gas leak?", answer: "A strong sulfur smell, hissing sounds, or dizziness indoors." },
//       { question: "What should I do if I smell gas in my house?", answer: "Turn off the gas supply, avoid using electrical switches, and ventilate the area." },
//       { question: "How can I prevent gas leaks?", answer: "Regularly check gas connections and install a gas leak detector." },
//       { question: "What are the health risks of gas leaks?", answer: "Headaches, dizziness, nausea, and even unconsciousness in severe cases." },
//       { question: "Should I use my phone if I suspect a gas leak?", answer: "No, using electrical devices can ignite the gas." },
//       { question: "How often should I inspect gas lines?", answer: "At least once a year by a professional." }
//     ],
//     Medical: [
//       { question: "What number do I call for medical emergencies?", answer: "Dial 108 for an ambulance." },
//       { question: "How do I perform CPR?", answer: "Check responsiveness, call for help, and give chest compressions." },
//       { question: "What should I do if someone is choking?", answer: "Perform the Heimlich maneuver by applying abdominal thrusts." },
//       { question: "How do I treat a deep cut or wound?", answer: "Apply pressure to stop bleeding, clean the wound, and cover it with a sterile bandage." },
//       { question: "What are the symptoms of a stroke?", answer: "Face drooping, arm weakness, and slurred speech." },
//       { question: "How do I identify a heart attack?", answer: "Chest pain, shortness of breath, and nausea." },
//       { question: "What is the best way to treat burns?", answer: "Cool the burn with running water and cover it with a sterile dressing." }
//     ]
//   };

//   const handleQuestionClick = (q) => {
//     setMessages((prev) => [...prev, { text: q.question, isBot: false }, { text: q.answer, isBot: true }]);
//   };

//   const clearChat = () => {
//     setMessages([]);
//   };

//   return (
//     <div className="chatbot-container">
//       <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? <FiX /> : <GiMegaphone />}
//       </button>

//       {isOpen && (
//         <motion.div className="chat-window" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
//           <div className="chat-messages">
//             {messages.map((msg, i) => (
//               <div key={i} className={`message ${msg.isBot ? 'bot' : 'user'}`}>{msg.text}</div>
//             ))}
//           </div>

//           {selectedCase && (
//             <div className="chat-questions" style={{ maxHeight: "150px", overflowY: "auto" }}>
//               {cases[selectedCase].slice(0, 5).map((q, index) => (
//                 <button key={index} className="question-btn" onClick={() => handleQuestionClick(q)}>
//                   {q.question}
//                 </button>
//               ))}
//             </div>
//           )}

//           <div className="chat-footer">
//             <div className="chat-categories">
//               {Object.keys(cases).map((category) => (
//                 <button key={category} className="category-btn" onClick={() => setSelectedCase(category)}>
//                   {category}
//                 </button>
//               ))}
//             </div>
//             <button className="clear-chat" onClick={clearChat}>Clear Chat</button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;





import { useState } from "react";
import { FiX } from "react-icons/fi";
import { GiMegaphone } from "react-icons/gi";
import { motion } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = {
    // ... (same cases as before)
    Fire: [
      { question: "What should I do in case of a fire?", answer: "Evacuate immediately and call emergency services at 101." },
      { question: "How can I prevent fires at home?", answer: "Ensure electrical wiring is up to code and never leave stoves unattended." },
      { question: "What should I do if my clothes catch fire?", answer: "Stop, drop, and roll to smother the flames." },
      { question: "How do I use a fire extinguisher?", answer: "Remember PASS: Pull the pin, Aim at the base, Squeeze the handle, and Sweep side to side." },
      { question: "What should I do if I’m trapped in a burning building?", answer: "Stay low to avoid smoke, find a safe exit, and signal for help from a window." },
      { question: "Can I use water on an electrical fire?", answer: "No, use a Class C fire extinguisher instead." },
      { question: "How often should I check my smoke alarms?", answer: "At least once a month." }
    ],
    Gas: [
      { question: "How do I report a gas leak?", answer: "Leave the area and call emergency services at 1906." },
      { question: "What are the signs of a gas leak?", answer: "A strong sulfur smell, hissing sounds, or dizziness indoors." },
      { question: "What should I do if I smell gas in my house?", answer: "Turn off the gas supply, avoid using electrical switches, and ventilate the area." },
      { question: "How can I prevent gas leaks?", answer: "Regularly check gas connections and install a gas leak detector." },
      { question: "What are the health risks of gas leaks?", answer: "Headaches, dizziness, nausea, and even unconsciousness in severe cases." },
      { question: "Should I use my phone if I suspect a gas leak?", answer: "No, using electrical devices can ignite the gas." },
      { question: "How often should I inspect gas lines?", answer: "At least once a year by a professional." }
    ],
    Medical: [
      { question: "What number do I call for medical emergencies?", answer: "Dial 108 for an ambulance." },
      { question: "How do I perform CPR?", answer: "Check responsiveness, call for help, and give chest compressions." },
      { question: "What should I do if someone is choking?", answer: "Perform the Heimlich maneuver by applying abdominal thrusts." },
      { question: "How do I treat a deep cut or wound?", answer: "Apply pressure to stop bleeding, clean the wound, and cover it with a sterile bandage." },
      { question: "What are the symptoms of a stroke?", answer: "Face drooping, arm weakness, and slurred speech." },
      { question: "How do I identify a heart attack?", answer: "Chest pain, shortness of breath, and nausea." },
      { question: "What is the best way to treat burns?", answer: "Cool the burn with running water and cover it with a sterile dressing." }
    ]
  };

  const handleQuestionClick = (q) => {
    setMessages((prev) => [...prev, { text: q.question, isBot: false }, { text: q.answer, isBot: true }]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FiX /> : <GiMegaphone />}
      </button>

      {isOpen && (
        <motion.div className="chat-window" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="chat-messages" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {selectedCase && (
            <div className="chat-questions" style={{ maxHeight: "150px", overflowY: "auto" }}>
              {cases[selectedCase].slice(0, 5).map((q, index) => (
                <button key={index} className="question-btn" onClick={() => handleQuestionClick(q)}>
                  {q.question}
                </button>
              ))}
            </div>
          )}

          <div className="chat-footer">
            <div className="chat-categories">
              {Object.keys(cases).map((category) => (
                <button key={category} className="category-btn" onClick={() => setSelectedCase(category)}>
                  {category}
                </button>
              ))}
            </div>
            <button className="clear-chat" onClick={clearChat}>Clear Chat</button>
            <button className="Connect"    onClick={() => window.location.href = "https://glittering-cajeta-7c1152.netlify.app/"} >Connect with AI</button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatBot;