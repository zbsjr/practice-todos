export default function Loading() {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <svg
                className="h-12 w-12 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
}
