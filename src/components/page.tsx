import "@/stylesheets/components/page.css";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
};

function Page({ title, description, children, className }: Props) {
  return (
    <>
      {/* Title Section */}
      <section className="title-section-container">
        {/* Title Name */}
        <h1>{title}</h1>
        {/* Title Split */}
        <hr />
        {/* Title Description */}
        <p>{description}</p>
      </section>
      <div className={className}>{children}</div>
    </>
  );
}

export default Page;
