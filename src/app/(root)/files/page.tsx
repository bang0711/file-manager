import { FilesGrid, FileUploader } from "@/components/files-page";

import { ContentLayout } from "@/components/shared/content-layout";

import prisma from "@/lib/prisma";

async function FilesPage() {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const breadcrumbItems: BreadcrumbItems[] = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/files",
      label: "Files",
    },
  ];

  return (
    <ContentLayout items={breadcrumbItems}>
      <FileUploader />

      <FilesGrid files={files} />
    </ContentLayout>
  );
}

export default FilesPage;
