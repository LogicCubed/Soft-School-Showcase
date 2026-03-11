import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { Calendar, Clipboard, Globe, GraduationCap, Home } from "lucide-react";
import { SidebarItem } from "./Sidebar-Item";

type Props = {
    className?: string;
};

export const TeacherSidebar = ({ className }: Props ) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 bg-sky-400 flex-col",
            className,
            )}>
                <Link href="/teacher">
                    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                        <Image src="/assets/logos/soft-school-logo.svg" height={40} width={40} alt="Logo"/>
                        <h1 className="text-2xl font-extrabold text-white tracking-wide">
                            Soft Teacher
                        </h1>
                    </div>
                </Link>
                <div className="flex flex-col gap-y-2 flex-1">
                    <SidebarItem label="Dashboard" icon={Home} href="/teacher/dashboard" />
                    <SidebarItem label="Schedule" icon={Calendar} href="/teacher/schedule" />
                    <SidebarItem label="Classes" icon={Clipboard} href="/teacher/classes" />
                    <SidebarItem label="Gradebook" icon={GraduationCap} href="/teacher/gradebook" />
                </div>
                <div className="flex flex-col mb-4">
                    <SidebarItem label="Student View" icon={Globe} href="/learn" />
                </div>
        </div>
    );
};