"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { useExitModal } from "@/store/use-exit-modal";

export const ExitModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useExitModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/assets/characters/softy/softy.svg"
                            alt="Logo"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center">
                        <div className="font-bold text-xl text-slate-400">
                            Wait, don&apos;t go!
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center text-base font-medium text-md text-slate-400">
                        You&apos;re about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full text-white"
                            size="lg"
                            onClick={close}
                        >
                            Keep Learning
                        </Button>
                        <Button
                            variant="danger"
                            className="w-full text-white"
                            size="lg"
                            onClick={() => {
                                close();
                                router.push("/learn");
                            }}
                        >
                            End Session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};