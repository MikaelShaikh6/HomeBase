import Header from "./components/Header";

import { navItems } from "./navigation/navItems";

const Profile = () => {
  const user = {
    name: "Alex",
    email: "alex@example.com",
  };

  const household = {
    name: "Apartment 302",
    role: "Member",
  };

  return (
    <div className="min-h-screen bg-ink-black-500 text-alabaster-grey-100">
      <Header navItems={navItems} />

      <main className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">
            Profile
          </h1>

          <p className="mt-1 text-lavender-grey-500">
            Manage your account.
          </p>
        </div>

        <div className="space-y-6">
          {/* Account */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Account
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-lavender-grey-500">
                  Name
                </p>

                <p className="mt-1">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-lavender-grey-500">
                  Email
                </p>

                <p className="mt-1">
                  {user.email}
                </p>
              </div>
            </div>
          </section>

          {/* Household */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Household
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-lavender-grey-500">
                  Household
                </p>

                <p className="mt-1">
                  {household.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-lavender-grey-500">
                  Role
                </p>

                <p className="mt-1">
                  {household.role}
                </p>
              </div>
            </div>
          </section>

          {/* Logout */}
          <section className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold">
              Account Actions
            </h2>

            <p className="mb-4 text-sm text-lavender-grey-500">
              Sign out of your HomeBase account.
            </p>

            <button
              type="button"
              className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/10"
            >
              Log out
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;
