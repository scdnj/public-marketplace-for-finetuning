import { Metadata } from "next";
import { Button, Card } from "ui";

const CARD_CONTENT = [
  {
    title: "Dashboard",
    href: "./core-concepts/caching",
    cta: "Read More",
  },
  {
    title: "Deposit",
    href: "https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks",
    cta: "Read More",
  },
  {
    title: "Withdraw",
    href: "https://turbo.build/repo/docs/reference/configuration",
    cta: "Read More",
  },
];

export const metadata: Metadata = {
  title: "Tobi - Turborepo Example",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 216px)' }}>
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <h1 className="mx-auto text-center text-6xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl xl:text-8xl">
          Tobi
          <span className="block bg-gradient-to-r from-brandred to-brandblue bg-clip-text text-transparent px-2">
            Time-lock Omni Bridge Interface
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 place-content-evenly">
          {CARD_CONTENT.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
      </main>
    </div>
  );
}
