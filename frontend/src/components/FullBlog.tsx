import axios from "axios";
import { BACKEND_URL } from "../config";
import { Blog } from "../hooks";
import Appbar from "./Appbar"
import { Avatar } from "./BlogCard";
import { useNavigate } from "react-router-dom";

export default function FullBlog({ blog }: { blog: Blog }) {
    const navigate = useNavigate();
    return (<div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 5th Jan 2022
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 px-12">
                    <div className="text-slate-600 text-lg font-semibold">
                        Author
                    </div>
                    <div className="flex w-full pt-4">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                Random catch phrase about the author's ability to grabbb the user's attention
                            </div>
                        </div>
                    </div>
                    {localStorage.getItem('userId')==blog.authorId && 
                    <div className="py-10">
                            <button onClick={() => {
                                navigate('/update', { state: { blogTitle: blog.title, blogContent: blog.content, blogId: blog.id }});
                            }}
                             type="button" className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2">
                                Update
                            </button>
                        <button onClick={async () => {
                            try {
                                await axios.delete(`${BACKEND_URL}/api/v1/blog/${blog.id}`, {
                                headers: {
                                    Authorization: localStorage.getItem("token"),
                                }
                            });
                            navigate("/blogs");
                            }
                            catch (e) {
                                alert("You are not author of this blog");
                            }
                        }} type="button" className="mr-4 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-md px-5 py-2.5 text-center me-2 mb-2">
                            Delete
                        </button>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>
    );
}
