# Persona AI Chat — Vercel Edition

A single Vercel project: React (Vite) frontend + Vercel serverless functions
as the backend (no separate Express server). Deploys as one project on
Vercel's free tier.

## What changed from the two-server version
- **No Express server** — replaced with individual serverless functions in `/api`
- **No SSE streaming** — Vercel's free-tier functions don't support long-lived streams, so `/api/chat` now returns the full reply in one response. The frontend fakes a typing animation client-side (`src/lib/typingReveal.js`) so it still feels like it's streaming.
- **No CORS config needed** — frontend and API are served from the same domain
- **Cached MongoDB connection** — serverless functions reuse the DB connection across warm invocations instead of reconnecting every request (`api/_lib/db.js`)
- Everything else — Gemini integration, system prompts, chat persistence, sidebar, copy/regenerate, theming — is unchanged.

## Project structure
```
/api
  /_lib          -> shared helpers (db, gemini client, models, prompts)
  chat.js        -> POST /api/chat  (send message / regenerate)
  /chat/[chatId].js   -> GET, DELETE a single thread
  /chats/[sessionId].js -> GET sidebar list
/src             -> React app (unchanged structure)
/public          -> images, favicon
vercel.json      -> SPA routing + function timeout config
```

## Local development

```bash
npm install
```

Create `.env` (see `.env.example`):
```
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=your_mongodb_atlas_connection_string_here
```

To run both the frontend and the `/api` functions locally exactly like Vercel does in production, use the Vercel CLI:
```bash
npm install -g vercel
vercel dev
```
(Plain `npm run dev` only runs the Vite frontend — API calls will fail without `vercel dev` or a deployed backend, since there's no local Express server anymore.)

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. On [vercel.com](https://vercel.com): New Project → import the repo. Framework preset: Vite (auto-detected).
3. Add environment variables in the Vercel dashboard (Project Settings → Environment Variables):
   ```
   GEMINI_API_KEY=your_key
   MONGODB_URI=your_atlas_uri
   ```
4. Deploy. That's it — frontend and API both go live on the same domain, no separate backend hosting needed.

## Notes
- MongoDB Atlas: make sure your cluster's Network Access allows connections from anywhere (`0.0.0.0/0`), since Vercel's serverless functions don't have a fixed IP.
- Function timeout is set to 30s in `vercel.json` to give Gemini enough time to respond; Vercel's free (Hobby) tier supports this.
"# AI-Persona" 
