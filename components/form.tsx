"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const nim = e.currentTarget.email.value;

    if (type === "login") {
      if (nim.length !== 12) {
        setLoading(false);
        setError("NIM must be exactly 12 characters.");
        return;
      }

      signIn("credentials", {
        redirect: false,
        email: nim,
        password: e.currentTarget.password.value,
        // @ts-ignore
      }).then(({ ok, error }) => {
        setLoading(false);
        if (ok) {
          router.push("/protected");
        } else {
          toast.error(error);
        }
      });
    } else {
      if (nim.length !== 12) {
        setLoading(false);
        setError("NIM must be exactly 12 characters.");
        return;
      }

      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: nim,
          password: e.currentTarget.password.value,
        }),
      }).then(async (res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success("Account created! Redirecting to login...");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          toast.error(await res.text());
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase"
        >
          NIM
        </label>
        <input
          id="email"
          name="email"
          type="number"
          placeholder="ex : 320210401021"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm  sm:text-sm"
        />
        {error && <p className="text-accent font-bold text-sm mt-1">{error}</p>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs uppercase"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border px-3 py-2 shadow-sm  sm:text-sm"
        />
      </div>
      <button
        disabled={loading}
        className={`${loading
          ? "cursor-not-allowed border-[#ffffffb3] bg-secondary"
          : "bg-primary hover:bg-accent text-[#fff]"
          } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p className="font-bold">{type === "login" ? "Login" : "Register"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary">
            Register
          </Link>{" "}
          for free.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary">
            Login
          </Link>{" "}
          instead.
        </p>
      )}
    </form>
  );
}