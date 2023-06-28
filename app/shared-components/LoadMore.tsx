"use client"
import React, {FC} from 'react';

import {useRouter} from "next/navigation";

import {Button} from "./";

interface Props {
    startCursor: string
    endCursor: string
    hasPreviousPage: boolean
    hasNextPage: boolean
}


const LoadMore: FC<Props> = ({endCursor, startCursor, hasNextPage, hasPreviousPage}) => {
    const router = useRouter()

    const handleNavigation = (direction: string) => {
        const currentParams = new URLSearchParams(window.location.search)

        if (direction === "prev" && hasPreviousPage) {
            currentParams.delete("endcursor")
            currentParams.set("startcursor", startCursor)
        }
        if (direction === "next" && hasNextPage) {
            currentParams.delete("startcursor")
            currentParams.set("endcursor", endCursor)
        }

        const newParams = currentParams.toString()

        const newPathname = `${window.location.pathname}?${newParams}`
        router.push(newPathname)
    }

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <Button title="First Page" handleClick={() => handleNavigation('prev')} />
            )}
            {hasNextPage && (
                <Button title="Next Shots" handleClick={() => handleNavigation('next')} />
            )}
        </div>
    );
};

export default LoadMore;