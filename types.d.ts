type RegisterType = {
  name: string;
  email: string;
  password: string;
};

type LoginType = {
  email: string;
  password: string;
};

type Session = {
  user: {
    id: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type BreadcrumbItems = {
  label: string;
  href: string;
};

type FileType = "document" | "image" | "video" | "audio" | "other";