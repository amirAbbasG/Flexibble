"use client"
import {ChangeEvent, FC, FormEvent, useState} from 'react';

import Image from "next/image";
import {useRouter} from "next/navigation";

import {ProjectInterface, SessionInterface} from "@/common.types";
import FormField from "./FormField";
import {categoryFilters} from "@/constant";
import CustomMenu from "@/app/create-project/CustomMenu";
import {Button} from "@/app/shared-components";
import {createProject, fetchToken, updateProject} from "@/graphql/requests";

interface Props {
    type: string,
    session: SessionInterface,
    project?: ProjectInterface
}

const ProjectForm: FC<Props> = ({type, session, project}) => {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
            title: project?.title || "",
            description: project?.description || "",
            image: project?.image || "",
            liveSiteUrl: project?.liveSiteUrl || "",
            githubUrl: project?.githubUrl || "",
            category: project?.category || ""
        }
    );

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault()

        setIsSubmitting(true)
        try {
            const {token} = await fetchToken()

            if (type === "create") {
                await createProject(form, session?.user?.id, token)
            }

            if (type === "edit") {
                await updateProject(form, project?.id!, token)
            }

            router.push("/")
        } catch (e) {
            console.log(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.includes("image")) {
            return alert("Please upload an image file")
        }

        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            const result = reader.result as string
            handleStateChange("image", result)
        }
    }

    const handleStateChange = (fieldName: string, value: string) => {
        setForm({...form, [fieldName]: value})
    }


    return (
        <form
            onSubmit={handleFormSubmit}
            className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    required={type === "create"}
                    className="form_image-input"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>

            <FormField
                title="Title"
                state={form.title}
                placeholder="Flexibble"
                setState={(value) => handleStateChange('title', value)}
            />

            <FormField
                title='Description'
                state={form.description}
                placeholder="Showcase and discover remarkable developer projects."
                isTextArea
                setState={(value) => handleStateChange('description', value)}
            />

            <FormField
                type="url"
                title="Website URL"
                state={form.liveSiteUrl}
                placeholder="https://jsmastery.pro"
                setState={(value) => handleStateChange('liveSiteUrl', value)}
            />

            <FormField
                type="url"
                title="GitHub URL"
                state={form.githubUrl}
                placeholder="https://github.com/adrianhajdin"
                setState={(value) => handleStateChange('githubUrl', value)}
            />

            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />

            <div className="flexStart w-full">
                <Button
                    title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
                    type="submit"
                    leftIcon={isSubmitting ? "" : "/plus.svg"}
                    submitting={isSubmitting}
                />
            </div>
        </form>
    );
};

export default ProjectForm;