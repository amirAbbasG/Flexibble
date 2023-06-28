"use client"

import React, {FC, ReactNode, useCallback, useRef, MouseEvent} from 'react';

import {useRouter} from "next/navigation";
import Image from "next/image";

interface Props {
    children: ReactNode | ReactNode[]
}

const Modal: FC<Props> = ({children}) => {
    const router = useRouter()
    const overlay = useRef<HTMLDivElement>(null)
    const wrapper = useRef<HTMLDivElement>(null)

    const handleDismiss = useCallback(() => {
        router.push("/")
    }, [router])

    const handleClickOverlay = useCallback(
        (e: MouseEvent) => {
            if(e.target === overlay.current) {
                handleDismiss()
            }
        },
        [handleDismiss, overlay],
    );

    return (
        <div ref={overlay} className="modal" onClick={handleClickOverlay}>
            <button className="absolute right-8 top-16 z-30" onClick={handleDismiss}>
                <Image src="/close.svg" alt="close icon" width={20} height={20}/>
            </button>
            <div ref={wrapper} className="modal_wrapper">
                {children}
            </div>
        </div>
    );
};

export default Modal;