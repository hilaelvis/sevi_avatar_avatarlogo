import { AnimatePresence, motion } from 'motion/react';
import { useVoiceAssistant } from '@livekit/components-react';
import { PhoneDisconnectIcon, XIcon } from '@phosphor-icons/react';
import { EmbedErrorDetails } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const AnimatedButton = motion.create(Button);

interface TriggerProps {
  error: EmbedErrorDetails | null;
  popupOpen: boolean;
  onToggle: () => void;
  baseUrl?: string;
}

export function Trigger({ error = null, popupOpen, onToggle, baseUrl }: TriggerProps) {
  const fullBaseUrl = baseUrl ? `${baseUrl}.vercel.app` : '';
  const logoSrc = fullBaseUrl ? `${fullBaseUrl}/lk-logo.svg` : '/lk-logo.svg';
  const { state: agentState } = useVoiceAssistant();

  const isAgentConnecting =
    popupOpen && (agentState === 'connecting' || agentState === 'initializing');

  const isAgentConnected =
    popupOpen &&
    agentState !== 'disconnected' &&
    agentState !== 'connecting' &&
    agentState !== 'initializing';

  return (
    <AnimatePresence>
      <AnimatedButton
        key="trigger-button"
        size="lg"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        exit={{ scale: 0 }}
        transition={{
          type: 'spring',
          duration: 1,
          bounce: 0.2,
        }}
        onClick={onToggle}
        className={cn(
          'relative m-0 block size-16 p-0 drop-shadow-md',
          'scale-100 transition-[scale] duration-300 hover:scale-105 focus:scale-105',
          'fixed right-4 bottom-4 z-50'
        )}
      >
        {/* icon */}
        <div
          className={cn(
            'relative z-20 grid size-16 place-items-center rounded-full border-[3px] transition-colors',
            !popupOpen && 'border-[rgb(0,191,165)] bg-[rgb(0,191,165)]',
            !error && isAgentConnecting && 'bg-bg1 border-[rgb(0,191,165)]/30',
            (isAgentConnected || (error && popupOpen)) &&
              'bg-destructive border-destructive-foreground'
          )}
        >
          <AnimatePresence>
            {!popupOpen && (
              <motion.div
                key="lk-logo"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: popupOpen ? 20 : -20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${logoSrc}?v=17`}
                  alt="Logo"
                  className="h-16 w-16"
                  style={{ transform: 'scale(1.6)' }}
                />
              </motion.div>
            )}
            {(isAgentConnecting || (error && popupOpen)) && (
              <motion.div
                key="dismiss"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: popupOpen ? -20 : 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <XIcon
                  size={20}
                  weight="bold"
                  className={cn('text-fg0 size-5', error && 'text-destructive-foreground')}
                />
              </motion.div>
            )}
            {!error && isAgentConnected && (
              <motion.div
                key="disconnect"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: popupOpen ? -20 : 20 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <PhoneDisconnectIcon
                  size={20}
                  weight="bold"
                  className="text-destructive-foreground size-5"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedButton>
    </AnimatePresence>
  );
}
