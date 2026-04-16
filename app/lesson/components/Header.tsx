"use client";

import { useExitModal } from "@/store/use-exit-modal";
import { Settings, X } from "lucide-react";
import { Progress } from "./Progress";
import { useSettingsModal } from "@/store/use-settings-modal";

type Props = {
    percentage: number;
};

export const Header = ({
    percentage,
}: Props) => {
    const { open: openExitModal } = useExitModal();
    const { open: openSettingsModal } = useSettingsModal();
    
    return (
        <header className="lg:pt-12.5 pt-5 px-10 flex gap-x-7 items-center justify-between max-w-285 mx-auto w-full">
            <X
                onClick={openExitModal}
                className="text-slate-500 hover:opacity-75 transition cursor-pointer"
                strokeWidth={4}
            />
            <Settings
                onClick={openSettingsModal}
                className="text-slate-500 hover:opacity-75 transition cursor-pointer"
                strokeWidth={2}
            />
            <Progress value={percentage} />
        </header>
    );
};