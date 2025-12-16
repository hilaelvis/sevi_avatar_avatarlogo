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
  // Use baseUrl for embedded widgets, relative path for direct access
  // Strip https:// if present in baseUrl
  const cleanBaseUrl = baseUrl?.replace(/^https?:\/\//, '');
  const logoSrc = cleanBaseUrl ? `https://${cleanBaseUrl}.vercel.app/lk-logo.svg` : '/lk-logo.svg';
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
          'fixed right-8 bottom-4 z-50'
        )}
      >
        {/* Speech bubble */}
        {!popupOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 }}
            className="absolute -right-6 bottom-full z-0 mb-4"
          >
            <div className="relative rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white">
                Posso aiutarti?
              </p>
              {/* Speech bubble tail */}
              <div className="absolute right-4 -bottom-2 h-4 w-4 rotate-45 transform border-r border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"></div>
            </div>
          </motion.div>
        )}

        {/* icon */}
        <div
          className={cn(
            'relative z-20 grid size-16 place-items-center rounded-full transition-colors',
            !error && isAgentConnecting && 'bg-bg1',
            (isAgentConnected || (error && popupOpen)) && 'bg-destructive'
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
                  style={{ transform: 'scale(3.6)' }}
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
