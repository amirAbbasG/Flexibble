export const getUserQuery = `
    query GetUser($email: String!) {
           user(by: {email: $email}) {
                id
                name
                avatarUrl
                description
                githubUrl
                linkedinUrl
                email
           }
    }
`

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!){
         userCreate(input: $input) {
            user {
              email
              name
              avatarUrl
              description
              githubUrl
              linkedinUrl
              id
            }
         }
    }
`

export const createProjectMutation = `
mutation ProjectCreate($input: ProjectCreateInput!) {
  projectCreate(input: $input) {
    project {
      id
      title
      description
      createdBy {
        name
        email
      }
    }
  }
}
`

export const updateProjectMutation = `
    mutation ProjectUpdate($id: ID!, $input: ProjectUpdateInput!) {
        projectUpdate(by: {id: $id}, input: $input) {
             project {
                id
                title
                description
                createdBy {
                    name
                    email
                }
            }
        }
    }
`

export const deleteProjectMutation = `
    mutation ProjectDelete($id: ID!) {
        projectDelete(by: {id: $id}){
            deletedId
        }
    }
`

export const getProjectByIdQuery = `
    query GetProjectById($id: ID!) {
        project(by: { id: $id }) {
            id
            title
            description
            image
            liveSiteUrl
            githubUrl
            category
            createdBy {
              id
              name
              email
              avatarUrl
            }
        }
    }
`;

export const projectsQuery = `
  query getProjects($category: String, $endcursor: String) {
    projectSearch(first: 8, after: $endcursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
          }
        }
      }
    }
  }
`;