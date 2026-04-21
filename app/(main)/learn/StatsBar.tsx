import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getUserProgress } from "@/db/queries";

export const StatsBar = async () => {
  const progress = await getUserProgress();

  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/shop">
        <Button variant="default" className="text-[#ffcc00] cursor-pointer">
          <Image
            src="/assets/icons/points.svg"
            alt="Points"
            height={28}
            width={28}
            className="mr-2"
          />
          {progress?.points ?? 0}
        </Button>
      </Link>
    </div>
  );
};