import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
};

export const Header = ({title}: Props ) => {
    return (
        <div className="pb-3 lg:pt-7 lg:-mt-7 flex items-center justify-between border-b-2 mb-5 text-slate-400 lg:z-50">
            <Link href="/courses">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                    <ArrowLeft className="h-8 w-8 text-slate-400" strokeWidth={4} />
                </Button>
            </Link>
            <h1 className="font-bold text-4xl text-sky-400">
                {title}
            </h1>
            <div/>
        </div>
    );
};