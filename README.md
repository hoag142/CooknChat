# Cook'n'Chat

A web application that helps users discover recipes based on available ingredients through an interactive chat interface.

## Features

- Chat with a bot to input ingredients and get recipe suggestions
- View detailed recipe information including ingredients and instructions
- Save chat history for future reference
- Modern, responsive UI built with React and TailwindCSS

## Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- React Router
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Dialogflow (Chatbot)
- Spoonacular API (Recipe data)

### Development & Deployment
- Docker + Docker Compose
- ESLint + Prettier
- Jest (Testing)

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- MongoDB
- Docker (optional, for containerized deployment)
- Spoonacular API key
- Dialogflow credentials (for chatbot)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cooknchat.git
cd cooknchat
```

2. Set up environment variables:
```bash
# Backend (.env)
cp backend/.env.example backend/.env
# Frontend (.env)
cp frontend/.env.example frontend/.env
```

3. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

4. Start development servers:
```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm run dev
```

## Project Structure

```
cooknchat/
├─ backend/          # Express server, MongoDB models, API routes
├─ frontend/         # React application
├─ docker-compose.yml
└─ README.md
```

## Development Roadmap

### Week 1: Project Setup & Requirements Analysis
- [x] Initialize project structure
- [ ] Set up development environment
- [ ] Define MVP features
- [ ] Create wireframes

### Week 2: Backend Development
- [ ] Set up Express server
- [ ] Design database schemas
- [ ] Implement basic API routes
- [ ] Integrate Spoonacular API

### Week 3: Frontend Development
- [ ] Create React application
- [ ] Implement core components
- [ ] Set up routing
- [ ] Connect to backend API

### Week 4: Chatbot Integration
- [ ] Set up Dialogflow
- [ ] Implement chat history
- [ ] Connect chatbot to backend

### Week 5: UI/UX Enhancement
- [ ] Improve UI design
- [ ] Add loading states
- [ ] Implement error handling
- [ ] Add responsive design

### Week 6: Authentication (Optional)
- [ ] Implement user authentication
- [ ] Add protected routes
- [ ] User profile management

### Week 7: Testing & Optimization
- [ ] Write unit tests
- [ ] Perform end-to-end testing
- [ ] Optimize performance
- [ ] Security review

### Week 8: Deployment
- [ ] Containerize application
- [ ] Set up production environment
- [ ] Deploy to cloud platform

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Spoonacular API for recipe data
- Dialogflow for chatbot capabilities
- React and Node.js communities
