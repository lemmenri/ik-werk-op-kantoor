'use server'

import AanwezigheidPage from "@/components/AanwezigheidPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default async function Home() {
  return (
    <>
      <Header />
      <AanwezigheidPage />
      <Footer />
    </>
  );
}