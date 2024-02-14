import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default async function NewPassword({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const submitNewPassword = async (formData: FormData) => {
        "use server";

        const newPassword = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { data, error } = await supabase.auth.updateUser({ password: newPassword })

        if (error) {
            return redirect("./new-password?message=There was an error updating your password");
        }
        if (data) {
            return redirect("./");
        }

    };

    return (
        <>
            <Header />
            <main id="body" className="flex flex-col py-8 px-4 sm:px-8 w-full space-y-8 grow">
                <Link
                    href={"./reset"}
                    className="flex space-x-4 hover:underline w-fit py-2 pr-4">
                    <ChevronLeftIcon className="w-6" /> Back
                </Link>
                <form
                    className="flex flex-col space-y-4 max-w-md"
                    action={submitNewPassword}
                >
                    <label className="" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        required // TODO: add validation (min 8 characters, lower + upper, digit + symbol)
                    />
                    <button className="border bg-primary px-4 py-1 rounded-lg text-light hover:underline">
                        Save new password
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