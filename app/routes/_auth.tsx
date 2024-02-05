import { Outlet } from "@remix-run/react";

const Auth = () => {
  return (
    <div
      id="auth-wrapper"
      className="flex flex-col bg-primary-2 flex-1 h-screen overflow-hidden"
    >
      <Outlet />
    </div>
  );
};

export default Auth;
