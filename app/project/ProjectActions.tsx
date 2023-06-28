"use client"
import React, {FC, useState} from 'react';

import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";

import {deleteProject, fetchToken} from "@/graphql/requests";

interface Props {
    projectId: string
}
const ProjectActions: FC<Props> = ({projectId}) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteProject = async () => {
        setIsDeleting(true)
        try {
            const {token} = await fetchToken()

            await deleteProject(projectId, token)
            router.push("/")
        }catch (e) {
            console.log(e)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <>
            <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
                <Image src="/pencile.svg" width={15} height={15} alt="edit" />
            </Link>

            <button
                type="button"
                disabled={isDeleting}
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                onClick={handleDeleteProject}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
        </>
    );
};

export default ProjectActions;