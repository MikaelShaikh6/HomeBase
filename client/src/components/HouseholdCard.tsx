type HouseholdCardProps = {
  name: string;
  inviteCode: string;
  memberCount: number;
};

const HouseholdCard = ({
  name,
  inviteCode,
  memberCount,
}: HouseholdCardProps) => {
  return (
    <div className="rounded-xl outline outline-lavender-grey-700 bg-ink-black-400 p-6">
      <h2 className="text-xl font-semibold">
        {name}
      </h2>

      <p className="mt-2 text-lavender-grey-500">
        {memberCount} members
      </p>

      <p className="mt-4 text-sm text-lavender-grey-500">
        Invite code
      </p>

      <p className="mt-1 font-mono text-lg">
        {inviteCode}
      </p>
    </div>
  );
};

export default HouseholdCard;