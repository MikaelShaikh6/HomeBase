export default function StreakCard() {
  return (
    <div className="rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500 p-6 shadow-xl shadow-black/10 sm:p-8">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-lavender-grey-500">
              Family streak
            </p>

            <span className="text-xl">🔥</span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight text-alabaster-grey-100">
              12
            </span>

            <span className="text-lg text-lavender-grey-500">
              days
            </span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm text-alabaster-grey-100">
            You&apos;re on a roll.
          </p>

          <p className="mt-1 text-sm text-lavender-grey-500">
            Keep completing chores to extend your streak.
          </p>
        </div>
      </div>
    </div>
  );
}