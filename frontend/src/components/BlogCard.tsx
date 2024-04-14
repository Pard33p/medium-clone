import { Link } from "react-router-dom";

interface BlogCardProps {
    id: string;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col"><Avatar name={authorName} /> </div>
                <div className="font-extralight pl-2">{authorName}</div>
                <div className="flex justify-center flex-col ml-2"><Circle /></div> 
                <div className="fonr-thin pl-2 text-slate-400">{publishedDate}</div>
            </div>
            <div className="text-xl font-semibold">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {Math.ceil(content.length / 100) + " min read"}
            </div>
        </div>
    </Link>
}

export const Avatar = ({ name }: {name: string}) => {
    return <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xs text-gray-600 dark:text-gray-300">{name[0]}</span>
        </div>
}

const Circle = () => {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}