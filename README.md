# The Bronze Co

A full-stack application featuring a React frontend with a bronze-themed website and a Django backend with AI-powered chat functionality.

## Features

- **Frontend**: React + Vite with beautiful bronze-themed UI components
- **Backend**: Django with LLM integration using Gemini 2.5
- **AI Chat Bot**: Floating chat interface with streaming responses
- **Smooth Animations**: Framer Motion for beautiful UI transitions

## Project Structure

```
TheBronzeCo/
├── src/                    # React frontend
│   ├── components/         # React components including ChatBot
│   ├── hooks/             # Custom React hooks
│   └── App.jsx            # Main React application
├── backend/               # Django backend
│   ├── config/            # Django project configuration
│   ├── Backend/           # Django app with chat API
│   ├── .env               # Environment variables (Gemini API key)
│   └── manage.py         # Django management script
└── package.json           # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)
- Gemini API key

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or `5174` if 5173 is occupied)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r ../requirements.txt
   ```

4. Configure Gemini API key:
   - Open `backend/.env`
   - Replace `your_gemini_api_key_here` with your actual Gemini API key
   - Get your API key from: https://makersuite.google.com/app/apikey

5. Start the Django server:
   ```bash
   python manage.py runserver
   ```
   The backend will run on `http://127.0.0.1:8000`

### Using the Chat Bot

1. Make sure both frontend and backend servers are running
2. Open the frontend in your browser
3. Click the floating bot icon in the bottom-right corner
4. The chat window will open with smooth animations
5. Start chatting with the Bronze Assistant powered by Gemini 2.5

## Development

### Frontend Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run linter

### Backend Development
- `python manage.py runserver` - Start Django development server

## Deploying the API to Vercel

The repository includes a Vercel Python entrypoint at `api/index.py`. Configure these environment variables in the Vercel project settings:

- `GEMINI_API_KEY` - Your Gemini API key
- `GEMINI_MODEL` - Optional model name, defaults to `gemini-3.6-flash`
- `DJANGO_SECRET_KEY` - A production Django secret
- `DJANGO_DEBUG` - Set to `false`
- `DJANGO_ALLOWED_HOSTS` - Optional comma-separated custom API hosts
- `CORS_ALLOWED_ORIGINS` - Comma-separated frontend origins, including your production frontend URL
- `VITE_API_URL` - The deployed API base URL used by the frontend, for example `https://your-api.vercel.app`

Deploy from the repository root. Vercel installs Python packages from `requirements.txt`, routes `/api/*` through Django, and preserves the existing `POST /api/chat/` endpoint.

## API Endpoints

### POST /api/chat/
Streaming endpoint for AI chat communication.

**Request:**
```json
{
  "message": "Your message here"
}
```

**Response:** Streaming JSON chunks
```json
{"type": "chunk", "content": "Partial response"}
{"type": "done", "content": ""}
```

## Technologies Used

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React DOM

### Backend
- Django 6.1
- Django CORS Headers
- Python Dotenv
- Google Generative AI (Gemini 2.5)

## Notes

- The chat bot uses Gemini 2.5 Flash model for fast, streaming responses
- CORS is configured to allow requests from the frontend
- The bot features smooth animations and a beautiful bronze-themed UI
- Make sure to set your GEMINI_API_KEY in the backend/.env file

## License

This project is proprietary and confidential.