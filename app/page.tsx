import {FC} from "react";

import {ProjectInterface} from "@/common.types";
import {fetchAllProjects} from "@/graphql/requests";
import {ProjectCard} from "./shared-components";
import {Categories, LoadMore} from "./shared-components";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProjectSearch {
    projectSearch: {
        pageInfo: {
            hasNextPage: boolean,
            hasPreviousPage: boolean,
            startCursor: string,
            endCursor: string,
        },
        edges: { node: ProjectInterface }[]
    }
}

interface Props {
    searchParams: {
        category?: string | null,
        endcursor?: string | null
    }
}
const Home: FC<Props> = async ({searchParams: {category, endcursor}}) => {
    const {projectSearch} = await fetchAllProjects(category, endcursor) as ProjectSearch

    const projectsToDisplay = projectSearch?.edges || []


    return (
        <div className="flexStart flex-col paddings mb-16">
            <Categories/>
            {
                projectsToDisplay.length === 0 ? (
                    <p className="no-result-text text-center">No projects found, go create some first.</p>
                ) : (
                    <section className="projects-grid">
                        {projectsToDisplay.map(({node}: { node: ProjectInterface }) => (
                            <ProjectCard
                                key={`${node?.id}`}
                                id={node?.id}
                                image={node?.image}
                                title={node?.title}
                                name={node?.createdBy.name}
                                avatarUrl={node?.createdBy.avatarUrl}
                                userId={node?.createdBy.id}
                            />
                        ))}
                    </section>
                )
            }

            <LoadMore
                startCursor={projectSearch?.pageInfo?.startCursor}
                endCursor={projectSearch?.pageInfo?.endCursor}
                hasPreviousPage={projectSearch?.pageInfo?.hasPreviousPage}
                hasNextPage={projectSearch?.pageInfo.hasNextPage}
            />
        </div>
    )
}

export default Home