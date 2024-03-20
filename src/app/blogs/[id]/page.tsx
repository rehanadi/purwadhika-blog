import NotFound from "@/app/not-found"
import { BASE_URL } from "@/constants"

type Props = { 
  params: { 
    id: string 
  }
}

const fetchBlog = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs/${id}`, { next: { revalidate: 60 } })
    const data = await res.json()
    return data.blog
  } catch (error) {
    console.error(error)
  }
}

const BlogPage = async ({ params: { id } }: Props) => {
  const blog = await fetchBlog(id)

  if (!blog) return <NotFound />

  return (
    <section className='p-5'>
      <div className='container'>
        <div className="row">
          <div className="col-12">
            <h1>{blog.title}</h1>

            <figure className="text-center mt-5">
              <img src={blog.image} alt={blog.title} className="w-75" />
            </figure>

            <div className="mt-5">
              {blog?.content?.map((content: any) => {
                return content?.content?.map((content: any, index: number) => (
                  <p key={index}>
                    {content.value}
                  </p>
                ))
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogPage