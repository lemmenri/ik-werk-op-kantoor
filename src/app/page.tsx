'use server'

import Aanwezigheid from "@/components/Aanwezigheid";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function Home() {
  return (
    <>
      <Header />
      <main id="body" className="flex flex-col py-8 px-4 sm:px-8 w-full space-y-2 grow">
        <Aanwezigheid />
      </main>
      <Footer />
    </>
  );
}