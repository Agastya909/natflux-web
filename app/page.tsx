"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    verifyJwt();
  }, []);

  const verifyJwt = async () => {
    try {
      const jwt: string | null = localStorage.getItem("jwt");
      if (jwt && jwt.length > 0) {
        const response = await axios.get(
          "http://localhost:4000/auth/user/verify-jwt",
          { headers: { Authorization: "Bearer " + jwt } }
        );
        const userData = {
          id: response.data.data.id,
          name: response.data.data.name,
          email: response.data.data.email,
          pfp_path: response.data.data.pfp_path,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        router.replace("/home");
      } else {
        router.replace("/auth");
      }
    } catch (error) {
      router.replace("/auth");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-center text-white font-bold text-5xl animate-bounce">
        Natflux
      </p>
    </div>
  );
}
