import type { FindBlogById } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { timeTag } from 'src/lib/formatters'

interface Props {
  blog: NonNullable<FindBlogById['blog']>
}

const Blog = ({ blog }: Props) => {
  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Blog {blog.id} Detail
        </h2>
      </header>
      <table className="rw-table">
        <tbody>
          <tr>
            <th>Id</th>
            <td>{blog.id}</td>
          </tr>
          <tr>
            <th>Source</th>
            <td>{blog.source}</td>
          </tr>
          <tr>
            <th>Url</th>
            <td>{blog.url}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{blog.title}</td>
          </tr>
          <tr>
            <th>Html content</th>
            <td>{blog.htmlContent}</td>
          </tr>
          <tr>
            <th>Scraped at</th>
            <td>{timeTag(blog.scrapedAt)}</td>
          </tr>
        </tbody>
      </table>
      <nav className="rw-button-group">
        <Link to={routes.blogs()} className="rw-button rw-button-blue">
          Back to Blogs
        </Link>
      </nav>
    </div>
  )
}

export default Blog
