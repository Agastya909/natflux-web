"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPw] = useState<string>("");
  const router = useRouter();

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/user/login",
        { email, password }
      );
      const userData = {
        id: response.data.data.id,
        name: response.data.data.name,
        email: response.data.data.email,
        pfp_path: response.data.data.pfp_path,
      };
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* title */}
      <h1 className="text-center text-5xl font-semibold tracking-wider">
        Natflux
      </h1>
      {/* card */}
      <section
        className="max-w-[480px] flex flex-col self-center py-3 my-6 border rounded-lg p-4 shadow shadow-zinc-900"
        style={{ borderColor: "#232323" }}
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 mt-4 mb-1"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          className="rounded-md px-3 py-1.5 my-1 text-white"
          style={{ backgroundColor: "#181818" }}
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 mt-2 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPw(e.target.value)}
          id="password"
          className="rounded-md px-3 py-1.5 my-1 text-white"
          style={{ backgroundColor: "#181818" }}
        />
        {/* add remember me once authentication is changed to more secure one */}
        <button
          type="submit"
          onClick={login}
          className="flex w-full mt-4 mb-1  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
        <div className="my-4">
          <p className="text-center text-xs text-gray-500">New ? Sign up now</p>
          <button
            type="button"
            onClick={() => router.push("/auth/sign-up")}
            className="flex w-full mt-4 mb-1 justify-center rounded-md border border-indigo-600 px-3 py-1.5 text-sm font-light leading-6 text-white hover:border-2"
          >
            Create new Account
          </button>
        </div>
      </section>
    </div>
  );
}
