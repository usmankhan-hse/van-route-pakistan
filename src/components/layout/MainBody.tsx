type MainBodyProps = {
  children: React.ReactNode;
};

const MainBody = ({ children }: MainBodyProps) => {
  return <main className="flex-1">{children}</main>;
};

export default MainBody;