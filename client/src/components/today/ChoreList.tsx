import ChoreFilters from "./ChoreFilters";
import ChoreItem from "./ChoreItem";
import { mockChores } from "../../data/mockChores";

export default function ChoreList() {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-lavender-grey-500">
            Your family
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-alabaster-grey-100">
            Today&apos;s chores
          </h2>
        </div>

        <button className="text-sm font-medium text-lavender-grey-500 transition-colors hover:text-alabaster-grey-100">
          View all
        </button>
      </div>

      <ChoreFilters />

      <div className="overflow-hidden rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500">
        {mockChores.map((chore) => (
          <ChoreItem
            key={chore.id}
            title={chore.title}
            person={chore.person}
            time={chore.time}
            completed={chore.completed}
          />
        ))}
      </div>
    </section>
  );
}