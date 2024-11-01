import type { FindBlogs } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { timeTag, truncate } from 'src/lib/formatters'

const BlogsList = ({ blogs }: FindBlogs) => {
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Source</th>
            <th>Url</th>
            <th>Title</th>
            <th>Html content</th>
            <th>Scraped at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{truncate(blog.id)}</td>
              <td>{truncate(blog.source)}</td>
              <td>{truncate(blog.url)}</td>
              <td>{truncate(blog.title)}</td>
              <td>{truncate(blog.htmlContent)}</td>
              <td>{timeTag(blog.scrapedAt)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.blog({ id: blog.id })}
                    title={'Show blog ' + blog.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BlogsList
