import React, {FC} from 'react';

import {redirect} from "next/navigation";

import {getCurrentUser} from "@/lib/session";
import {Modal} from "@/app/shared-components";
import ProjectForm from "@/app/create-project/ProjectForm";
import {fetchProjectDetails} from "@/graphql/requests";
import {ProjectInterface} from "@/common.types";

interface Props {
    params: {
        id: string
    }
}
const EditProject: FC<Props> = async ({params: {id}}) => {
    const session = await getCurrentUser()

    if (!session.user) redirect("/")

    const result = await fetchProjectDetails(id) as { project?: ProjectInterface };

    if (!result?.project) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )


    return (
        <Modal>
            <h3 className="modal-head-text">Create a New Project</h3>
            <ProjectForm type="edit" session={session} project={result.project}/>
        </Modal>
    );
};

export default EditProject;