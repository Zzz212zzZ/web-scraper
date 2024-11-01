import type { FindBlogs, FindBlogsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Blogs from 'src/components/Blog/Blogs'

export const QUERY: TypedDocumentNode<FindBlogs, FindBlogsVariables> = gql`
  query FindBlogs {
    blogs {
      id
      source
      url
      title
      htmlContent
      scrapedAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No blogs yet.{' '}
      <Link to={routes.newBlog()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindBlogs>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  blogs,
}: CellSuccessProps<FindBlogs, FindBlogsVariables>) => {
  return <Blogs blogs={blogs} />
}
