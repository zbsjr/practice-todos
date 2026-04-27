'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type paginationProps = {
    totalPages: number;
};

type pageItem = number | 'ellipsis';

function getPageRange(currentPage: number, totalPages: number): pageItem[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 1;
    const visible = [
        ...new Set([
            1,
            totalPages,
            currentPage - delta,
            currentPage,
            currentPage + delta,
        ]),
    ]
        .filter((p) => p >= 1 && p <= totalPages)
        .sort((a, b) => a - b);

    const range: pageItem[] = [];
    for (let i = 0; i < visible.length; i++) {
        range.push(visible[i]);
        const next = visible[i + 1];
        if (next === undefined) continue;

        const gap = next - visible[i];
        if (gap === 2) {
            range.push(visible[i] + 1);
        } else if (gap > 2) {
            range.push('ellipsis');
        }
    }

    return range;
}

export function PaginationComponent({ totalPages }: paginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const currentPage = Number(searchParams.get('page')) || 1;

    if (totalPages <= 1) return null;

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(page));
        return `${pathname}?${params.toString()}`;
    };

    const pageItems = getPageRange(currentPage, totalPages);
    const isFirst = currentPage <= 1;
    const isLast = currentPage >= totalPages;

    const navLinkClass =
        'inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40';
    const navLinkDisabledClass =
        'inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-300 shadow-sm pointer-events-none';

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-between"
        >
            {isFirst ? (
                <span aria-disabled="true" className={navLinkDisabledClass}>
                    <ChevronLeft />
                    Prev
                </span>
            ) : (
                <Link
                    href={createPageURL(currentPage - 1)}
                    scroll={false}
                    aria-label="Previous page"
                    className={navLinkClass}
                >
                    <ChevronLeft />
                    Prev
                </Link>
            )}

            <ul className="flex items-center gap-1">
                {pageItems.map((item, idx) => (
                    <li key={idx}>
                        {item === 'ellipsis' ? (
                            <span
                                aria-hidden="true"
                                className="inline-flex h-8 min-w-8 items-center justify-center px-1 text-sm text-slate-400"
                            >
                                &hellip;
                            </span>
                        ) : (
                            <Link
                                href={createPageURL(item)}
                                scroll={false}
                                aria-current={item === currentPage ? 'page' : undefined}
                                aria-label={`Page ${item}`}
                                className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-3 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${item === currentPage
                                        ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                                    }`}
                            >
                                {item}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>

            {isLast ? (
                <span aria-disabled="true" className={navLinkDisabledClass}>
                    Next
                    <ChevronRight />
                </span>
            ) : (
                <Link
                    href={createPageURL(currentPage + 1)}
                    scroll={false}
                    aria-label="Next page"
                    className={navLinkClass}
                >
                    Next
                    <ChevronRight />
                </Link>
            )}
        </nav>
    );
}

function ChevronLeft() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 0 1 0 1.06L9.06 10l3.73 3.71a.75.75 0 1 1-1.06 1.06l-4.25-4.24a.75.75 0 0 1 0-1.06l4.25-4.24a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function ChevronRight() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
        >
            <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 0 1 0-1.06L10.94 10 7.21 6.29a.75.75 0 1 1 1.06-1.06l4.25 4.24a.75.75 0 0 1 0 1.06l-4.25 4.24a.75.75 0 0 1-1.06 0Z"
                clipRule="evenodd"
            />
        </svg>
    );
}
