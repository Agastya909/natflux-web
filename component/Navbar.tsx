import Link from "next/link";
import { useEffect, useState } from "react";
import "./style.css";

type User = {
  name: string;
  pfp_path: string;
  id: string;
  email: string;
};

export default function Navbar() {
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
    <div
      className="p-4"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Link href="/home">
        <h1
          className="font-semibold tracking-wider"
          style={{
            fontSize: 32,
            marginRight: 20,
            flex: 1,
          }}
        >
          Natlfux
        </h1>
      </Link>
      <div className="flex flex-row">
        <Link href="/search">
          <p className="text-lg py-1 px-3 hover">Search</p>
        </Link>
        <Link href="/video/upload">
          <p className="text-lg py-1 px-3 hover flex-1">Upload</p>
        </Link>
        <Link href="/profile">
          <p className="text-lg py-1 px-3 hover flex-1">{user.name}</p>
        </Link>
      </div>
    </div>
  );
}
