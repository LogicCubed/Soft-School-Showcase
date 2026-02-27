import { Button } from "components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 h-20 w-full px-4 bg-white">
      <div className="lg:max-w-5xl mx-auto flex items-center justify-between h-full">
        <Link href="/" className="pt-8 pl-4 pb-7 flex items-center gap-x-3 cursor-pointer">
          <Image src="/assets/logos/soft-school-logo.svg" height={40} width={40} alt="Logo" />
          <h1 className="text-3xl font-extrabold text-sky-400 tracking-wide">
            Soft School
          </h1>
        </Link>
        <Button
            variant="primary"
            className="cursor-pointer"
        >
            Sign In
        </Button>
      </div>
    </header>
  );
};