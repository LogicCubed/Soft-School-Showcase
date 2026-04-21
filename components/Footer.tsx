"use client";

import { FooterNavItem } from "./FooterNavItem";

export const Footer = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-400 z-50 lg:hidden">
      <div className="flex items-center h-16 px-2">
        <div className="flex flex-1 justify-center">
          <FooterNavItem href="/learn" iconSrc="/assets/icons/pencil.png" label="Learn" />
        </div>
        <div className="flex flex-1 justify-center">
          <FooterNavItem href="/puzzles" iconSrc="/assets/icons/puzzle.svg" label="Puzzles" />
        </div>
        <div className="flex flex-1 justify-center">
          <FooterNavItem href="/game" iconSrc="/assets/icons/game.png" label="Games" />
        </div>
        <div className="flex flex-1 justify-center">
          <FooterNavItem href="/quests" iconSrc="/assets/icons/target.svg" label="Quests" />
        </div>
        <div className="flex flex-1 justify-center">
          <FooterNavItem href="/shop" iconSrc="/assets/icons/shop.png" label="Shop" />
        </div>
        <div className="flex flex-1 justify-center">
          <FooterNavItem href="/profile" iconSrc="/assets/icons/profile.png" label="Profile" />
        </div>
      </div>
    </nav>
  );
};