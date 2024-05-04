import Logo from "@/app/ui/logo";
import UpdateServerURLForm from "@/app/ui/update-server-url-form";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Link href='/dashboard'>
                    <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                        <div className="w-32 text-white md:w-36">
                            <Logo />
                        </div>
                            <ArrowRightIcon className="ml-auto h-12 w-12 text-gray-50" />
                    </div>
                </Link>
                <UpdateServerURLForm />
            </div>
        </main>
    )
}