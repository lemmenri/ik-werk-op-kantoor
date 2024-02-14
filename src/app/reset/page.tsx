import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Reset({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const requestReset = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'http://localhost:3000/new-password' }); // TODO: change to production url. Move to .env file?

        if (error) {
            return redirect("./reset?message=Could not reset password");
        }

        return redirect("./");
    };

    return (
        <>
            <Header />
            <main id="body" className="flex flex-col py-8 px-4 sm:px-8 w-full space-y-8 grow">
                <Link
                    href={"./"}
                    className="flex space-x-4 hover:underline w-fit py-2 pr-4">
                    <ChevronLeftIcon className="w-6" /> Back
                </Link>
                <form
                    className="flex flex-col space-y-4 max-w-md"
                    action={requestReset}
                >
                    <label className="" htmlFor="email">
                        E-mail
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="email"
                        id="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                    <button className="border bg-primary px-4 py-1 rounded-lg text-light hover:underline">
                        Request password reset
                    </button>
                </form>
                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </main>
            <Footer />
        </>
    );
}