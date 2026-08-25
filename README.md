🌿 Verdant — AI-Based Crop Management & Disease Advisory System
Verdant is an AI-powered crop management system designed to help farmers understand crop diseases and receive practical treatment and prevention advice.
The system combines a crop disease prediction interface with an AI agricultural advisory system powered by Groq AI.

🚀 Features

- 📷 Upload a crop/leaf image
- 🔍 Analyze crop health
- 🌱 Crop disease prediction interface
- 📊 Disease confidence and severity display
- 🤖 AI-powered crop advisory
- 💊 Treatment recommendations
- 🌿 Organic treatment suggestions
- 📅 Treatment frequency guidance
- 🛡️ Prevention recommendations
- 🌾 Whole-crop risk assessment
- 🔄 Clear image and analyze another crop
- 📱 Responsive web interface
🧠 AI Advisory

After a disease is detected, Verdant generates answers to six important questions:
1. What caused this?
2. How can I treat it?
3. Can I use an organic treatment?
4. How often should I apply the treatment?
5. How can I prevent it next season?
6. Is this dangerous for my whole crop?

The AI considers:
- Crop type
- Detected disease
- Disease severity
- Practical treatment methods
- Organic alternatives
- Prevention strategies

🏗️ Project Structure

Verdant/
│
├── index.html
├── server.js
├── package.json
├── package-lock.json
└── README.md


index.html
Contains the frontend interface, including:
- Image upload
- Image preview
- Analyze button
- Disease result section
- Confidence indicator
- AI advisory questions
- Clear/reset functionality
server.js
Contains the Node.js backend.
It:
- Starts the web server
- Serves index.html
- Receives crop/disease information
- Sends the information to Groq AI
- Processes the AI response
- Returns structured advisory data to the frontend


⚙️ Technologies Used
Technology	Purpose
HTML5	Web structure
CSS3	User interface
JavaScript	Frontend functionality
Node.js	Backend server
Groq API	AI advisory
Groq SDK	Communication with Groq
JSON	Data exchange


