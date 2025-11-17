# Restaurant Demo Frontend

A Next.js-based web interface for interacting with a LiveKit-powered restaurant reservation voice agent.

## 🎯 Project Overview

This frontend application provides a web interface for customers to interact with an AI-powered restaurant agent that can:
- Check table availability
- Make reservations
- Find existing reservations
- Update reservation details
- Provide menu information
- Suggest specialty dishes

The agent communicates via voice using LiveKit's real-time infrastructure and OpenAI's GPT-4o Realtime API.

## 🏗️ Architecture

```
┌─────────────────┐
│   Web Browser   │
│  (This Frontend)│
└────────┬────────┘
         │
         │ WebSocket (LiveKit)
         ▼
┌─────────────────┐
│ LiveKit Cloud   │
│ Server          │
└────────┬────────┘
         │
         │ Agent Connection
         ▼
┌─────────────────┐
│ Restaurant Agent│
│  (Python/GPT-4o)│
└─────────────────┘
```

## 🚀 Deployment

### Live URL
- **Production**: https://restorant-demo-frontend.vercel.app/

### GitHub Repository
- **Repository**: https://github.com/hilaelvis/restorant_demo_frontend

---

This is based on the [LiveKit Agents](https://docs.livekit.io/agents) starter template for web embed using the [LiveKit JavaScript SDK](https://github.com/livekit/client-sdk-js). It supports [voice](https://docs.livekit.io/agents/start/voice-ai) and [transcriptions](https://docs.livekit.io/agents/build/text/).

<picture>
  <source srcset="./.github/assets/readme-hero-dark.webp" media="(prefers-color-scheme: dark)">
  <source srcset="./.github/assets/readme-hero-light.webp" media="(prefers-color-scheme: light)">
  <img src="./.github/assets/readme-hero-light.webp" alt="App screenshot">
</picture>

## ✨ Features

- ✅ Real-time voice interaction with restaurant AI agent
- ✅ Table availability checking
- ✅ Reservation management (create, find, update)
- ✅ Menu inquiries and specialty recommendations
- ✅ Audio visualization and level monitoring
- ✅ Light/dark theme switching
- ✅ Responsive design for all devices
- ✅ Embedded iframe and popup modes

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.7
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Real-time Communication**: LiveKit Client SDK
- **Deployment**: Vercel
- **Package Manager**: pnpm 9.15.9

### Project structure

```
agent-starter-react/
├── app/
│   ├── (app)/
│   ├── (iframe)/
│   ├── api/
│   ├── test/
│   ├── favicon.ico
├── components/
│   ├── embed-iframe/
│   ├── embed-popup/
│   ├── livekit/
│   ├── ui/
│   ├── popup-page.tsx
│   ├── root-layout.tsx
│   └── theme-toggle.tsx
│   └── welcome.tsx
│   └── ...
├── hooks/
├── lib/
├── public/
├── styles/
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22.18.0 or higher
- pnpm 9.15.9 or higher
- LiveKit Cloud account
- Restaurant Agent running (separate Python application)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/hilaelvis/restorant_demo_frontend.git
cd restorant_demo_frontend
```

#### 2. Install Dependencies

```bash
pnpm install
```

#### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# LiveKit server connection details
LIVEKIT_URL=wss://restorantagent-7fh5f3gt.livekit.cloud
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_API_SECRET=your_api_secret_here

# Local development endpoint (optional - uses relative path by default)
NEXT_PUBLIC_CONN_DETAILS_ENDPOINT=http://localhost:3000/api/connection-details
```

**Important**:
- Keep `.env.local` private - it's in `.gitignore` for security
- For Vercel deployment, set these as environment variables in the Vercel dashboard
- `NEXT_PUBLIC_CONN_DETAILS_ENDPOINT` is optional - if not set, it defaults to `/api/connection-details`

### Running Locally

#### Start the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

#### Other Commands

```bash
# Build for production
pnpm build

# Run production build locally
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format

# Build embed popup script
pnpm build-embed-popup-script
```

## ⚙️ Configuration

### App Configuration (`app-config.ts`)

Customize the frontend behavior by editing [`app-config.ts`](./app-config.ts):

```ts
export const APP_CONFIG_DEFAULTS = {
  supportsChatInput: true,       // Enable text chat input
  supportsVideoInput: true,      // Enable video streaming
  supportsScreenShare: true,     // Enable screen sharing
  isPreConnectBufferEnabled: true, // Pre-connect audio buffer
};
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `LIVEKIT_URL` | LiveKit server WebSocket URL | ✅ Yes | - |
| `LIVEKIT_API_KEY` | LiveKit API key | ✅ Yes | - |
| `LIVEKIT_API_SECRET` | LiveKit API secret | ✅ Yes | - |
| `NEXT_PUBLIC_CONN_DETAILS_ENDPOINT` | Connection endpoint URL | ❌ No | `/api/connection-details` |

**Security Note**: Only `NEXT_PUBLIC_*` variables are exposed to the browser. API keys and secrets remain server-side.

## 🌐 Deploying to Vercel

### Initial Deployment

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import the repository: `hilaelvis/restorant_demo_frontend`
4. Configure environment variables (see table above)
5. Deploy!

### Vercel Environment Variables

Set these in your Vercel project settings → Environment Variables:

```
LIVEKIT_URL=wss://restorantagent-7fh5f3gt.livekit.cloud
LIVEKIT_API_KEY=your_api_key_here
LIVEKIT_API_SECRET=your_api_secret_here
```

**Don't set** `NEXT_PUBLIC_CONN_DETAILS_ENDPOINT` in Vercel - it auto-configures to your deployment URL!

## 🔌 How It Works

### Connection Flow

1. **User opens the web app** → Frontend loads
2. **Frontend requests connection details** → `/api/connection-details` endpoint
3. **Backend generates token** → Creates LiveKit access token with agent dispatch
4. **Frontend connects to LiveKit** → Establishes WebSocket connection
5. **Agent is dispatched** → LiveKit dispatches `restorant_agent` to the room
6. **Voice interaction begins** → User can speak with the agent

### Agent Dispatch

The frontend requests a specific agent via the LiveKit room configuration. The agent name must match between frontend and backend:

```typescript
// Frontend: app/api/connection-details/route.ts
at.roomConfig = new RoomConfiguration({
  agents: [{ agentName: "restorant_agent" }],
});
```

```python
# Backend: agent.py
agents.cli.run_app(
    agents.WorkerOptions(
        agent_name="restorant_agent",  # Must match frontend!
    )
)
```

### Room Naming Convention

- **Web Frontend**: `voice_assistant_room_XXXX` (randomly generated)
- **Telephony (Twilio)**: `sip-*` or `call-*` or rooms containing `twilio`
- The agent detects connection type based on room name pattern

## 🐛 Troubleshooting

### Agent Not Connecting

**Symptoms**: Frontend loads but agent doesn't join the room

**Solutions**:
1. ✅ Verify the agent is running: `python -m livekit.agents dev agent.py`
2. ✅ Check agent name matches: Frontend requests `restorant_agent`
3. ✅ Verify LiveKit credentials match in both agent and frontend
4. ✅ Check browser console for errors (F12)
5. ✅ Ensure agent sees the room join event in logs

### Environment Variables Not Working

**Symptoms**: Connection fails with authentication errors

**Solutions**:
1. ✅ Restart dev server after changing `.env.local`
2. ✅ Verify no typos in environment variable names
3. ✅ Check Vercel environment variables are set correctly
4. ✅ Ensure `LIVEKIT_URL` uses `wss://` not `ws://`

### Build Errors

**Symptoms**: `pnpm build` fails

**Solutions**:
1. ✅ Delete `node_modules` and `.next` folders
2. ✅ Run `pnpm install` again
3. ✅ Check Node.js version: `node --version` (should be 22+)
4. ✅ Try `pnpm build-embed-popup-script` first

## 📝 Changelog

### 2025-01-17 - Initial Setup & Configuration

#### ✅ Completed Tasks
- ✅ Recreated Python virtual environment for LiveKit agent
- ✅ Installed all Python dependencies (livekit-agents, openai, mem0ai, etc.)
- ✅ Verified agent environment configuration
- ✅ Installed frontend Node.js dependencies (551 packages via pnpm)
- ✅ Verified frontend environment configuration
- ✅ Uploaded frontend to GitHub: https://github.com/hilaelvis/restorant_demo_frontend
- ✅ Deployed to Vercel: https://restorant-demo-frontend.vercel.app/
- ✅ Created comprehensive README documentation

#### 🔧 Current Configuration
- **LiveKit Server**: `wss://restorantagent-7fh5f3gt.livekit.cloud`
- **Agent Name**: `restorant_agent`
- **Frontend Room Pattern**: `voice_assistant_room_*`
- **Agent Room Detection**: Detects telephony vs web based on room name
- **Tech Stack**: Next.js 15.4.7, React 19, Tailwind CSS 4, LiveKit SDK

#### 🔍 Bug Fixes
- 🐛 **FIXED**: Added missing `agentName: 'restorant_agent'` to `app-config.ts`
  - **Issue**: Frontend wasn't requesting the correct agent from LiveKit
  - **Symptom**: "Agent did not join the room" error on frontend
  - **Root Cause**: `APP_CONFIG_DEFAULTS` was missing the `agentName` field
  - **Solution**: Added `agentName: 'restorant_agent'` to match backend agent name
  - **File Changed**: [`app-config.ts`](./app-config.ts)

---

## 📞 Support & Resources

- [LiveKit Documentation](https://docs.livekit.io/)
- [LiveKit Agents Guide](https://docs.livekit.io/agents)
- [LiveKit Community Slack](https://livekit.io/join-slack)
- [GitHub Issues](https://github.com/hilaelvis/restorant_demo_frontend/issues)

## 📄 License

See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using LiveKit, Next.js, and OpenAI GPT-4o**
