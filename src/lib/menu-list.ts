import { Settings, LayoutGrid, LucideIcon, File, User } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Main",
      menus: [
        {
          href: "/files",
          label: "Files",
          icon: File,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/user",
          label: "User",
          icon: User,
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
