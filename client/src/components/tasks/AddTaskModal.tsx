import { useEffect, useState } from "react";

import { createTask } from "../../api/tasks";
import {
  getMyHousehold,
  type HouseholdMember,
} from "../../api/households";

import type { Task } from "../../api/tasks";

type AddTaskModalProps = {
  onAdd: (task: Task) => void;
  onClose: () => void;
};

export default function AddTaskModal({
  onAdd,
  onClose,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState<number | "">("");
  const [time, setTime] = useState("");

  const [members, setMembers] = useState<HouseholdMember[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyHousehold()
      .then((data) => {
        setMembers(data.members);

        if (data.members.length > 0) {
          setAssignedTo(data.members[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load household members");
      });
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim() || !time || assignedTo === "") {
      return;
    }

    setError("");

    try {
      const task = await createTask(
        title.trim(),
        time,
        assignedTo
      );

      onAdd(task);
      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create task"
      );
    }
  }

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

          <div>
            <label
              htmlFor="assigned-to"
              className="mb-2 block text-sm font-medium"
            >
              Assign to
            </label>

            <select
              id="assigned-to"
              value={assignedTo}
              onChange={(event) =>
                setAssignedTo(Number(event.target.value))
              }
              className="w-full rounded-lg border border-border-subtle/40 bg-ink-black-500 px-4 py-3 text-sm text-alabaster-grey-100 outline-none focus:border-lavender-grey-500"
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.email}
                </option>
              ))}
            </select>
          </div>

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
              className="w-full rounded-lg border border-border-subtle/40 bg-ink-black-500 px-4 py-3 text-sm text-alabaster-grey-100 outline-none placeholder:text-lavender-grey-500 focus:border-lavender-grey-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

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
              disabled={members.length === 0}
              className="rounded-lg bg-dusk-blue-500 px-4 py-2.5 text-sm font-medium text-alabaster-grey-100 transition-colors hover:bg-lavender-grey-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}