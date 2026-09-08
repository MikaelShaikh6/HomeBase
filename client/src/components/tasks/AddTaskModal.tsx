import { useState } from "react";

import type { Task } from "../../types/task";

type AddTaskModalProps = {
  onAdd: (task: Task) => void;
  onClose: () => void;
};

export default function AddTaskModal({
  onAdd,
  onClose,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("Me");
  const [time, setTime] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !time) {
      return;
    }

    // eslint-disable-next-line prefer-const
    let [hours, minutes] = time.split(":").map(Number);

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      person,
      time: `${hours}:${minutes.toString().padStart(2, "0")} ${period}`,
      completed: false,
    };

    onAdd(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border-subtle/30 bg-prussian-blue-500 p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-alabaster-grey-100">
            Add a task
          </h2>

          <p className="mt-1 text-sm text-lavender-grey-500">
            Create a new task for today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium"
            >
              Task
            </label>

            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Clean the kitchen"
              className="w-full rounded-lg border border-border-subtle/40 bg-ink-black-500 px-4 py-3 text-sm text-alabaster-grey-100 outline-none placeholder:text-lavender-grey-500 focus:border-lavender-grey-500"
              autoFocus
            />
          </div>

          {/* Assigned to */}
          <div>
            <label
              htmlFor="assigned-to"
              className="mb-2 block text-sm font-medium"
            >
              Assign to
            </label>

            <select
              id="assigned-to"
              value={person}
              onChange={(event) => setPerson(event.target.value)}
              className="w-full rounded-lg border border-border-subtle/40 bg-ink-black-500 px-4 py-3 text-sm text-alabaster-grey-100 outline-none focus:border-lavender-grey-500"
            >
              <option value="Me">Me</option>
              <option value="Alex">Alex</option>
              <option value="Sam">Sam</option>
            </select>
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="task-time"
              className="mb-2 block text-sm font-medium"
            >
              Time
            </label>

            <input
              id="task-time"
              type="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              className="w-full rounded-lg border border-border-subtle/40 bg-ink-black-500 px-4 py-3 text-sm text-alabaster-grey-100 outline-none focus:border-lavender-grey-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-lavender-grey-500 transition-colors hover:bg-ink-black-500 hover:text-alabaster-grey-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-dusk-blue-500 px-4 py-2.5 text-sm font-medium text-alabaster-grey-100 transition-colors hover:bg-lavender-grey-500"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}