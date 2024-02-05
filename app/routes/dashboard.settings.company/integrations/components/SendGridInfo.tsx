const SendGridInfo = () => {
  return (
    <>
      Connect your SendGrid account to Easy MedSpa to synchronize contacts and
      marketing campaigns. Receive notifications when new contacts are added to
      your SendGrid account.
      <div className="pt-2 font-semibold">
        Our SendGrid Integration enables you to:
      </div>
      <ul className="flex flex-col p-3 gap-2">
        <li>Sync contacts between Easy MedSpa and SendGrid</li>
        <li>Sync marketing campaigns between Easy MedSpa and SendGrid</li>
        <li>
          Receive notifications when new contacts are added to your SendGrid
          account
        </li>
      </ul>
    </>
  );
};

export default SendGridInfo;
