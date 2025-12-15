import { EmbedErrorDetails } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  error: EmbedErrorDetails | null;
  baseUrl?: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  // Always use relative paths - works both locally and in production
  const logoSrc = '/lk-logo.svg';
  const logoDarkSrc = '/lk-logo-dark.svg';
  return (
    <div
      inert={error === null}
      className={cn(
        'absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-5 transition-opacity',
        error === null ? 'opacity-0' : 'opacity-100'
      )}
    >
      <div className="pl-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="LiveKit Logo" className="block size-12 dark:hidden" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDarkSrc} alt="LiveKit Logo" className="hidden size-12 dark:block" />
      </div>

      <div className="flex w-full flex-col justify-center gap-4 overflow-auto px-8 text-center">
        <span className="leading-tight font-medium text-pretty">{error?.title}</span>
        <span className="text-sm text-balance">{error?.description}</span>
      </div>
    </div>
  );
}
