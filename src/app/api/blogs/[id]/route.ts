import { CONTENTFUL_ACCESS_TOKEN, CONTENTFUL_BASE_URL, CONTENTFUL_ENVIRONMENT_ID, CONTENTFUL_SPACE_ID } from '@/constants'
import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // get blog
    const id = params.id
    const resBlog = await fetch(`${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/entries/${id}?access_token=${CONTENTFUL_ACCESS_TOKEN}`)
    const dataBlog = await resBlog.json()

    let blog = {
      id: dataBlog.sys.id,
      slug: dataBlog.fields.slug,
      title: dataBlog.fields.title,
      content: dataBlog.fields.content.content,
      imageId: dataBlog.fields.image.sys.id,
      image: ''
    }

    // get blog image
    const resImage = await fetch(`${CONTENTFUL_BASE_URL}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT_ID}/assets/${blog.imageId}?access_token=${CONTENTFUL_ACCESS_TOKEN}`)
    const dataImage = await resImage.json()
    const image = 'https:' + dataImage.fields.file.url

    blog = { ...blog, image }
    
    return NextResponse.json({ blog }, { status: 200 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 })
  }
}
