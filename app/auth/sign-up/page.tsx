"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-[480px] m-auto">
      {/* title */}
      <div className="flex flex-row items-center">
        <button onClick={() => router.back()}>
          <Image src="/left.png" alt="back-arrow" height={35} width={35} />
        </button>
        <p className="flex-1 text-center text-lg tracking-wide ml-6">Create new account</p>
      </div>
      {/* card */}
      <section
        className="flex flex-col self-center my-6 border rounded-lg px-4 py-2 shadow shadow-zinc-900"
        style={{ borderColor: "#232323" }}
      >
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 mt-2 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          name="Name"
          id=""
          className="rounded-md px-3 py-1.5 my-1 text-gray-900"
          style={{ backgroundColor: "#181818" }}
        />
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 mt-4 mb-1"
        >
          Email
        </label>
        <input
          type="text"
          name="email"
          id=""
          className="rounded-md px-3 py-1.5 my-1 text-gray-900"
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
          id=""
          className="rounded-md px-3 py-1.5 my-1 text-black"
          style={{ backgroundColor: "#181818" }}
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 mt-2 mb-1"
        >
          Enter your password again
        </label>
        <input
          type="password"
          name="password"
          id=""
          className="rounded-md px-3 py-1.5 my-1 text-black"
          style={{ backgroundColor: "#181818" }}
        />
        <button
          type="submit"
          className="flex w-full my-4  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </section>
    </div>
  );
}
