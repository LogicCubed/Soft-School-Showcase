import Image from "next/image";
import Link from "next/link";
import { StatsBar } from "@/app/(main)/learn/StatsBar";

type Props = {
  isAdmin?: boolean;
};

export const Header = ({ isAdmin }: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-400 px-4 py-2 flex items-start gap-4">

      <div className="flex flex-col items-start gap-2">
        {isAdmin && (
          <Link href="/admin/dashboard" className="flex items-center">
            <Image
              src="/assets/icons/wrench.png"
              alt="Admin"
              width={32}
              height={32}
            />
          </Link>
        )}
      </div>

      <div className="flex flex-col items-start">
        <StatsBar />
      </div>

    </header>
  );
};