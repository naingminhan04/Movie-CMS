type PlaceholderPageProps = {
  title: string;
};

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <section>
      <h1 className="text-2xl font-semibold">{title}</h1>
    </section>
  );
};

export default PlaceholderPage;
