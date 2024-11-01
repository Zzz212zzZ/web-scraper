import type { FindBlogById, FindBlogByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Blog from 'src/components/Blog/Blog'

export const QUERY: TypedDocumentNode<FindBlogById, FindBlogByIdVariables> =
  gql`
    query FindBlogById($id: Int!) {
      blog: blog(id: $id) {
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

export const Empty = () => <div>Blog not found</div>

export const Failure = ({ error }: CellFailureProps<FindBlogByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  blog,
}: CellSuccessProps<FindBlogById, FindBlogByIdVariables>) => {
  return <Blog blog={blog} />
}
