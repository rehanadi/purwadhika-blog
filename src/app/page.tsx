import { TBlog } from '@/types'
import BlogCard from '@/components/BlogCard'
import { BASE_URL } from '@/constants'

const fetchBlogs = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs`)
    const data = await res.json()
    return data.blogs
  } catch (error) {
    console.error(error)
  }
}

const Home = async () => {
  const blogs = await fetchBlogs()

  return (
    <section className='p-5'>
      <div className='container'>
        <div className="row row-gap-4">
          {blogs?.map((blog: TBlog) => (
            <BlogCard blog={blog} key={blog.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home