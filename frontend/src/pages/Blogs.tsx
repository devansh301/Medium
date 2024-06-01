import BlogCard from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import Appbar from './../components/Appbar';


export default function Blogs() {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center w-full">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
            
        </div>
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {blogs.map(blog => <BlogCard
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        content={blog.content}
                        author={blog.author.name || "Anonymous"}
                        publishedDate={"2nd June 2024"}
                    />)}
                </div>
            </div>
        </div>
    );
}