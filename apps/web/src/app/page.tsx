import { Metadata } from "next";
import { Button, Card } from "ui";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center font-extrabold tracking-tight text-white space-y-8">
          <span className="text-7xl sm:text-8xl lg:text-9xl xl:text-9xl">TOBI</span>
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent px-2 text-6xl sm:text-7xl lg:text-8xl xl:text-8xl">
            All-Chain KYC Platform
          </span>
          <span className="block px-2 text-3xl sm:text-4xl lg:text-5xl xl:text-5xl space-x-2">
            <span className="text-cat-orange500">T</span>oken
            <span className="text-cat-orange500">O</span>ptimizing
            <span className="text-cat-orange500">B</span>ridge
            <span className="text-cat-orange500">I</span>ntelligence
          </span>
        </h1>
      </main>
    </div>
  );
}
