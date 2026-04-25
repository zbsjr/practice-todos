type todoProps = {
    completedCount: number,
    todosCount: number;
};

export function CompletedCountComponent({ completedCount, todosCount }: todoProps) {
    return (
        <p className="text-sm text-slate-500">
            {todosCount === 0
                ? "No todos yet — add your first one below."
                : `${completedCount} of ${todosCount} completed`}
        </p>
    );
}