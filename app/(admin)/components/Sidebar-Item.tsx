"use client";

import { Button } from "components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
      asChild
      className={cn(
        "justify-start font-extrabold text-[16px] h-13 gap-3",
        "text-white/80 dark:text-white",
        active && "text-white"
      )}
    >
      <Link href={href} className="flex items-center gap-3">
        <Icon className="w-6 h-6" strokeWidth={3} />
        {label}
      </Link>
    </Button>
  );
};