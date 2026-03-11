"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

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
      variant={active ? "sidebarDarkActive" : "sidebarDark"}
      className="justify-start text-white font-extrabold text-1xl h-13 gap-3"
      asChild
    >
      <Link href={href} className="flex items-center gap-3">
        {icon}
        {label}
      </Link>
    </Button>
  );
};