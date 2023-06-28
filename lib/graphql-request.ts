import {GraphQLClient} from "graphql-request"

const isProduction = process.env.NODE_ENV === "production"

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRFBASE_API_ENDPOINT || "" : "http://127.0.0.1:4000/graphql"
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRFBASE_API_KEY || "" : "1234"
const serverURl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:3000"

export const client = new GraphQLClient(apiUrl)

export const makeGraphqlRequest = async (query: string, variables = {}) => {
    try {
        client.setHeader("x-api-key", apiKey);
        return await client.request(query, variables)
    } catch (e) {
        throw(e)
    }
}