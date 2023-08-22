import { Metadata } from "next";
import { Button, Card } from "ui";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Tobi
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent px-2">
            Time-lock Omni Bridge Interface
          </span>
        </h1>
      </main>
    </div>
  );
}
