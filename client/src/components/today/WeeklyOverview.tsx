const days = [
  { day: "Mon", count: 8, width: "100%" },
  { day: "Tue", count: 7, width: "87%" },
  { day: "Wed", count: 9, width: "100%" },
  { day: "Thu", count: 5, width: "62%" },
  { day: "Fri", count: 0, width: "0%" },
];

export default function WeeklyOverview() {
  return (
    <div className="rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500 p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-lavender-grey-500">
          Overview
        </p>

        <h2 className="mt-1 text-xl font-semibold text-alabaster-grey-100">
          This week
        </h2>
      </div>

      <div className="space-y-4">
        {days.map(({ day, count, width }) => (
          <div key={day} className="flex items-center gap-4">
            <span className="w-8 text-xs font-medium text-lavender-grey-500">
              {day}
            </span>

            <div className="h-2 flex-1 overflow-hidden rounded-full bg-dusk-blue-500">
              <div
                className="h-full rounded-full bg-lavender-grey-500"
                style={{ width }}
              />
            </div>

            <span className="w-6 text-right text-xs font-medium text-alabaster-grey-100">
              {count}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-dusk-blue-500/30 pt-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-lavender-grey-500">
            Completed this week
          </span>

          <span className="text-sm font-semibold text-alabaster-grey-100">
            29 chores
          </span>
        </div>
      </div>
    </div>
  );
}