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
  supportsChatInput: true, // Enable text chat input
  supportsVideoInput: true, // Enable video streaming
  supportsScreenShare: true, // Enable screen sharing
  isPreConnectBufferEnabled: true, // Pre-connect audio buffer
};
```

### Customizing the Avatar Popup Logo

This project has been customized with a custom avatar logo and speech bubble. Here's a complete guide to the customizations:

#### 1. **Replace Logo Files**

Replace the logo files in the `public/` directory:

- `public/lk-logo.svg` - Light mode avatar logo
- `public/lk-logo-dark.svg` - Dark mode avatar logo (optional, can be same as light)

**Logo Requirements**:

- Format: SVG (for scalability and quality)
- Can embed PNG/images within SVG using base64 or references
- Viewbox: Any size (automatically scaled)
- File size: Keep under 2MB for optimal loading

**Creating the SVG**:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39.45 37.73">
  <!-- Your avatar image embedded as base64 or SVG paths -->
  <image width="1236" height="1182" transform="scale(0.03)"
         xlink:href="data:image/png;base64,..." />
</svg>
```

#### 2. **Popup Button Customizations**

The popup trigger has been customized in [`components/embed-popup/trigger.tsx`](components/embed-popup/trigger.tsx):

**Logo Display**:

- **Scale**: `transform: scale(3.6)` - Avatar appears 3.6x larger than original size
- **No circular border**: Removed the teal circular background for clean avatar display
- **Position**: Fixed at `right-8 bottom-4` (32px from right, 16px from bottom)

**Speech Bubble**:

- **Text**: "Posso aiutarti?" (Italian for "Can I help you?")
- **Position**: Above and slightly left of avatar (`-right-6 bottom-full`)
- **Styling**: White rounded bubble with shadow and small triangular tail
- **Animation**: Fades in 0.5 seconds after page load with scale effect
- **Z-index**: Behind avatar (z-0) to allow overlap without covering logo

#### 3. **Code Changes**

**File: `components/embed-popup/trigger.tsx`**

```typescript
// Logo path logic - works for both embedded and direct access
const logoSrc = baseUrl
  ? `https://${baseUrl}.vercel.app/lk-logo.svg`
  : '/lk-logo.svg';

// Removed circular border classes
className="relative z-20 grid size-16 place-items-center transition-colors"

// Increased logo scale
<img
  src={`${logoSrc}?v=17`}
  alt="Logo"
  className="h-16 w-16"
  style={{ transform: 'scale(3.6)' }}
/>

// Added speech bubble
<motion.div className="absolute -right-6 bottom-full z-0 mb-4">
  <div className="relative rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-lg">
    <p className="text-sm font-medium whitespace-nowrap text-gray-800">
      Posso aiutarti?
    </p>
    {/* Triangular tail pointing to avatar */}
    <div className="absolute right-4 -bottom-2 h-4 w-4 rotate-45 transform border-r border-b border-gray-200 bg-white"></div>
  </div>
</motion.div>
```

**File: `components/embed-popup/error-message.tsx`**

```typescript
// Logo paths for error states
const logoSrc = baseUrl ? `https://${baseUrl}.vercel.app/lk-logo.svg` : '/lk-logo.svg';
const logoDarkSrc = baseUrl
  ? `https://${baseUrl}.vercel.app/lk-logo-dark.svg`
  : '/lk-logo-dark.svg';
```

#### 4. **Embedding on External Sites**

When embedding the widget on external websites (e.g., fastfood.sevitech.org):

```html
<script
  src="https://sevi-avatar-avatarlogo.vercel.app/embed-popup.js"
  data-lk-sandbox-id="sevi-avatar-avatarlogo"
></script>
```

**Important**:

- `data-lk-sandbox-id` should contain **ONLY the subdomain** (e.g., `sevi-avatar-avatarlogo`)
- Do NOT include `https://` or `.vercel.app`
- This ensures logos load from your Vercel deployment, not the embedding site

#### 5. **Customization Options**

**To change the speech bubble text**:

```typescript
// In components/embed-popup/trigger.tsx, line 68
<p className="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">
  Your Custom Text Here
</p>
```

**To adjust logo size**:

```typescript
// In components/embed-popup/trigger.tsx, line 98
style={{ transform: 'scale(3.6)' }} // Change 3.6 to your preferred scale
```

**To change popup position**:

```typescript
// In components/embed-popup/trigger.tsx, line 54
className = 'fixed right-16 bottom-8 z-50'; // Adjust right-16 and bottom-8
```

**To adjust speech bubble position**:

```typescript
// In components/embed-popup/trigger.tsx, line 64
className = 'absolute -right-6 bottom-full z-0 mb-4'; // Adjust -right-6 and mb-4
```

#### 6. **Deployment**

After making logo changes:

1. **Local testing**: Changes auto-reload in dev mode (`pnpm dev`)
2. **Format code**: Run `pnpm format` to ensure Prettier compliance
3. **Commit changes**:
   ```bash
   git add public/lk-logo.svg components/embed-popup/trigger.tsx
   git commit -m "Update avatar logo and customizations"
   git push
   ```
4. **Vercel auto-deploys**: Push to GitHub triggers automatic deployment
5. **Verify**: Check both direct access and embedded widget

#### 7. **Where the Logo Appears**

- ✅ Floating popup button (bottom-right corner)
- ✅ Error message screens (with both light/dark variants)
- ✅ Embedded widgets on external sites
- ✅ Standalone pages on Vercel
- ✅ Test pages (`/test/popup`)

#### 8. **Troubleshooting**

**Logo not showing on embedded sites (404 errors)**:

The code now automatically handles both formats for `data-lk-sandbox-id`:

✅ **Both formats work**:

```html
<!-- With https:// prefix (old format) -->
<script
  src="https://sevi-avatar-avatarlogo.vercel.app/embed-popup.js"
  data-lk-sandbox-id="https://sevi-avatar-avatarlogo"
></script>

<!-- Without prefix (recommended) -->
<script
  src="https://sevi-avatar-avatarlogo.vercel.app/embed-popup.js"
  data-lk-sandbox-id="sevi-avatar-avatarlogo"
></script>
```

**How it works**:

- The code strips `https://` or `http://` from `baseUrl` using `.replace(/^https?:\/\//, '')`
- Prevents malformed URLs like `https://https://...`
- Constructs correct logo URL: `https://sevi-avatar-avatarlogo.vercel.app/lk-logo.svg`

**If logo still not showing**:

1. Check browser console for actual error (look for the exact URL being requested)
2. Verify Vercel deployment completed successfully
3. Ensure SVG files exist in `public/` folder
4. Clear browser cache and hard refresh (Ctrl+Shift+R)
5. Check that `data-lk-sandbox-id` matches your Vercel subdomain

**Logo appears too small/large**:

- Adjust `scale()` value in trigger.tsx line 98
- Typical range: 2.0 to 4.0
- Current setting: `scale(3.6)` for avatar logo

**Speech bubble overlaps logo**:

- Increase negative right value (e.g., `-right-6` to `-right-8`)
- Speech bubble is z-0, logo is z-20, so logo should always be on top
- Adjust `mb-4` to change vertical spacing

**Common Issues & Solutions**:

| Issue                                 | Cause                                    | Solution                                     |
| ------------------------------------- | ---------------------------------------- | -------------------------------------------- |
| Logo loads from wrong domain          | `baseUrl` undefined or empty             | Verify embed script has `data-lk-sandbox-id` |
| Malformed URL (https://https://...)   | `data-lk-sandbox-id` includes `https://` | Code auto-strips this now (v2023-12-15+)     |
| Logo shows on Vercel but not embedded | Relative path used instead of full URL   | Ensure `baseUrl` is passed to components     |
| Changes not appearing                 | Old bundle cached                        | Wait for Vercel redeploy, clear cache        |

### Environment Variables

| Variable                            | Description                  | Required | Default                   |
| ----------------------------------- | ---------------------------- | -------- | ------------------------- |
| `LIVEKIT_URL`                       | LiveKit server WebSocket URL | ✅ Yes   | -                         |
| `LIVEKIT_API_KEY`                   | LiveKit API key              | ✅ Yes   | -                         |
| `LIVEKIT_API_SECRET`                | LiveKit API secret           | ✅ Yes   | -                         |
| `NEXT_PUBLIC_CONN_DETAILS_ENDPOINT` | Connection endpoint URL      | ❌ No    | `/api/connection-details` |

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
  agents: [{ agentName: 'restorant_agent' }],
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

## 🔗 Embedding the Widget

### Popup Embed

Add this script tag to any website to embed the restaurant agent as a popup:

```html
<script
  src="https://restorant-demo-frontend.vercel.app/embed-popup.js"
  data-lk-sandbox-id="https://restorant-demo-frontend"
></script>
```

**Features:**

- ✅ Floating button that opens voice agent popup
- ✅ Works on any website (CORS enabled)
- ✅ No additional configuration needed
- ✅ Responsive and mobile-friendly

### Iframe Embed

Alternatively, embed directly as an iframe:

```html
<iframe
  src="https://restorant-demo-frontend.vercel.app/embed"
  width="100%"
  height="600"
  frameborder="0"
  allow="microphone"
></iframe>
```

**Note:** Make sure to allow microphone access with the `allow="microphone"` attribute.

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

## 📝 Code Modifications from Original Template

This section documents all changes made to the LiveKit Agents starter template to make it work properly with embedded widgets. **Apply these same fixes when setting up other agents.**

### Overview of Changes

When using the LiveKit Agents starter template, you'll encounter three main issues:

1. **Agent won't connect** - Missing agent name configuration
2. **CORS errors when embedding** - Missing cross-origin headers
3. **Logo 404 errors when embedding** - Assets load from wrong domain

Below are the exact code changes needed to fix these issues.

---

### 🔧 Change #1: Configure Agent Name

**File**: [`app-config.ts`](./app-config.ts)

**Problem**: Frontend doesn't know which agent to request from LiveKit.

**Solution**: Add `agentName` field to match your backend agent name.

```typescript
// BEFORE (original template)
export const APP_CONFIG_DEFAULTS: AppConfig = {
  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,
};

// AFTER (with agent name)
export const APP_CONFIG_DEFAULTS: AppConfig = {
  agentName: 'restorant_agent', // ⬅️ ADD THIS - Must match backend agent name
  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: true,
  isPreConnectBufferEnabled: true,
};
```

**Important**: Replace `'restorant_agent'` with your actual agent name from your Python backend.

---

### 🔧 Change #2: Add CORS Headers for Embedding

**File**: [`app/api/connection-details/route.ts`](./app/api/connection-details/route.ts)

**Problem**: Widget fails with CORS errors when embedded on external websites.

**Solution**: Add CORS headers to allow cross-origin requests.

```typescript
// ADD THIS after the environment variable declarations (around line 11)
// CORS headers for embedded usage
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-sandbox-id',
  'Access-Control-Max-Age': '86400',
};

// ADD THIS to handle preflight requests
// Handle OPTIONS preflight request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
```

Then modify the `POST` function to include CORS headers in responses:

```typescript
export async function POST(req: Request) {
  try {
    // ... existing code ...

    // MODIFY THIS SECTION (around line 70)
    const headers = new Headers({
      'Cache-Control': 'no-store',
      ...corsHeaders, // ⬅️ ADD THIS
    });
    return NextResponse.json(data, { headers });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(error.message, {
        status: 500,
        headers: corsHeaders, // ⬅️ ADD THIS
      });
    }
  }
}
```

---

### 🔧 Change #3: Fix Logo Loading from Vercel

When the widget embeds on external sites, logos try to load from the embedding domain instead of your Vercel deployment. This requires changes to **4 files**.

#### 3.1. Pass Base URL from Script Tag

**File**: [`components/embed-popup/standalone-bundle-root.tsx`](./components/embed-popup/standalone-bundle-root.tsx)

```typescript
// BEFORE (around line 27-30)
getAppConfig(window.location.origin, sandboxIdAttribute)
  .then((appConfig) => {
    const root = ReactDOM.createRoot(reactRoot);
    root.render(<EmbedFixedAgentClient appConfig={appConfig} />);
  })

// AFTER
getAppConfig(window.location.origin, sandboxIdAttribute)
  .then((appConfig) => {
    const root = ReactDOM.createRoot(reactRoot);
    root.render(
      <EmbedFixedAgentClient
        appConfig={{ ...appConfig, sandboxId: sandboxIdAttribute }} // ⬅️ MODIFIED
      />
    );
  })
```

#### 3.2. Forward Base URL to Child Components

**File**: [`components/embed-popup/agent-client.tsx`](./components/embed-popup/agent-client.tsx)

```typescript
// BEFORE (around line 115)
<Trigger error={error} popupOpen={popupOpen} onToggle={handleTogglePopup} />

// AFTER
<Trigger
  error={error}
  popupOpen={popupOpen}
  onToggle={handleTogglePopup}
  baseUrl={appConfig.sandboxId} // ⬅️ ADD THIS
/>
```

```typescript
// BEFORE (around line 138)
<ErrorMessage error={error} />

// AFTER
<ErrorMessage error={error} baseUrl={appConfig.sandboxId} /> // ⬅️ ADD baseUrl prop
```

#### 3.3. Update ErrorMessage Component

**File**: [`components/embed-popup/error-message.tsx`](./components/embed-popup/error-message.tsx)

```typescript
// BEFORE
interface ErrorMessageProps {
  error: EmbedErrorDetails | null;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div>
      {/* ... */}
      <img src="/lk-logo.svg" alt="LiveKit Logo" className="block size-6 dark:hidden" />
      <img src="/lk-logo-dark.svg" alt="LiveKit Logo" className="hidden size-6 dark:block" />
      {/* ... */}
    </div>
  );
}

// AFTER
interface ErrorMessageProps {
  error: EmbedErrorDetails | null;
  baseUrl?: string; // ⬅️ ADD THIS
}

export function ErrorMessage({ error, baseUrl }: ErrorMessageProps) {
  // ⬅️ ADD THESE LINES
  const logoSrc = baseUrl ? `${baseUrl}/lk-logo.svg` : '/lk-logo.svg';
  const logoDarkSrc = baseUrl ? `${baseUrl}/lk-logo-dark.svg` : '/lk-logo-dark.svg';

  return (
    <div>
      {/* ... */}
      <img src={logoSrc} alt="LiveKit Logo" className="block size-6 dark:hidden" />
      <img src={logoDarkSrc} alt="LiveKit Logo" className="hidden size-6 dark:block" />
      {/* ... */}
    </div>
  );
}
```

#### 3.4. Update Trigger Component

**File**: [`components/embed-popup/trigger.tsx`](./components/embed-popup/trigger.tsx)

```typescript
// BEFORE
interface TriggerProps {
  error: EmbedErrorDetails | null;
  popupOpen: boolean;
  onToggle: () => void;
}

export function Trigger({ error = null, popupOpen, onToggle }: TriggerProps) {
  // ... component code ...

  <div
    className="bg-bg1 size-5"
    style={{
      maskImage: 'url(/lk-logo.svg)',
      maskSize: 'contain',
    }}
  />
}

// AFTER
interface TriggerProps {
  error: EmbedErrorDetails | null;
  popupOpen: boolean;
  onToggle: () => void;
  baseUrl?: string; // ⬅️ ADD THIS
}

export function Trigger({ error = null, popupOpen, onToggle, baseUrl }: TriggerProps) {
  // ⬅️ ADD THIS LINE
  const logoSrc = baseUrl ? `${baseUrl}/lk-logo.svg` : '/lk-logo.svg';

  // ... component code ...

  <div
    className="bg-bg1 size-5"
    style={{
      maskImage: `url(${logoSrc})`, // ⬅️ MODIFIED
      maskSize: 'contain',
    }}
  />
}
```

---

### 🔧 Change #4: Fix Mobile Microphone Permission Flow (Critical for Mobile)

**File**: [`components/embed-popup/agent-client.tsx`](./components/embed-popup/agent-client.tsx)

**Problem**: On mobile devices, the agent starts talking before the user grants microphone permission, causing audio to be muted.

**Solution**: Request microphone permission BEFORE connecting to the room.

```typescript
// BEFORE (causes mobile issues - around line 82-101)
const connect = async () => {
  Promise.all([
    room.localParticipant.setMicrophoneEnabled(true, ...),
    room.connect(...)
  ]).catch(...);
};

// AFTER (fixed mobile flow)
const connect = async () => {
  try {
    // Step 1: Request microphone permission first (shows prompt to user)
    await navigator.mediaDevices.getUserMedia({ audio: true });

    // Step 2: After permission granted, connect to the room
    const connectionDetails = await existingOrRefreshConnectionDetails();
    await room.connect(connectionDetails.serverUrl, connectionDetails.participantToken);

    // Step 3: Now enable and publish the microphone track
    await room.localParticipant.setMicrophoneEnabled(true, undefined, {
      preConnectBuffer: appConfig.isPreConnectBufferEnabled,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to agent:', error);
      setError({
        title: 'There was an error connecting to the agent',
        description: `${error.name}: ${error.message}`,
      });
    }
  }
};
```

**Why This Works**:

1. `getUserMedia()` shows the browser's microphone permission prompt
2. User grants permission (promise resolves)
3. Room connects AFTER permission is granted
4. Agent only joins after user is ready
5. Microphone track publishes successfully

**Benefits**:

- ✅ Fixes mobile microphone issues
- ✅ Agent waits for user permission before joining
- ✅ No muted audio on mobile
- ✅ Works on first try without refreshes
- ✅ Desktop continues to work normally

---

### 🔧 Enhancement #1: Make Transcript Always Visible (Optional - Reverted in This Project)

**File**: [`components/embed-popup/popup-view.tsx`](./components/embed-popup/popup-view.tsx)

**What it does**: Shows conversation text in real-time without requiring users to toggle the chat button.

**Original behavior**: Transcript only visible when chat button is clicked.

**Enhanced behavior**: Transcript always visible during conversation.

```typescript
// BEFORE (around line 113-129)
{/* Transcript */}
<TranscriptMotion
  initial={{
    y: 10,
    opacity: 0,
  }}
  animate={{
    y: chatOpen ? 0 : 10,
    opacity: chatOpen ? 1 : 0,
  }}
  transition={{
    type: 'spring',
    duration: 0.5,
    bounce: 0,
  }}
  messages={messages}
/>

// AFTER
{/* Transcript - Always visible */}
<TranscriptMotion
  initial={{
    y: 0,
    opacity: 1,
  }}
  animate={{
    y: 0,
    opacity: 1,
  }}
  transition={{
    type: 'spring',
    duration: 0.5,
    bounce: 0,
  }}
  messages={messages}
  className="pointer-events-none"  // ⬅️ ADD THIS to prevent blocking interactions
/>
```

**Benefits**:

- ✅ Better accessibility for hearing-impaired users
- ✅ Easier to review conversation history
- ✅ Real-time text display as agent speaks
- ✅ Chat input button still works for sending messages

---

### 📋 Quick Checklist for New Agents

When setting up a new agent with this frontend template:

- [ ] **Step 1**: Add `agentName` to `app-config.ts` matching your backend
- [ ] **Step 2**: Add CORS headers to `app/api/connection-details/route.ts`
- [ ] **Step 3**: Update logo loading (4 files):
  - [ ] `components/embed-popup/standalone-bundle-root.tsx`
  - [ ] `components/embed-popup/agent-client.tsx`
  - [ ] `components/embed-popup/error-message.tsx`
  - [ ] `components/embed-popup/trigger.tsx`
- [ ] **Step 4**: Fix mobile microphone permission flow in `agent-client.tsx` ⚠️ **Critical for mobile**
- [ ] **Step 5** (Optional): Make transcript always visible in `popup-view.tsx`
- [ ] **Step 6**: Build and test: `pnpm build`
- [ ] **Step 7**: Deploy to Vercel
- [ ] **Step 8**: Test on mobile device to verify mic permission flow
- [ ] **Step 9**: Test embedding on external website

---

## 📝 Changelog

### 2025-12-08 - Avatar Mode as Default & Build Optimizations

#### ✅ Completed Tasks

- ✅ Changed default popup mode from chat to avatar (chat panel closed by default)
- ✅ Fixed linting errors in embed API route
- ✅ Suppressed webpack performance warnings for embed bundle
- ✅ Updated README documentation to reflect avatar mode changes
- ✅ Successfully deployed to Vercel: https://frontend-avatar.vercel.app/

#### 🔧 Changes Made

**Change #1: Avatar Mode as Default**

- **File Changed**: [`components/embed-popup/action-bar.tsx`](./components/embed-popup/action-bar.tsx#L39)
- **What Changed**: Modified `chatOpen` initial state from `true` to `false`
- **Code**: `const [chatOpen, setChatOpen] = React.useState(false);`
- **Impact**:
  - Popup now opens in avatar mode (chat panel closed)
  - Cleaner, more focused mobile-first experience
  - Users can still toggle chat button to view transcript
  - Reduced cognitive load and cleaner interface

**Change #2: Fixed Embed API Route Linting Errors**

- **File Changed**: [`app/api/embed/route.ts`](./app/api/embed/route.ts)
- **Issues Fixed**:
  - Removed unused `NextRequest` import
  - Removed unused `request` parameter from GET function
  - Removed unused `error` variable in catch block
  - Fixed prettier line ending issues (CRLF vs LF)
- **Result**: Build now compiles without linting errors

**Change #3: Suppressed Webpack Performance Warnings**

- **File Changed**: [`webpack.config.js`](./webpack.config.js#L67-L71)
- **What Changed**: Added `performance` configuration to webpack
- **Code Added**:
  ```javascript
  performance: {
    hints: false, // Disable performance hints since large bundle is expected for embed script
    maxEntrypointSize: 10000000, // 10MB - suppress warnings for standalone embed bundle
    maxAssetSize: 10000000, // 10MB
  }
  ```
- **Why This is OK**:
  - 5.58 MiB bundle size is normal for standalone embed widgets
  - Bundle includes React, LiveKit SDK, and all dependencies
  - Needs to work on any website without external dependencies
  - Already minified and optimized with TerserPlugin
  - Cached with proper headers (3600s max-age)
- **Result**: Clean builds without webpack warnings

#### 📊 Final Build Stats

- **Next.js Build**: ✅ Compiled successfully
- **Embed Bundle Size**: 5.58 MiB (minified, includes all dependencies)
- **Build Time**: ~50 seconds
- **Warnings**: None (suppressed performance hints)
- **Deploy Status**: ✅ Successfully deployed to Vercel

#### 🎯 Key Features Now Working

1. ✅ Avatar mode as default (chat panel closed)
2. ✅ Clean build with no linting errors
3. ✅ No webpack performance warnings
4. ✅ Proper CORS headers for embedding
5. ✅ Mobile microphone permission flow working correctly
6. ✅ Logo loading from Vercel CDN
7. ✅ All dependencies optimized and bundled

---

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

**Fix #1: Agent Connection Issue**

- 🐛 **FIXED**: Added missing `agentName: 'restorant_agent'` to `app-config.ts`
  - **Issue**: Frontend wasn't requesting the correct agent from LiveKit
  - **Symptom**: "Agent did not join the room" error on frontend
  - **Root Cause**: `APP_CONFIG_DEFAULTS` was missing the `agentName` field
  - **Solution**: Added `agentName: 'restorant_agent'` to match backend agent name
  - **File Changed**: [`app-config.ts`](./app-config.ts)

**Fix #2: CORS Error on Embedded Widget**

- 🐛 **FIXED**: Added CORS headers to allow embedding on external websites
  - **Issue**: Embed popup script failed when embedded on external domains
  - **Symptoms**:
    - `CORS policy: No 'Access-Control-Allow-Origin' header` error
    - `Request header field x-sandbox-id is not allowed` error
  - **Root Cause**: API endpoint missing CORS headers for cross-origin requests
  - **Solution**: Added CORS headers including `x-sandbox-id` and OPTIONS handler
  - **File Changed**: [`app/api/connection-details/route.ts`](./app/api/connection-details/route.ts)
  - **Headers Added**: `Access-Control-Allow-Origin`, `Access-Control-Allow-Headers` (including `x-sandbox-id`)
  - **Now Supports**: Embedding on any website with `<script>` tag

**Fix #3: Logo 404 Errors on Embedded Widget**

- 🐛 **FIXED**: Logos now load from Vercel deployment instead of embedding domain
  - **Issue**: Logo SVG files returned 404 errors when widget embedded on external sites
  - **Symptom**: `GET https://sevitech.org/lk-logo.svg 404 (Not Found)`
  - **Root Cause**: Relative paths like `/lk-logo.svg` resolved to embedding domain (sevitech.org) instead of Vercel deployment
  - **Solution**: Dynamically construct logo URLs using the `data-lk-sandbox-id` attribute (Vercel base URL)
  - **Files Changed**:
    - [`components/embed-popup/standalone-bundle-root.tsx`](./components/embed-popup/standalone-bundle-root.tsx) - Pass sandboxId to app config
    - [`components/embed-popup/agent-client.tsx`](./components/embed-popup/agent-client.tsx) - Forward baseUrl prop
    - [`components/embed-popup/error-message.tsx`](./components/embed-popup/error-message.tsx) - Use dynamic logo URLs with `.vercel.app` appended
    - [`components/embed-popup/trigger.tsx`](./components/embed-popup/trigger.tsx) - Use dynamic logo URLs with `.vercel.app` appended
  - **How It Works**: The `data-lk-sandbox-id` attribute contains the Vercel deployment subdomain (e.g., `https://restorant-demo-frontend`), which is appended with `.vercel.app` to construct full URLs like `https://restorant-demo-frontend.vercel.app/lk-logo.svg`
  - **Result**: Logos now load correctly from Vercel regardless of embedding domain

**Fix #4: Mobile Microphone Permission Issues**

- 🐛 **FIXED**: Agent no longer starts talking before user grants microphone permission on mobile
  - **Issue**: On mobile devices, agent would start talking before user granted mic permission, causing muted audio and requiring multiple refreshes
  - **Symptoms**:
    - Agent starts talking immediately on widget open (mobile only)
    - User mic stays muted even after granting permission
    - Audio doesn't work until multiple page refreshes
  - **Root Cause**: Room connection and mic enablement happening simultaneously, allowing agent to join before permission granted
  - **Solution**: Sequential connection flow that requests permission first
  - **File Changed**: [`components/embed-popup/agent-client.tsx`](./components/embed-popup/agent-client.tsx)
  - **Connection Flow**:
    1. Request microphone permission via `getUserMedia()` (shows prompt to user)
    2. Wait for user to grant permission
    3. Connect to room (agent joins after permission)
    4. Enable and publish microphone track
  - **Benefits**:
    - User sees permission prompt immediately when opening widget
    - Agent waits until permission granted before joining room
    - No premature talking from agent
    - Microphone works correctly on first try (mobile)
    - Desktop functionality unaffected
  - **Result**: Smooth mobile experience with proper permission handling

**Enhancement #1: Avatar Mode as Default**

- ✨ **CURRENT STATE**: Popup opens in avatar mode by default (chat panel closed)
  - **Reason**: Provides cleaner, more focused mobile-first experience
  - **Behavior**: Chat panel closed by default; users can toggle to view transcript
  - **File Changed**: [`components/embed-popup/action-bar.tsx`](./components/embed-popup/action-bar.tsx)
  - **Implementation**: `const [chatOpen, setChatOpen] = React.useState(false);`
  - **Benefits**:
    - Cleaner interface on mobile devices
    - Focus on voice interaction (primary use case)
    - Chat transcript available on-demand
    - Reduced cognitive load for users
  - **Result**: Streamlined UX with transcript accessible via chat button toggle

---

## 🎨 UI Customizations

This section documents the visual and behavioral customizations made to the default LiveKit template for the restaurant demo.

### Logo and Branding

**Custom Phone Icon Logo**:

- Replaced default LiveKit logo with custom teal phone icon
- Logo files: `public/lk-logo.svg` and `public/lk-logo-dark.svg`
- Icon design: Phone handset without built-in circular background
- Circular frame provided by CSS border (not embedded in SVG)

**Logo Styling** ([`components/embed-popup/trigger.tsx`](./components/embed-popup/trigger.tsx)):

```typescript
// Popup button configuration
size-16 (64px container)
border-[3px] (3px border thickness)
Logo: h-16 w-16 with scale(1.6) = 102.4px effective size
Border color: rgb(0,191,165) - custom teal color
```

**Key Decisions**:

- SVG contains only the icon artwork (no background circle)
- CSS provides the circular frame via `border-radius: 9999px`
- Logo scales beyond container for prominent visibility
- 3px border creates clean, professional appearance

### Theme Colors

**Custom Teal Accent Color** ([`styles/globals.css`](./styles/globals.css)):

```css
/* Light mode (line 21) */
--fgAccent: #00bfa5; /* rgb(0, 191, 165) - Custom teal */

/* Dark mode (line 84) */
--fgAccent: #00bfa5; /* rgb(0, 191, 165) - Matches light mode */
```

**Color Application**:

- Popup button background when closed: `bg-[rgb(0,191,165)]`
- Button border: `border-[rgb(0,191,165)]`
- Connecting state border: `border-[rgb(0,191,165)]/30` (30% opacity)
- Consistent across light and dark themes

**Why Custom Color**:

- Original template used blue (`#002cf2` light, `#1fd5f9` dark)
- Teal provides restaurant-friendly, approachable feel
- Better brand alignment for hospitality industry

### Chat Behavior

**Default Chat State** ([`components/embed-popup/action-bar.tsx`](./components/embed-popup/action-bar.tsx)):

```typescript
// Line 39 - Chat closed by default (Avatar mode)
const [chatOpen, setChatOpen] = React.useState(false);
```

**Current Behavior**:

- Popup opens in **avatar mode** by default (chat panel closed)
- Clean, focused interface showing only the voice avatar
- Users can click the chat button to view conversation transcript
- Provides a streamlined mobile-first experience

**Benefits**:

- Cleaner, less cluttered interface on mobile devices
- Focus on voice interaction (primary use case)
- Chat transcript available on-demand via toggle button
- Reduced cognitive load for users

**User Can Still**:

- Click chat button to view conversation transcript
- Type messages in chat input field
- Toggle visibility at any time

### Size and Scaling

**Popup Button Dimensions**:

- Container: `size-16` = 64px × 64px
- Border: 3px solid teal
- Logo: 64px base × 1.6 scale = 102.4px effective size
- Logo intentionally overflows container for visibility

**Size Optimization Process**:

1. Started too small (invisible logo)
2. Scaled up to 2.0 (too large)
3. Reduced by 30% to 1.4 scale
4. Fine-tuned to 1.6 for optimal balance
5. Reduced container from size-24 to size-16 to tighten border

**Cache Busting**:

```typescript
src={`${logoSrc}?v=17`}  // Version query param forces browser refresh
```

### Component Simplification

**Removed Dual-Ring Animation**:

Original template had:

- Outer animated ring with conic gradient
- Inner icon container
- Complex state-based animations

Simplified to:

- Single container with border
- Direct background color changes
- Cleaner, more performant code

**Before** (original):

```typescript
<div className="p-0.5">
  <motion.div className="outer ring with gradient animation" />
  <div className="inner icon container" />
</div>
```

**After** (simplified):

```typescript
<div className="size-16 border-[3px] bg-[rgb(0,191,165)]">
  <img src={logoSrc} className="h-16 w-16" style={{ transform: 'scale(1.6)' }} />
</div>
```

### Mobile Optimizations

**Logo Display Method**:

- Using `<img>` tag instead of CSS `mask-image`
- Preserves SVG colors natively (no color manipulation needed)
- Better browser compatibility across mobile devices
- Simpler implementation

**Responsive Design**:

- Fixed position: `fixed right-4 bottom-4`
- Z-index: `z-50` ensures button stays on top
- Scale animation on hover: `hover:scale-105`
- Touch-friendly 64px tap target size

### Visual Polish

**Drop Shadow**:

```typescript
className = 'drop-shadow-md'; // Subtle depth effect
```

**Smooth Transitions**:

```typescript
transition-colors  // Color changes fade smoothly
transition-[scale] duration-300  // Hover scale animates in 300ms
```

**State-Based Colors**:

- Closed: Teal background with teal border
- Connecting: Light gray background with semi-transparent teal border
- Connected: Red background with white border (disconnect state)
- Error: Red background with white border

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
