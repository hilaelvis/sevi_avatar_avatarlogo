import { type AgentState, BarVisualizer, type TrackReference } from '@livekit/components-react';
import { cn } from '@/lib/utils';

interface AudioVisualizerProps {
  agentState: AgentState;
  audioTrack?: TrackReference;
}

export function AudioVisualizer({ agentState, audioTrack }: AudioVisualizerProps) {
  const isConnecting = agentState === 'connecting' || agentState === 'initializing';

  return (
    <div className="flex h-full w-auto flex-col items-center justify-center gap-4">
      <BarVisualizer
        barCount={5}
        state={agentState}
        trackRef={audioTrack}
        options={{ minHeight: 5 }}
        className="flex h-auto w-auto items-center justify-center gap-3"
      >
        <span
          className={cn([
            'bg-muted min-h-6 w-6 rounded-full',
            'origin-center transition-colors duration-250 ease-linear',
            'data-[lk-highlighted=true]:bg-foreground data-[lk-muted=true]:bg-muted',
          ])}
        />
      </BarVisualizer>
      {isConnecting && (
        <p className="text-fg0 text-center text-sm font-medium">Connecting to the agent: hold on</p>
      )}
    </div>
  );
}
