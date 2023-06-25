import Link from "next/link";
import Image from "next/image";

import {NavLinks} from "@/constant";
import AuthProviders from "@/app/components/AuthProviders";

const NavBar = () => {
    const session = {}

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
                            user photo
                            <Link href="/create-project">
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