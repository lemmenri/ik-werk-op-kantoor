'use client'

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Table from "@/components/Table";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const headers = [
  "Wie?",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
]

const data = [
  ["Rick", true, false, true, false, false],
  ["Tsun", true, false, false, true, false],
  ["Craig", true, false, false, false, true],
  ["Wilma", true, false, true, false, false],
  ["Wilbert", true, false, false, true, false],
  ["Robin", true, false, false, false, true],
  ["Marlyn", true, false, true, false, false],
  ["Renate", true, false, false, true, false],
  ["Lotte", true, false, false, false, true],
  ["Shamier", true, false, true, false, false],
  ["Daniëlle", true, false, false, true, false],
  ["Tjitte", true, false, false, false, true],
  ["Carolien", true, false, false, false, true],
  ["Miel", true, false, false, false, true],
  ["Jeff", true, false, false, false, true],
]

export default function Home() {
  return (
    <>
      <Header />
      <main id="body" className="flex flex-col py-8 px-4 sm:px-8 w-full space-y-2 grow">
        <div className="space-y-2">
          <p>Geeft hier je aanwezigheid voor komende week op kantoor door.</p>
          <div className="flex justify-between items-center max-w-3xl">
            <div className="flex space-x-4 items-center">
              <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline">
                <ChevronLeftIcon className="w-6" />
              </button>
              <p>Week 5-9 februari:</p>
              <button className="border bg-primary px-4 py-0 rounded-lg text-light hover:underline">
                <ChevronRightIcon className="w-6" />
              </button>
            </div>
            <button className="border bg-primary px-4 py-1 rounded-lg text-light hover:underline">Wijzig</button>
          </div>
        </div>
        <div className=" w-full max-w-3xl overflow-x-auto space-y-2">
          <Table name={"table"} headers={headers} data={data} />
        </div>
      </main>
      <Footer />
    </>
  );
}