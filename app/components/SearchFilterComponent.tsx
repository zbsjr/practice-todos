'use client';

import { useSearchParams } from "next/navigation";

type searchProps = {
    handleSearch: (e: string) => void;
    isSerching: boolean;
};

export function SearchFilterComponent({ handleSearch, isSerching }: searchProps) {
    const searchParams = useSearchParams();

    return (
        <section className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
            <label htmlFor="search" className="sr-only">
                Search todos
            </label>
            <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 3.5a5.5 5.5 0 1 0 3.473 9.78l3.124 3.123a.75.75 0 1 0 1.06-1.06l-3.123-3.124A5.5 5.5 0 0 0 9 3.5ZM5 9a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                <input
                    id="search"
                    type="text"
                    placeholder="Search todos..."
                    className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-10 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                <span
                    aria-hidden={!isSerching}
                    className={`pointer-events-none absolute inset-y-0 right-3 flex items-center text-indigo-500 transition-opacity duration-200 ${isSerching ? 'opacity-100' : 'opacity-0'}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4 animate-spin"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeOpacity="0.25"
                            strokeWidth="4"
                        />
                        <path
                            d="M22 12a10 10 0 0 1-10 10"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            </div>
            <p
                role="status"
                aria-live="polite"
                className={`mt-2 flex items-center gap-1.5 text-xs text-slate-500 transition-opacity duration-200 ${isSerching ? 'opacity-100' : 'opacity-0'}`}
            >
                Searching
                <span className="inline-flex gap-0.5" aria-hidden="true">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400" />
                </span>
            </p>
        </section>
    );
}
