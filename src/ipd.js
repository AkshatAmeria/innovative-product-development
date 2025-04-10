

//version-2:


import { useState, useEffect ,useRef } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { GiGasMask, GiGasStove, GiMovementSensor, GiMegaphone } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import ChatBot from "./chatbotnew";



const firebaseConfig = {
  apiKey: "AIzaSyDB-P-HsjkQIVRi2VK2ScnTSOUMCwzhsig",
  authDomain: "akshat-669bc.firebaseapp.com",
  databaseURL: "https://akshat-669bc-default-rtdb.firebaseio.com",
  projectId: "akshat-669bc",
  storageBucket: "akshat-669bc.firebasestorage.app",
  messagingSenderId: "1067840348455",
  appId: "1:1067840348455:web:d876293753ebf2c162c902",
  measurementId: "G-4BJ86QKLLX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <motion.div
          className="logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          HomeSecure
        </motion.div>

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <a href="#home" className="nav-link">Home</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
    </nav>
  );
};

  // Initialize emergency classification pipeline
  // useEffect(() => {
  //   const initializeModel = async () => {
  //     const pipeline = await Transformers.AutoModelForSequenceClassification.from_pretrained(
  //       "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
  //     );
  //     setClassifier(pipeline);
  //   };
  //   initializeModel();
  // }, []);

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [classifier, setClassifier] = useState(null);
//   const chatEndRef = useRef(null);



//   const isEmergencyRelated = async (text) => {
//     if (!classifier) return false;
//     const output = await classifier(text);
//     return output[0].label === "POSITIVE"; // Simplified emergency detection
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     // Add user message
//     const userMessage = { text: input, isBot: false };
//     setMessages(prev => [...prev, userMessage]);
    
//     // Check if emergency related
//     const isEmergency = await isEmergencyRelated(input);
    
//     // Generate bot response
//     const botResponse = isEmergency 
//       ? "Emergency detected! Here's what to do: (1) Stay calm, (2) Evacuate if necessary, (3) Contact emergency services immediately."
//       : "I'm only authorized to discuss emergency-related matters. Please ask about gas leaks, fires, security breaches, or medical emergencies and their helpline contact number.";
    
//     setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
//     setInput("");
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
//               <div key={i} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
//                 {msg.text}
//               </div>
//             ))}
//             <div ref={chatEndRef} />
//           </div>

//           <div className="chat-input">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//               placeholder="Describe your emergency..."
//             />
//             <button onClick={handleSend}>
//               Send
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };


<ChatBot/>








const SensorGrid = ({ data }) => {

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="sensor-grid">
      {/* Gas Level Card */}
      <motion.div 
        className={`card gas-level ${data.analogGasValue > 300 ? 'warning' : ''}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <GiGasStove className="icon" />
        <div className="content">
          <h3>Air Quality</h3>
          <div className="value">
            {data.analogGasValue}<span className="unit">ppm</span>
          </div>
          <div className="status">
            {data.analogGasValue > 300 ? 'Poor Air Quality' : 'Normal'}
          </div>
        </div>
      </motion.div>

      {/* Gas Detection Card */}
      <motion.div 
        className={`card gas-detection ${data.digitalGasDetected ? 'alert' : ''}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <GiGasMask className="icon" />
        <div className="content">
          <h3>Gas Detection</h3>
          <div className="value">
            {data.digitalGasDetected ? 'DETECTED' : 'CLEAR'}
          </div>
          <div className="status">
            {data.digitalGasDetected ? 'Evacuate Area!' : 'No threats detected'}
          </div>
        </div>
      </motion.div>

      {/* Motion Detection Card */}
      <motion.div 
        className={`card motion ${data.motionDetected ? 'active' : ''}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GiMovementSensor className="icon" />
        <div className="content">
          <h3>Motion Sensor</h3>
          <div className="value">
            {data.motionDetected ? 'MOVEMENT' : 'STILL'}
          </div>
          <div className="status">
            {data.motionDetected ? 'Activity detected' : 'No movement'}
          </div>
        </div>
      </motion.div>

      {/* Noise Detection Card */}
      <motion.div 
        className={`card noise ${data.noiseDetected ? 'active' : ''}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <GiMegaphone className="icon" />
        <div className="content">
          <h3>Noise Level</h3>
          <div className="value">
            {data.noiseDetected ? 'NOISE' : 'QUIET'}
          </div>
          <div className="status">
            {data.noiseDetected ? 'Sound detected' : 'Ambient noise level'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>HomeSecure</h4>
          <p>Smart Home Security Solution</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@enviromonitor.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2023 EnviroMonitor. All rights reserved.</p>
      </div>
    </footer>
  );
};


const LandingPage = () => {
  const [data, setData] = useState({ 
    analogGasValue: 1136, 
    digitalGasDetected: 1000, 
    motionDetected: 1,
    noiseDetected: 1
  });

  useEffect(() => {
    const sensorRef = ref(db, "/sensorData");
    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val());
      }
    });
  }, []);

  return (
    <div className="landing-page">
      <Navbar />

      <header className="hero" id="home">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Smart Home Security System</h1>
          <p>Real-time monitoring of your surroundings</p>
        </motion.div>
      </header>
<ChatBot/>

      <main className="main-content">
        {/* Information Section */}
        <motion.section 
          className="information"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2>Sensor Information</h2>
          <div className="sensor-info-grid">
            <div className="sensor-info-card">
              <h3>MQ-2 Gas Sensor</h3>
              <p>
                The MQ-2 gas sensor is used to detect various gases such as LPG, propane, methane, hydrogen, and smoke. 
                It provides both analog and digital outputs. The analog output gives a voltage proportional to the gas concentration, 
                while the digital output triggers when the gas concentration exceeds a certain threshold.
              </p>
            </div>
            <div className="sensor-info-card">
              <h3>LM393 Sound Detector</h3>
              <p>
                The LM393 sound detector module is used to detect sound levels in the environment. 
                It has a built-in microphone and provides both analog and digital outputs. 
                The digital output triggers when the sound level exceeds a certain threshold, 
                making it ideal for noise detection applications.
              </p>
            </div>
            <div className="sensor-info-card">
              <h3>PIR Motion Sensor</h3>
              <p>
                The PIR (Passive Infrared) motion sensor is used to detect movement in its field of view. 
                It works by detecting infrared radiation emitted by objects in its range. 
                When motion is detected, the sensor outputs a high signal, which can be used to trigger alarms or other actions.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Live Status Section */}
        <motion.section 
          className="live-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          id="features"
        >
          <h2>Current Security Status</h2>
          <SensorGrid data={data} />
        </motion.section>

        {/* Features Section */}
        <section className="features">
          <div className="feature-card">
            <GiGasMask size={40} />
            <h3>Gas Detection</h3>
            <p>Instant alerts for hazardous gas leaks</p>
          </div>
          <div className="feature-card">
            <GiMovementSensor size={40} />
            <h3>Motion Sensing</h3>
            <p>24/7 movement monitoring</p>
          </div>
          <div className="feature-card">
            <GiMegaphone size={40} />
            <h3>Noise Control</h3>
            <p>Real-time sound level analysis</p>
          </div>
        </section>
      </main>
      

      <Footer />

      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
        }

        body {
          background: #f8f9fa;
        }

        .navbar {
          background: white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .nav-link {
          color: #2c3e50;
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: #4b6cb7;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #4b6cb7;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: #2c3e50;
        }

        .hero {
          background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
          color: white;
          padding: 6rem 2rem 4rem;
          text-align: center;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .hero p {
          font-size: 1.2rem;
          opacity: 0.9;
        }

        .main-content {
          max-width: 1200px;
          margin: -50px auto 0;
          padding: 0 2rem;
          position: relative;
        }

        .information {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 3rem;
        }

        .information h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #2c3e50;
        }

        .sensor-info-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .sensor-info-card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .sensor-info-card h3 {
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .sensor-info-card p {
          color: #666;
          font-size: 0.9rem;
        }

        .live-status {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 3rem;
        }

        .live-status h2 {
          text-align: center;
          margin-bottom: 2rem;
          color: #2c3e50;
        }

        .sensor-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }

        .card {
          background: white;
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          min-height: 200px;
        }

        .card:hover {
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .card.warning {
          background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
          animation: pulse 1.5s infinite;
        }

        .card.gas-detection.alert {
          background: linear-gradient(135deg, #ff5858 0%, #f09819 100%);
          color: white;
        }

        .card.motion.active {
          background: linear-gradient(135deg, #4b6cb7 0%, #182848 100%);
          color: white;
        }

        .card.noise.active {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
        }

        .icon {
          font-size: 3rem;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }

        .content {
          flex: 1;
        }

        .value {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .unit {
          font-size: 1.2rem;
          margin-left: 0.3rem;
        }

        .status {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .features {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          padding: 2rem 0;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .feature-card h3 {
          margin: 1rem 0;
          color: #2c3e50;
        }

        .feature-card p {
          color: #666;
          font-size: 0.9rem;
        }

        .footer {
          background: #2c3e50;
          color: white;
          padding: 3rem 0 1rem;
          margin-top: auto;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .footer-section h4 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .footer-section a {
          color: #ddd;
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .footer-section a:hover {
          color: #4b6cb7;
        }

        .social-icons {
          display: flex;
          gap: 1rem;
        }

        .social-icons a {
          color: white;
          transition: color 0.3s ease;
        }

        .social-icons a:hover {
          color: #4b6cb7;
        }

        .footer-bottom {
          text-align: center;
          padding: 1.5rem 0;
          margin-top: 2rem;
          border-top: 1px solid #3a506b;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            inset: 0 0 0 30%;
            background: white;
            flex-direction: column;
            padding: min(30vh, 10rem) 2rem;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
          }

          .nav-links.active {
            transform: translateX(0%);
          }

          .mobile-menu-btn {
            display: block;
            z-index: 9999;
          }

          .hero {
            padding-top: 6rem;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .main-content {
            padding: 0 1rem;
          }

          .live-status {
            padding: 1.5rem;
          }

          .card {
            padding: 1.5rem;
          }

          .value {
            font-size: 2rem;
          }
        }
      `}</style>

      <style jsx>{`
        .landing-page {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          padding-bottom: 3rem;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
