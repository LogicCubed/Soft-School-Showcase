"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./Sidebar-Item";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  className?: string;
  isAdmin?: boolean;
};

export const Sidebar = ({ className, isAdmin }: Props) => {
  const { user } = useUser();

  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 bg-[#0e0d12] flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src="/assets/logos/soft-school-logo.svg"
            height={40}
            width={40}
            alt="Logo"
          />
          <h1 className="text-2xl font-extrabold text-sky-400 tracking-wide">
            Soft School
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          icon={<Image src="/assets/icons/pencil.png" alt="Learn" width={32} height={32} />}
        />
        <SidebarItem
          label="Puzzles"
          href="/puzzles"
          icon={<Image src="/assets/icons/puzzle.svg" alt="Puzzles" width={32} height={32} />}
        />
        <SidebarItem
          label="Games"
          href="/games"
          icon={<Image src="/assets/icons/game.png" alt="Games" width={32} height={32} />}
        />
        <SidebarItem
          label="Quests"
          href="/quests"
          icon={<Image src="/assets/icons/target.svg" alt="Quests" width={32} height={32} />}
        />
        <SidebarItem
          label="Shop"
          href="/shop"
          icon={<Image src="/assets/icons/shop.png" alt="Shop" width={32} height={32} />}
        />
      </div>

      <div className="flex flex-col mb-4">
        {isAdmin && (
          <SidebarItem
            label="Admin"
            href="/admin/dashboard"
            icon={<Image src="/assets/icons/wrench.png" alt="Admin" width={32} height={32} />}
          />
        )}

        <SidebarItem
          label="Profile"
          href="/profile"
          icon={
            user ? (
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.imageUrl} className="object-cover" />
              </Avatar>
            ) : (
              <Image
                src="/assets/icons/profile.svg"
                alt="Profile"
                width={32}
                height={32}
              />
            )
          }
        />

        <SidebarItem
          label="Settings"
          href="/settings"
          icon={<Image src="/assets/icons/gear.svg" alt="Settings" width={32} height={32} />}
        />
      </div>
    </div>
  );
};