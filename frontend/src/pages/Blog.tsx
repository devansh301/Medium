import { useBlog } from "../hooks";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
import Appbar from "../components/Appbar";
import { useParams } from "react-router-dom";

export default function Blog() {
    const { id } = useParams();
    const { loading, blog } = useBlog({id: id || ""});

    if (loading) {
        return <div>
            <Appbar />
            <div className="h-screen flex flex-col justify-center">
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }

    if (!blog) {
        return (
            <div>
                <Appbar />
                <div className="h-screen flex flex-col justify-center">
                    <div className="flex justify-center">
                        <p>Blog not found</p>
                    </div>
                </div>
            </div>
        );
    }

    return <div>
        <FullBlog blog={blog} />
    </div>
}