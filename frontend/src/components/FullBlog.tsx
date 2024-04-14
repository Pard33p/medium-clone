import { AppBar } from "./AppBar"
import { Blog } from "../hooks" 
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}: {blog: Blog}) => {
    return <div>
        <AppBar />
        <div className="grid grid-cols-12 px-10 w-full pt-200">
        <div className="col-span-8">
            <div className="text-3xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">Posted on April 14th, 2024</div>
            <div className="pt-4">{blog.content}</div>
        </div>
        <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                    <Avatar name={blog.author.name} />
                </div>
                <div>
                    <div className="text-xl font-bold">{blog.author.name}</div>
                    <div className="pt-2 text-slate-500">Random catch phrase about author</div>
                </div>
            </div>
        </div>
        
    </div>
    </div>
    
}