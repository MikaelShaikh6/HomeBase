import { Plus } from "lucide-react";

type WelcomeHeaderProps = {
  onAddChore: () => void;
};

export default function WelcomeHeader({ onAddChore }: WelcomeHeaderProps) {
  return (
    <section className="mb-10">
      <p className="mb-2 text-sm font-medium text-lavender-grey-500">
        Tuesday, September 3
      </p>

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-alabaster-grey-100 sm:text-4xl">
            Good morning, Smith family.
          </h1>

          <p className="mt-2 max-w-xl text-base text-lavender-grey-500">
            Keep the momentum going. You have 3 chores left for today.
          </p>
        </div>

        <button 
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-dusk-blue-500 px-5 py-3 text-sm font-semibold text-alabaster-grey-100 transition-all hover:bg-lavender-grey-500 hover:text-ink-black-500 active:scale-[0.98]"
          onClick={onAddChore}>
          <Plus size={18} />
          Add chore
        </button>
      </div>
    </section>
  );
}