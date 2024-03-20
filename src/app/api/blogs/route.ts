import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_BASE_URL, CONTENTFUL_ENVIRONMENT_ID, CONTENTFUL_SPACE_ID } from '@/constants'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // get blogs
    const resBlogs = await fetch(`${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}`)
    const dataBlogs = await resBlogs.json()

    let blogs = dataBlogs.items.map((blog: any) => {
      return {
        id: blog.sys.id,
        slug: blog.fields.slug,
        title: blog.fields.title,
        content: blog.fields.content.content,
        imageId: blog.fields.image.sys.id,
        image: ''
      }
    })

    // get blogs image
    for (let item of blogs) {
      const resImage = await fetch(`${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/assets/${item.imageId}?access_token=${CONTENTFUL_ACCESS_TOKEN}`)
      const dataImage = await resImage.json()
      const image = 'https:' + dataImage.fields.file.url

      blogs = blogs.map((blog: any) => {
        if (blog.id === item.id) {
          return { ...blog, image }
        } else {
          return blog
        }
      })
    }
    
    return NextResponse.json({ blogs }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 })
  }
}
