import { APIGatewayEvent, Context } from 'aws-lambda'

import { createBlogFromUrl } from 'src/services/blogs/blogs'

export const handler = async (event: APIGatewayEvent, _context: Context) => {
  try {
    // Check if it's a POST request
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      }
    }

    // Parse the request body
    const { url } = JSON.parse(event.body || '{}')

    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      }
    }

    // Call the existing service function
    const blog = await createBlogFromUrl({ url })

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blog),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
