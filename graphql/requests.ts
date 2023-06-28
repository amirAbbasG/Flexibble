import {client, makeGraphqlRequest} from "@/lib/graphql-request";
import {
    createProjectMutation,
    createUserMutation, deleteProjectMutation,
    getProjectByIdQuery,
    getProjectsOfUserQuery,
    getUserQuery,
    projectsQuery, updateProjectMutation
} from "./queries";
import {ProjectForm} from "@/common.types";

const isProduction = process.env.NODE_ENV === "production"
const serverURl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000"

export const getUser = (email: string) => {
    return makeGraphqlRequest(getUserQuery, {email})
}

export const createUser = (email: string, name: string, avatarUrl: string) => {
    const variables = {
        input: {
            email, name, avatarUrl
        }
    }
    return makeGraphqlRequest(createUserMutation, variables)
}


export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverURl}/api/upload`, {
            method: "POST",
            body: JSON.stringify({
                path: imagePath,
            }),
        });
        return response.json();
    } catch (err) {
        throw err;
    }
};

export const createProject = async (form: ProjectForm, creatorId: string, token: string) => {
    try {
        const image = await uploadImage(form.image)
        console.log(image.url)

        const variables = {
            input: {
                ...form,
                image: image.url,
                createdBy: {
                    link: creatorId
                }
            }
        }

        if (image.url) {
            client.setHeader("Authorization", `Bearer ${token}`)
            return makeGraphqlRequest(createProjectMutation, variables)
        }
    } catch (e) {
        throw e
    }
}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverURl}/api/auth/token`)
        return response.json()
    } catch (e) {
        throw e
    }
}

export const fetchAllProjects = async (category?: string | null, endCursor?: string | null)=> {
    return makeGraphqlRequest(projectsQuery, {category, endCursor})
};

export const fetchProjectDetails = async (id: string) => {
    return makeGraphqlRequest(getProjectByIdQuery, {id})
}

export const getProjectsOfUser = async (id: string, last?: number) => {
    return makeGraphqlRequest(getProjectsOfUserQuery, {id, last})
}

export const deleteProject = async (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`)
    return makeGraphqlRequest(deleteProjectMutation, {id})
}

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
    function isBase64DataURL(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    }

    let updatedForm = { ...form };

    const isUploadingNewImage = isBase64DataURL(form.image);

    if (isUploadingNewImage) {
        const imageUrl = await uploadImage(form.image);

        if (imageUrl.url) {
            updatedForm = { ...updatedForm, image: imageUrl.url };
        }
    }

    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
        id: projectId,
        input: updatedForm,
    };

    return makeGraphqlRequest(updateProjectMutation, variables);
};