import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  items: BreadcrumbItems[];
};

function BreadcrumbMap({ items }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ href, label }, index) => (
          <Fragment key={index}>
            <BreadcrumbItem className="text-sm sm:text-base">
              {index === items.length - 1 ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={href}>{label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadcrumbMap;
