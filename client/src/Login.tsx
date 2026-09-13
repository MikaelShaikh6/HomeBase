import { useState } from "react";
import { useNavigate } from "react-router";

import { login } from "./api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      const data = await login(email, password);

      if (data.user.householdId) {
        navigate("/");
      } else {
        navigate("/household/setup");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to login"
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-black-500 px-6 py-12 text-alabaster-grey-100">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            HomeBase
          </h1>

          <p className="mt-3 text-lavender-grey-500">
            Manage your household, together.
          </p>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-lavender-grey-500">
              Sign in to your household.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink-black-500 px-4 py-3 text-sm outline-none transition focus:border-lavender-grey-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-ink-black-500 px-4 py-3 text-sm outline-none transition focus:border-lavender-grey-500"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3">
                <p className="text-sm text-red-400">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-dusk-blue-500 px-4 py-3 text-sm font-medium transition-colors hover:bg-lavender-grey-500"
            >
              Sign in
            </button>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-lavender-grey-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="font-medium text-alabaster-grey-100 hover:underline"
          >
            Create one
          </button>
        </p>
      </div>
    </main>
  );
}
