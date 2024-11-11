"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Ellipsis, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { deleteSession } from "@/lib/session";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Props = {
  isOpen: boolean | undefined;
};

function Menu({ isOpen }: Props) {
  const pathname = usePathname();

  const menuList = getMenuList();

  return (
    <div className="flex h-full flex-col justify-between">
      <ScrollArea className="max-h-full flex-1 px-1">
        <nav className="mt-8 h-full w-full">
          <ul className="flex flex-col items-start space-y-1 px-2">
            {menuList.map(({ groupLabel, menus }, i) => (
              <li key={i} className={cn("w-full", groupLabel ? "pt-5" : "")}>
                {/* Display group label */}
                {isOpen && groupLabel && (
                  <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                    {groupLabel}
                  </p>
                )}

                {/* Display only the dots */}
                {!isOpen && isOpen !== undefined && groupLabel && (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="flex w-full items-center justify-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{groupLabel}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

                {/* Display menu items */}
                {menus.map(({ href, label, icon: Icon, active }, index) => (
                  <div key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={
                              (active === undefined && pathname === href) ||
                              active
                                ? "secondary"
                                : "ghost"
                            }
                            className="mb-1 flex h-10 w-full items-center justify-start"
                            asChild
                          >
                            <Link href={href}>
                              <span
                                className={cn(isOpen === false ? "" : "mr-4")}
                              >
                                <Icon size={18} />
                              </span>
                              {isOpen && (
                                <p className={cn("max-w-[200px] truncate")}>
                                  {label}
                                </p>
                              )}
                            </Link>
                          </Button>
                        </TooltipTrigger>

                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              onClick={async () => await deleteSession()}
              variant="outline"
              className="mt-5 h-10 w-full justify-center"
            >
              <span className={cn(isOpen === false ? "" : "mr-4")}>
                <LogOut size={18} />
              </span>
              <p
                className={cn(
                  "whitespace-nowrap",
                  !isOpen ? "hidden opacity-0" : "opacity-100",
                )}
              >
                Sign out
              </p>
            </Button>
          </TooltipTrigger>
          {!isOpen && <TooltipContent side="right">Sign out</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Menu;
