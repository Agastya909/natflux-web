"use client";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* title */}
      <h1 className="text-center text-5xl font-semibold tracking-wider">
        Natflux
      </h1>
      {/* card */}
      <section
        className="w-1/5 flex flex-col self-center py-3 my-6 border rounded-lg p-4 shadow shadow-zinc-900"
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
        <div className="flex flex-row items-center mt-2">
          <input
            type="checkbox"
            name="rememberme"
            id="rememberme"
            className="mr-2"
          />
          <label
            htmlFor="password"
            className="block text-sm font-thin mt-2 mb-1"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
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
