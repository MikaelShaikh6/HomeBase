type ChoreItemProps = {
  title: string;
  person: string;
  time: string;
  completed?: boolean;
};

export default function ChoreItem({
  title,
  person,
  time,
  completed = false,
}: ChoreItemProps) {
  return (
    <div
      className={`group flex items-center gap-4 border-b border-dusk-blue-500/20 px-5 py-4 transition-colors last:border-b-0 hover:bg-dusk-blue-500/20 ${
        completed ? "opacity-60" : ""
      }`}
    >
      <button
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
          completed
            ? "border-lavender-grey-500 bg-lavender-grey-500 text-ink-black-500"
            : "border-dusk-blue-500 hover:border-lavender-grey-500 hover:bg-lavender-grey-500/20"
        }`}
      >
        {completed && (
          <span className="text-xs font-bold">
            ✓
          </span>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`text-sm font-medium ${
            completed
              ? "text-lavender-grey-500 line-through"
              : "text-alabaster-grey-100"
          }`}
        >
          {title}
        </p>

        <p className="mt-0.5 text-xs text-lavender-grey-500">
          {person}
        </p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-xs font-medium text-lavender-grey-500">
          Due
        </p>

        <p className="mt-0.5 text-sm text-alabaster-grey-100">
          {time}
        </p>
      </div>
    </div>
  );
}