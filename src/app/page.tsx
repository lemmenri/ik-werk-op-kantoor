'use server'

import AanwezigheidPage from "@/components/AanwezigheidPage";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import LoginPage from "@/components/LoginPage";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Header />
      {user ? <AanwezigheidPage /> : <LoginPage searchParams={{ message: "" }} />}
      <Footer />
    </>
  );
}