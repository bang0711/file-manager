import BreadcrumbMap from "../breadcrumb-map";
import ThemeToggle from "../theme-toggle";
import SheetMenu from "./sheet-menu";

type Props = {
  items: BreadcrumbItems[];
};

function Navbar({ items }: Props) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <BreadcrumbMap items={items} />
        </div>

        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
          {/* <UserNav /> */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
