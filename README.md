# Avatar Prototype 1

A customized LiveKit voice agent popup widget with avatar logo, Italian speech bubble, and connecting message.

## Features

- **Custom Avatar Logo**: Scaled 3.6x with no circular border
- **Speech Bubble**: "Posso aiutarti?" appears above avatar when not connected
- **Connecting Message**: "Connecting to the agent: hold on" displays during connection
- **Transparent Button**: Button background is transparent when connecting, red when connected
- **Optimized Positioning**: 32px from right, 16px from bottom

## Project Structure

```
avatar-prototype-1/
├── components/
│   ├── embed-popup/          # Core popup widget components
│   │   ├── standalone-bundle-root.tsx  # Entry point for embedded script
│   │   ├── agent-client.tsx            # Main agent connection logic
│   │   ├── popup-view.tsx              # Popup UI container
│   │   ├── trigger.tsx                 # Floating button with avatar
│   │   ├── audio-visualizer.tsx        # Pulsing dots + connecting message
│   │   ├── action-bar.tsx              # Controls (mic, camera, etc.)
│   │   ├── transcript.tsx              # Chat/transcription display
│   │   └── error-message.tsx           # Error handling UI
│   ├── livekit/              # LiveKit integration components
│   └── ui/                   # Reusable UI components
├── hooks/                    # React hooks for state management
├── lib/                      # Utilities and types
├── app/
│   └── api/                  # Backend API routes
│       ├── connection-details/  # LiveKit token generation
│       └── embed/              # Serves embed-popup.js script
├── public/
│   ├── lk-logo.svg           # Avatar logo (light mode)
│   ├── lk-logo-dark.svg      # Avatar logo (dark mode)
│   └── embed-popup.js        # Generated bundled script
└── styles/
    └── globals.css           # Global styles and theme
```

## Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Development

### Local Testing

```bash
pnpm dev
```

Visit http://localhost:3000 to test the widget.

### Build Embed Script

```bash
pnpm build-embed-popup-script
```

This generates `public/embed-popup.js` which can be embedded on any website.

## Deployment

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `LIVEKIT_URL` - Your LiveKit server WebSocket URL
   - `LIVEKIT_API_KEY` - API key
   - `LIVEKIT_API_SECRET` - API secret
3. Deploy

### Embed on External Websites

Add this script to any webpage:

```html
<script
  src="https://your-vercel-url.vercel.app/embed-popup.js"
  data-lk-sandbox-id="your-vercel-subdomain"
></script>
```

**Important**: The `data-lk-sandbox-id` should be your Vercel subdomain (e.g., `avatar-prototype-1`) without `https://` or `.vercel.app`.

## Customization

### Avatar Logo

Replace the logo files in `public/`:

- `lk-logo.svg` - Light mode logo
- `lk-logo-dark.svg` - Dark mode logo

### Speech Bubble Text

Edit [components/embed-popup/trigger.tsx:67](components/embed-popup/trigger.tsx#L67):

```tsx
<p className="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">
  Posso aiutarti?
</p>
```

### Connecting Message

Edit [components/embed-popup/audio-visualizer.tsx:30](components/embed-popup/audio-visualizer.tsx#L30):

```tsx
<p className="text-fg0 text-center text-sm font-medium">Connecting to the agent: hold on</p>
```

### Logo Position

Edit [components/embed-popup/trigger.tsx:54](components/embed-popup/trigger.tsx#L54):

```tsx
'fixed right-8 bottom-4 z-50';
// right-8 = 32px from right
// bottom-4 = 16px from bottom
```

### Logo Scale

Edit [components/embed-popup/trigger.tsx:98](components/embed-popup/trigger.tsx#L98):

```tsx
style={{ transform: 'scale(3.6)' }}
```

## Configuration

Main configuration is in [app-config.ts](app-config.ts):

```typescript
export const APP_CONFIG_DEFAULTS: Partial<AppConfig> = {
  agent_name: 'Voice Assistant',
  agent_avatar_url: '/lk-logo.svg',
  supportsChatInput: true,
  supportsVideoInput: true,
  supportsScreenShare: false,
};
```

## Technologies

- **Next.js 16** - React framework
- **LiveKit** - Real-time voice/video infrastructure
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Animations
- **Webpack** - Bundling for embed script
- **TypeScript** - Type safety

## Build Output

The build process generates:

- `public/embed-popup.js` - Standalone embed script (~5.5MB minified)
- `.next/` - Next.js build artifacts

## Security

All security vulnerabilities have been fixed:

- Next.js 16.0.10 (latest)
- ESLint 9.39.2
- All dependencies updated to secure versions

## License

Private project

## Support

For issues or questions, contact the project maintainer.
