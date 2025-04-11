🏠 HomeSecure – Emergency Awareness & Response System

HomeSecure is an end-to-end IoT-based Emergency Monitoring and AI Response system developed as a third-year engineering project. 
This hybrid hardware + software solution detects emergency conditions like fire, smoke, gas leaks, and motion, 
then displays real-time data on a modern web interface while also integrating an AI chatbot for immediate support and guidance.

🚀 Features

🧠 AI-Powered Chatbot (Gemini 2.0):
Predefined with domain-specific knowledge to answer queries related to:
Fire
Smoke
Gas leakage
Medical emergencies

🌐 Real-time Monitoring Dashboard:Data from sensors is sent to Firebase and rendered on a responsive web dashboard.

💬 Smart Interaction:Gemini 2.0 chatbot enables users to ask emergency-related questions and get immediate, context-aware responses.

⚙️ Modern Frontend:Built using React, styled with Tailwind CSS, and animated using Framer Motion for smooth UI transitions.

☁️ Deployed on Netlify:Fast, globally accessible web hosting.


🛠️ Tech Stack:
Frontend:React,Tailwind CSS,Framer Motion
Backend/Database:Firebase Realtime Database
AI Chatbot	Gemini 2.0 (domain-specific)
Hosting	Netlify
Hardware:ESP32, MQ-2 Gas Sensor, PIR Motion Sensor, Sound Sensor

🔧 Hardware Overview:
ESP32 – Wi-Fi-enabled microcontroller for sending sensor data to Firebase.
MQ-2 Gas Sensor – Detects gases like LPG, smoke, and CO.
PIR Sensor – Detects human motion (used for identifying presence during emergencies).
Sound Sensor – Detects abnormal noise levels, helpful in identifying distress.

📡 How HomeSecure Works
Sensor Module (ESP32 + MQ-2 + PIR + Sound Sensor LM393) monitors the environment for emergencies.
Sensor readings are pushed in real-time to Firebase.
A React-based Web App fetches and visualizes this data.
Users interact with an AI Chatbot (Gemini 2.0) for emergency-related queries.
The full application is hosted on Netlify for easy access("https://bejewelled-bubblegum-9c2e52.netlify.app/").

💡 Future Scope
Add real-time alerts via SMS/Email.
Expand AI capabilities to handle more scenarios.
Integrate live video streaming from the emergency location.
Add user authentication & admin dashboard.

📄 License
This project is for educational and research purposes.
