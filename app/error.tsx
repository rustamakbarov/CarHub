"use client";
import Link from "next/link";
import React from "react";

interface Error {
  error: {
    message?: string;
  };
  reset: void;
}

export default function error({ error, reset }: Error) {
  return (
    <div className="flex gap-4 flex-col h-screen max-w-7xl justify-center items-center mx-auto px-2">
      <h1 className="text-5xl font-semibold">Opps! Something went wrong :(</h1>
      <p className="text-xl">{error.message}</p>
      <Link
        href="/"
        className="inline-block px-6 py-3 text-lg text-white bg-blue-600"
      >
        Go back home
      </Link>
    </div>
  );
}
