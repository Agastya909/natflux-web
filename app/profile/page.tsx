"use client";
import Navbar from "@/component/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  name: string;
  pfp_path: string;
  id: string;
  email: string;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    id: "",
    name: "",
    pfp_path: "",
  });

  useEffect(() => {
    const userData: string | null = localStorage.getItem("user");
    if (userData && userData.length) {
      const user: User = JSON.parse(userData);
      setUser(user);
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center m-4">
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="my-10 flex flex-col items-center">
          <Image
            src={user.pfp_path}
            height={144}
            width={144}
            alt={user.name}
            style={{ height: 144, width: 144, borderRadius: 144 }}
          />
          <p className="text-center text-2xl tracking-wide font-semibold mt-4">
            {user.name}
          </p>
          <p className="mt-2 text-zinc-300">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
