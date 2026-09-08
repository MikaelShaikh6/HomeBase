const upcoming = [
  {
    day: "Tomorrow",
    count: "5 chores",
    chores: [
      "Vacuum living room",
      "Take bins out",
      "Walk the dog",
    ],
  },
  {
    day: "Friday",
    count: "8 chores",
    chores: [
      "Clean bathroom",
      "Water plants",
      "Change bed sheets",
    ],
  },
];

export default function UpcomingChores() {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-lavender-grey-500">
          Coming up
        </p>

        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-alabaster-grey-100">
          Upcoming chores
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {upcoming.map((day) => (
          <div
            key={day.day}
            className="rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500 p-5 transition-colors hover:border-lavender-grey-500/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-alabaster-grey-100">
                {day.day}
              </h3>

              <span className="text-xs text-lavender-grey-500">
                {day.count}
              </span>
            </div>

            <div className="space-y-3">
              {day.chores.map((chore) => (
                <div
                  key={chore}
                  className="flex items-center gap-3"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-dusk-blue-500" />

                  <span className="text-sm text-lavender-grey-500">
                    {chore}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}