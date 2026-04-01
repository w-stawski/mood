'use client';

import { entryHasAnalysis } from '@/actions/journal';
import { Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const POLL_MS = 2000;
const MAX_ATTEMPTS = 90;
const AUTO_DISMISS_MS = 14_000;

/**
 * After saving an entry, the server redirects with `?insights=<entryId>` while AI runs in `after()`.
 * Polls until analysis exists, then announces via an accessible status region and offers a link to the entry.
 */
export function JournalAiInsightToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const insightsParam = searchParams.get('insights');

  const [open, setOpen] = useState(false);
  const [readyEntryId, setReadyEntryId] = useState<string | null>(null);
  const replacedUrl = useRef(false);

  const stripQuery = useCallback(() => {
    if (replacedUrl.current) return;
    replacedUrl.current = true;
    router.replace('/journal', { scroll: false });
  }, [router]);

  useEffect(() => {
    replacedUrl.current = false;
  }, [insightsParam]);

  useEffect(() => {
    if (!insightsParam) {
      return;
    }

    let cancelled = false;
    let attempt = 0;

    const poll = async () => {
      while (!cancelled && attempt < MAX_ATTEMPTS) {
        try {
          if (await entryHasAnalysis(insightsParam)) {
            if (cancelled) return;
            setReadyEntryId(insightsParam);
            router.refresh();
            setOpen(true);
            stripQuery();
            return;
          }
        } catch {
          /* network or server error — retry */
        }
        attempt += 1;
        await new Promise((r) => setTimeout(r, POLL_MS));
      }
      if (!cancelled) {
        stripQuery();
      }
    };

    void poll();

    return () => {
      cancelled = true;
    };
  }, [insightsParam, router, stripQuery]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setReadyEntryId(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => {
      setOpen(false);
      setReadyEntryId(null);
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(t);
  }, [open]);

  const close = () => {
    setOpen(false);
    setReadyEntryId(null);
  };

  if (!open || !readyEntryId) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:p-6 md:justify-end">
      <div
        className="pointer-events-auto w-full max-w-md animate-[toast-slide-up_280ms_ease-out_forwards] rounded-xl border border-slate-200/90 bg-white p-4 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5"
        role="status"
        aria-live="polite"
        aria-atomic="true">
        <div className="flex gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700"
            aria-hidden="true">
            <Sparkles className="h-5 w-5" strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-sm font-semibold text-slate-900">AI insights are ready</p>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              Your mood summary and suggestions were added to this entry. Open it to read the full analysis.
            </p>
            <p className="mt-3">
              <Link
                href={`/journal/${readyEntryId}`}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4 outline-none hover:text-violet-900 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2">
                View entry
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 outline-none hover:bg-slate-100 hover:text-slate-800 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            aria-label="Dismiss notification">
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
