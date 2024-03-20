import type { TBlog } from '@/types'
import Link from 'next/link'

const BlogCard = ({ blog }: { blog: TBlog }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card w-100">
        <img 
          src={blog.image} 
          className="card-img-top object-fit-cover"
          style={{ height: '13rem' }}
          alt="Blog" 
        />
        
        <div className="card-body">
          <h5 className="card-title">{blog.title}</h5>
          
          <Link 
            href={`/blogs/${blog.id}`} 
            className="btn btn-dark mt-2"
          >Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard