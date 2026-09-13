import { useState } from "react";
import { useNavigate } from "react-router";

import { apiRequest } from "./api/api";

export default function HouseholdSetup() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [name, setName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [error, setError] = useState("");

  async function handleCreate() {
    setError("");

    try {
      const data = await apiRequest("/households", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      });

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to create household"
      );
    }
  }

  async function handleJoin() {
    setError("");

    try {
      const data = await apiRequest("/households/join", {
        method: "POST",
        body: JSON.stringify({
          inviteCode,
        }),
      });

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to join household"
      );
    }
  }

  if (mode === "choose") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ink-black-500 px-6 py-12 text-alabaster-grey-100">
        <div className="w-full max-w-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              HomeBase
            </h1>

            <p className="mt-3 text-lavender-grey-500">
              One last step to get started.
            </p>
          </div>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">
                Set up your household
              </h2>

              <p className="mt-2 text-sm text-lavender-grey-500">
                Create a new household or join one using an invite code.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setMode("create")}
                className="group rounded-xl border border-white/10 bg-ink-black-500 p-5 text-left transition hover:border-lavender-grey-500/50 hover:bg-white/5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-dusk-blue-500 text-lg">
                  +
                </div>

                <h3 className="font-medium">
                  Create household
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-lavender-grey-500">
                  Start a new household and invite others to join.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode("join")}
                className="group rounded-xl border border-white/10 bg-ink-black-500 p-5 text-left transition hover:border-lavender-grey-500/50 hover:bg-white/5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-dusk-blue-500 text-lg">
                  →
                </div>

                <h3 className="font-medium">
                  Join household
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-lavender-grey-500">
                  Use an invite code to join an existing household.
                </p>
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  const isCreateMode = mode === "create";

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-black-500 px-6 py-12 text-alabaster-grey-100">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            HomeBase
          </h1>

          <p className="mt-3 text-lavender-grey-500">
            {isCreateMode
              ? "Create your household."
              : "Join your household."}
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              {isCreateMode
                ? "Create household"
                : "Join household"}
            </h2>

            <p className="mt-1 text-sm text-lavender-grey-500">
              {isCreateMode
                ? "Give your household a name to get started."
                : "Enter the invite code shared with you."}
            </p>
          </div>

          {isCreateMode ? (
            <div>
              <label
                htmlFor="household-name"
                className="mb-2 block text-sm font-medium"
              >
                Household name
              </label>

              <input
                id="household-name"
                type="text"
                placeholder="e.g. Apartment 302"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink-black-500 px-4 py-3 text-sm outline-none transition focus:border-lavender-grey-500"
                autoFocus
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="invite-code"
                className="mb-2 block text-sm font-medium"
              >
                Invite code
              </label>

              <input
                id="invite-code"
                type="text"
                placeholder="e.g. X7K2P"
                value={inviteCode}
                onChange={(event) => setInviteCode(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink-black-500 px-4 py-3 text-sm uppercase tracking-widest outline-none transition focus:border-lavender-grey-500"
                autoFocus
              />
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3">
              <p className="text-sm text-red-400">
                {error}
              </p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setMode("choose");
                setError("");
              }}
              className="rounded-lg px-4 py-3 text-sm font-medium text-lavender-grey-500 transition hover:bg-white/5 hover:text-alabaster-grey-100"
            >
              Back
            </button>

            <button
              type="button"
              onClick={isCreateMode ? handleCreate : handleJoin}
              disabled={
                isCreateMode
                  ? !name.trim()
                  : !inviteCode.trim()
              }
              className="flex-1 rounded-lg bg-dusk-blue-500 px-4 py-3 text-sm font-medium transition-colors hover:bg-lavender-grey-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCreateMode
                ? "Create household"
                : "Join household"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}