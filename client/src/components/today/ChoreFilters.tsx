const filters = ["Everyone", "Mine", "Kids", "Completed"];

export default function ChoreFilters() {
  return (
    <div className="mb-4 flex gap-2 overflow-x-auto">
      {filters.map((filter, index) => (
        <button
          key={filter}
          className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            index === 0
              ? "bg-dusk-blue-500 text-alabaster-grey-100"
              : "text-lavender-grey-500 hover:bg-prussian-blue-500 hover:text-alabaster-grey-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}