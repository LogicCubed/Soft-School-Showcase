"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  icon: ReactNode;
  href: string;
};

export const SidebarItem = ({ label, icon, href }: Props) => {
  const pathname = usePathname();

  const active =
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      variant={active ? "navActive" : "nav"}
      asChild
      className={cn(
        "justify-start font-extrabold text-[16px] h-13 gap-3"
      )}
    >
      <Link href={href} className="flex items-center gap-3 text-slate-400">
        {icon}
        {label}
      </Link>
    </Button>
  );
};