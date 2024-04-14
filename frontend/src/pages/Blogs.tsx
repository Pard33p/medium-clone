import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return <div>loading...</div>
    }

    return <div>
        <AppBar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                {blogs.map(blog => <BlogCard
                    key={blog.id} 
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate="April 14, 2024"
                />)}
                
            </div>
        </div>
    </div>
}