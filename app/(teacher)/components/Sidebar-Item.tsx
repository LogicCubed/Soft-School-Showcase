"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

type Props = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export const SidebarItem = ({ label, icon: Icon, href }: Props) => {
  const pathname = usePathname();

  const active =
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Button
      variant={active ? "navActive" : "nav"}
      className="justify-start text-white font-extrabold text-1xl h-13 gap-3"
      asChild
    >
      <Link href={href} className="flex items-center">
        <Icon className="w-16 h-16" width={32} height={32} strokeWidth={3} />
        {label}
      </Link>
    </Button>
  );
};