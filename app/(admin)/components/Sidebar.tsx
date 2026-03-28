"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { BookOpen, Clipboard, CreditCard, Globe, Home, Users } from "lucide-react";
import { SidebarItem } from "./Sidebar-Item";

type Props = {
    className?: string;
};

export const AdminSidebar = ({ className }: Props ) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 bg-[#0e0d12] flex-col",
            className,
            )}>
                <Link href="/learn">
                    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                        <Image src="/assets/logos/soft-school-logo.svg" height={40} width={40} alt="Logo"/>
                        <h1 className="text-2xl font-extrabold text-sky-400 tracking-wide">
                            Soft Admin
                        </h1>
                    </div>
                </Link>
                <div className="flex flex-col gap-y-2 flex-1">
                    <SidebarItem label="Dashboard" icon={Home} href="/admin/dashboard" />
                    <SidebarItem label="Users" icon={Users} href="/admin/users" />
                    <SidebarItem label="Classes" icon={Clipboard} href="/admin/classes" />
                    <SidebarItem label="Curriculum" icon={BookOpen} href="/admin/curriculum" />
                    <SidebarItem label="Billing" icon={CreditCard} href="/admin/billing" />
                </div>
                <div className="flex flex-col mb-4">
                    <SidebarItem label="View Site" icon={Globe} href="/learn" />
                </div>
        </div>
    );
};