"use client";

import Image from "next/image";

const medalSvgs = [
  "/assets/icons/gold_medal.svg",
  "/assets/icons/silver_medal.svg",
  "/assets/icons/bronze_medal.svg",
];

const hardcodedUsers = [
  { userId: 1, userName: "Alice", userImageSrc: "/avatars/alice.png", points: 1500 },
  { userId: 2, userName: "Bob", userImageSrc: "/avatars/bob.png", points: 1400 },
  { userId: 3, userName: "Charlie", userImageSrc: "/avatars/charlie.png", points: 1300 },
  { userId: 4, userName: "David", userImageSrc: "/avatars/david.png", points: 1200 },
  { userId: 5, userName: "Eve", userImageSrc: "/avatars/eve.png", points: 1100 },
];

const Leaderboard = () => {
    return (
        <div className="mt-1 w-full rounded-xl bg-indigo-500 border-indigo-700 p-5 text-white border-2 border-b-[6px]">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">Leaderboard</h3>
                <p className="text-lg font-semibold">Top learners this week:</p>

                <div className="space-y-2 pt-2">
                {hardcodedUsers.slice(0, 5).map((user, index) => (
                    <div key={user.userId} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-6 flex justify-center">
                                {index < 3 ? (
                                    <Image
                                        src={medalSvgs[index]}
                                        alt={`Medal ${index + 1}`}
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    <p className="font-bold text-white">{index + 1}</p>
                                )}
                            </div>
                            {/*
                            <Avatar className="border bg-sky-500 h-8 w-8">
                                <AvatarImage className="object-cover" src={user.userImageSrc} />
                            </Avatar>
                            */}
                            <p className="font-semibold">{user.userName}</p>
                        </div>
                        <p className="text-sm font-semibold">{user.points} XP</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;