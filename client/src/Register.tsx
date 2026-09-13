import { useState } from "react";
import { useNavigate } from "react-router";

import { register } from "./api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    try {
      await register(email, password);
      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to register"
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
              Create your account
            </h2>

            <p className="mt-1 text-sm text-lavender-grey-500">
              Get started with HomeBase.
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
                placeholder="Create a password"
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
              Create account
            </button>
          </form>
        </section>

        <p className="mt-6 text-center text-sm text-lavender-grey-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-alabaster-grey-100 hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
}