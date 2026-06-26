type PageHeaderProps = {
  title: string;
};

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <header className="flex h-[74px] items-center border-b border-[#dcdcdc] bg-white px-5 shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
      <h1 className="text-xl font-bold text-black">{title}</h1>
    </header>
  );
};

export default PageHeader;
