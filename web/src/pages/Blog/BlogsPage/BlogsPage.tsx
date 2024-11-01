// web/src/pages/Blog/BlogsPage/BlogsPage.tsx

import { gql } from 'graphql-tag'

import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'

const QUERY = gql`
  query BlogsQuery {
    blogs {
      id
      title
      scrapedAt
    }
  }
`

const BlogsPage = () => {
  const { data, loading, error } = useQuery(QUERY)

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error loading blogs.</div>
  }

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {data.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={routes.blog({ id: blog.id })}>
              {blog.title} (Scraped at:{' '}
              {new Date(blog.scrapedAt).toLocaleString()})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogsPage
