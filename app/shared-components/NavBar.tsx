import Link from "next/link";
import Image from "next/image";

import {NavLinks} from "@/constant";
import AuthProviders from "@/app/shared-components/AuthProviders";
import {getCurrentUser} from "@/lib/session";
import {ProfileMenu} from "@shared-components/index";

const NavBar = async () => {
    const session = await getCurrentUser()

    return (
        <nav className="flexBetween navbar">
            <div className="flex-1 flexStart gap-10">
                <Link href='/'>
                    <Image
                        src='/logo.svg'
                        width={116}
                        height={43}
                        alt='logo'
                    />
                </Link>

                <ul className="hidden xl:flex text-small gap-7">
                    {
                        NavLinks.map((link) => (
                            <Link href={link.href} key={link.key}>
                                {link.text}
                            </Link>
                        ))
                    }
                </ul>
            </div>

            <div className="flexStart gpa-4">
                {
                    session ? (
                        <>
                            <ProfileMenu session={session}/>
                            <Link href="/create-project" className="ml-2">
                                Share work
                            </Link>
                        </>
                    ) : (
                        <AuthProviders/>
                    )
                }
            </div>
        </nav>
    );
};

export default NavBar;