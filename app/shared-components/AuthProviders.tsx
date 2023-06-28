"use client"

import {useState, useEffect} from 'react';
import {getProviders, signIn} from "next-auth/react"
import {Button} from "@/app/shared-components";

interface Provider {
    id: string,
    name: string,
    type: string,
    signinUrl: string,
    callbackUrl: string,
    signinUrlParams?: Record<string, string> | null,
}


type Providers = Record<string, Provider>

const AuthProviders = () => {
    const [providers, setProviders] = useState<Providers | null>(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders()
            setProviders(res)
        }

        fetchProviders()
    }, []);


    return (
        providers ? (
            <div>
                {
                    Object.values(providers).map((provider: Provider, i) => (
                        <Button key={i} title='Sign In' handleClick={() => signIn(provider?.id)} />
                    ))
                }
            </div>
        ) : (
            <></>
        )
    );
};

export default AuthProviders;