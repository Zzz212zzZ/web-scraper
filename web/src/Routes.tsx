// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import BlogLayout from './layouts/BlogLayout/BlogLayout'
import BlogPage from './pages/Blog/BlogPage/BlogPage'
import BlogsPage from './pages/Blog/BlogsPage/BlogsPage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={BlogLayout}>
        <Route path="/blogs/{id:Int}" page={BlogPage} name="blog" />
        <Route path="/blogs" page={BlogsPage} name="blogs" />
        <Route path="/" page={BlogsPage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
