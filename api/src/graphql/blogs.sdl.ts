export const schema = gql`
  type Blog {
    id: Int!
    source: String!
    url: String!
    title: String!
    htmlContent: String!
    scrapedAt: DateTime!
  }

  type Query {
    blogs: [Blog!]! @skipAuth
    blog(id: Int!): Blog @skipAuth
  }

  type Mutation {
    createBlogFromUrl(url: String!): Blog! @skipAuth
  }
`
