// web/src/pages/Blog/BlogPage/BlogPage.tsx

import { gql } from 'graphql-tag'

import { useParams } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

const QUERY = gql`
  query BlogQuery($id: Int!) {
    blog(id: $id) {
      id
      title
      htmlContent
      scrapedAt
    }
  }
`

const BlogPage = () => {
  const { id } = useParams()
  const { data, loading, error } = useQuery(QUERY, {
    variables: { id: parseInt(id) },
  })

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error loading blog.</div>
  }

  const { blog } = data

  return (
    <div>
      <h1>{blog.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: blog.htmlContent }} />
      <p>Scraped at: {new Date(blog.scrapedAt).toLocaleString()}</p>
    </div>
  )
}

export default BlogPage
