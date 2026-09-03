export default function ProgressCard() {
  return (
    <div className="rounded-2xl border border-dusk-blue-500/30 bg-prussian-blue-500 p-6 shadow-xl shadow-black/10 sm:p-8">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-lavender-grey-500">
            Today&apos;s progress
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-semibold tracking-tight text-alabaster-grey-100">
              7
            </span>

            <span className="text-lg text-lavender-grey-500">
              / 10 chores
            </span>
          </div>
        </div>

        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[7px] border-dusk-blue-500">
          <div className="absolute inset-[-7px] rotate-[45deg] rounded-full border-[7px] border-lavender-grey-500 border-r-transparent border-b-transparent" />

          <span className="text-sm font-semibold text-alabaster-grey-100">
            70%
          </span>
        </div>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex justify-between text-xs">
          <span className="text-lavender-grey-500">
            Family progress
          </span>

          <span className="font-medium text-alabaster-grey-100">
            70%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-dusk-blue-500">
          <div className="h-full w-[70%] rounded-full bg-lavender-grey-500" />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-lavender-grey-500">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-dusk-blue-500 text-xs text-alabaster-grey-100">
          ✓
        </span>

        <span>7 chores completed today. Nice work!</span>
      </div>
    </div>
  );
}