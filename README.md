# VV's Portfolio

A modern, full-stack portfolio website showcasing films, scripts, blogs, and content branding work.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Deployment**: Vercel

## Local Development

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/vv-portfolio.git
cd vv-portfolio
```

2. Install dependencies for both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Start the development servers:

```bash
# Terminal 1: Start the backend server
cd server
npm start
# Server runs on http://localhost:5001

# Terminal 2: Start the frontend dev server
cd client
npm run dev
# Client runs on http://localhost:5173
```

4. Open your browser to `http://localhost:5173`

## Project Structure

```
shawn-garcia-portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── .env.development   # Development environment variables
│   ├── .env.production    # Production environment variables
│   └── package.json
│
└── server/                # Backend Express API
    ├── data/              # Content data
    │   ├── blogs/         # Blog posts
    │   └── scripts/       # Script files and images
    ├── server.js          # API server
    ├── vercel.json        # Vercel deployment config
    └── package.json
```

## Environment Variables

### Client (.env.development / .env.production)
```
VITE_API_URL=http://localhost:5001  # or your production API URL
```

### Server
```
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173  # or your production frontend URL
```

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm start` - Start the API server

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Vercel.

Quick deployment:
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy server (get API URL)
4. Deploy client (set VITE_API_URL to server URL)

## Features

- 📱 Fully responsive design
- 🎬 Dynamic film showcase
- 📝 Blog system with modals
- 📜 Script portfolio with image galleries
- 🎨 Content & branding partnerships showcase
- 🔄 Smooth page transitions
- 🎯 SEO optimized

## License

All rights reserved © 2026 Vaibhav Vinayak
