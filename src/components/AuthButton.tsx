import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthButton() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";

        const cookieStore = cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.signOut();
        return redirect("/");
    };

    return user && (
        <div className="flex items-center gap-4">
            {user.email!.charAt(0).toUpperCase() + user.email!.slice(1).substring(0, user.email!.indexOf("@") - 1)}
            <form action={signOut}>
                <button className="py-2 px-4 hover:underline">
                    Logout
                </button>
            </form>
        </div>
    )
}
