"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { SidebarItem } from "./Sidebar-Item";

type Props = {
    className?: string;
    isAdmin?: boolean;
};

export const Sidebar = ({ className, isAdmin }: Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 bg-[#0e0d12] flex-col",
            className,
            )}>
                <Link href="/learn">
                    <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                        <Image src="/assets/logos/soft-school-logo.svg" height={40} width={40} alt="Logo"/>
                        <h1 className="text-2xl font-extrabold text-sky-400 tracking-wide">
                            Soft School
                        </h1>
                    </div>
                </Link>
                <div className="flex flex-col gap-y-2 flex-1">
                    <SidebarItem
                        label="Learn"
                        href="/learn"
                        icon={
                            <Image
                                src="/assets/icons/learn.svg"
                                alt="Learn"
                                width={24}
                                height={24}
                            />
                        }
                    />
                    <SidebarItem
                        label="Puzzles"
                        href="/puzzles"
                        icon={
                            <Image
                                src="/assets/icons/puzzles.svg"
                                alt="Puzzles"
                                width={24}
                                height={24}
                            />
                        }
                    />
                    <SidebarItem
                        label="Games"
                        href="/games"
                        icon={
                            <Image
                                src="/assets/icons/games.svg"
                                alt="Games"
                                width={24}
                                height={24}
                            />
                        }
                    />
                    <SidebarItem
                        label="Quests"
                        href="/quests"
                        icon={
                            <Image
                                src="/assets/icons/target.svg"
                                alt="Quests"
                                width={24}
                                height={24}
                            />
                        }
                    />
                    <SidebarItem
                        label="Shop"
                        href="/shop"
                        icon={
                            <Image
                                src="/assets/icons/shop.svg"
                                alt="Quests"
                                width={24}
                                height={24}
                            />
                        }
                    />
                </div>
                <div className="flex flex-col mb-4">
                    {isAdmin && (
                        <SidebarItem
                            label="Admin"
                            href="/admin/dashboard"
                            icon={
                                <Image
                                    src="/assets/icons/shield.svg"
                                    alt="Admin"
                                    width={24}
                                    height={24}
                                />
                            }
                        />
                    )}
                    <SidebarItem
                        label="Profile"
                        href="/profile"
                        icon={
                            <Image
                                src="/assets/icons/profile.svg"
                                alt="Profile"
                                width={24}
                                height={24}
                            />
                        }
                    />
                    <SidebarItem
                        label="Settings"
                        href="/settings"
                        icon={
                            <Image
                                src="/assets/icons/gear.svg"
                                alt="Settings"
                                width={24}
                                height={24}
                            />
                        }
                    />
                </div>
        </div>
    );
};