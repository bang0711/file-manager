import Navbar from "./navbar";

type Props = {
  children: React.ReactNode;
  items: BreadcrumbItems[];
};

function ContentLayout({ children, items }: Props) {
  return (
    <div>
      <Navbar items={items} />
      <div className="container px-4 pb-8 pt-8 sm:px-8">{children}</div>
    </div>
  );
}

export default ContentLayout;
