const FullScreenCardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id="client-page-layout"
      className="flex-col bg-card rounded-md shadow-card border-0 overflow-hidden w-full flex-1 flex"
    >
      {children}
    </div>
  );
};
export default FullScreenCardLayout;
