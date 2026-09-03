type Activity = {
  id: number;
  icon: string;
  title: string;
  description: string;
  time: string;
};

const activities: Activity[] = [
  {
    id: 1,
    icon: "✓",
    title: "Emma completed",
    description: "Cleaned her room",
    time: "12 min ago",
  },
  {
    id: 2,
    icon: "✓",
    title: "Dad completed",
    description: "Took out the recycling",
    time: "34 min ago",
  },
  {
    id: 3,
    icon: "🔥",
    title: "Family streak increased",
    description: "You reached a 12-day streak",
    time: "1 hr ago",
  },
];

export default function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500 p-6">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-lavender-grey-500">
          Family
        </p>

        <h2 className="mt-1 text-xl font-semibold text-alabaster-grey-100">
          Recent activity
        </h2>
      </div>

      <div className="space-y-5">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-dusk-blue-500 text-sm text-alabaster-grey-100">
              {activity.icon}
            </div>

            <div>
              <p className="text-sm font-medium text-alabaster-grey-100">
                {activity.title}
              </p>

              <p className="mt-0.5 text-sm text-lavender-grey-500">
                {activity.description}
              </p>

              <p className="mt-1 text-xs text-dusk-blue-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}