// api/src/services/blogs/blogs.ts

import { db } from 'src/lib/db'
import { scrapeCoinbaseBlog } from 'src/lib/scraper'

export const blogs = () => {
  return db.blog.findMany()
}

export const blog = ({ id }: { id: number }) => {
  return db.blog.findUnique({
    where: { id },
  })
}

export const createBlogFromUrl = async ({ url }: { url: string }) => {
  // Check if the blog already exists
  const existingBlog = await db.blog.findUnique({
    where: { url },
  })

  if (existingBlog) {
    console.log('Blog already exists')
    return existingBlog
  }

  // Scrape the blog content
  const content = await scrapeCoinbaseBlog(url)

  // Save to the database
  const newBlog = await db.blog.create({
    data: {
      source: 'coinbase',
      url,
      title: content.title,
      htmlContent: content.contentHTML,
    },
  })

  console.log('Successfully processed and saved blog')

  return newBlog
}
