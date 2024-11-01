// web/src/layouts/BlogLayout/BlogLayout.tsx

import { Link, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div>
      <header>
        <h1>
          <Link to={routes.home()}>My Blogs</Link>
        </h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; {new Date().getFullYear()} My Blogs</p>
      </footer>
    </div>
  )
}

export default BlogLayout
