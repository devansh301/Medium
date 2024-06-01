import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Publish() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const navigate = useNavigate();
    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div className="max-w-screen-lg w-full pt-8">
                    <input onChange={(e) => {
                        setTitle(e.target.value);
                    }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " placeholder="Title" />
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value);
                    }}/>
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ onChange } : { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void } ) {
    return (
        <div>
            <div className=" rounded-lg w-full my-4">
                <div className=" rounded-lg py-2 flex items-center justify-between border">
                    <div className="py-2 w-full bg-white rounded-b-lg">
                    <label className="sr-only">Publish post</label>
                    <textarea onChange={onChange} id="editor" rows={9} className="focus:outline-none pl-2 block w-full px-0 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required />
                </div>
            </div>
            </div>
        </div>

    );
}