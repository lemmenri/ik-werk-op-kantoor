import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function LoginPage({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const cookieStore = cookies();
        const supabase = createClient(cookieStore);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Could not authenticate user");
        }

        return redirect("/");
    };

    // const forgotPassword = async () => {
    //     const cookieStore = cookies();
    //     const supabase = createClient(cookieStore);
    //     const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    //         redirectTo: 'https://example.com/update-password',
    //       })

    // }

    return (
        <main id="body" className="flex flex-col py-8 px-4 sm:px-8 w-full space-y-8 grow">
            <form
                className="flex flex-col space-y-4 max-w-md"
                action={signIn}
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
                <label className="" htmlFor="password">
                    Password
                </label>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border mb-6"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    required
                />
                <button className="border bg-primary px-4 py-1 rounded-lg text-light hover:underline">
                    Sign In
                </button>
                <Link
                    href="/reset"
                    className="text-center border bg-light px-4 py-1 rounded-lg text-primary hover:underline"
                >
                    Forgot password?
                </Link>

                {searchParams?.message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {searchParams.message}
                    </p>
                )}
            </form>
        </main>
    );
}
