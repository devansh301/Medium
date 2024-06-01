import { SignupInput } from "@devanshrawat789/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export default function Auth({ type }: { type: "signup" | "signin" }) {
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${ ( type === "signup") ? "signup" : "signin"}`, postInputs);
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        } catch (e) {
            alert('Error while signin');
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="px-12">
                        <div className="text-3xl font-extrabold text-left">
                            { ( type === "signin" ) ? "LogIn" : "Create an account" }
                        </div>
                        <div className="text-slate-400">
                            { ( type === "signin") ? "Don't have an account?" : "Already have an account?"}
                            <Link to={ ( type === "signup") ? "/signin" : "/signup"} className="pl-2 underline">
                                { ( type === "signup") ? "Login" : "Register"}
                            </Link>
                        </div>
                    </div>
                    <div className="pt-4 space-y-3">
                        { ( type === "signup") ? <LabelledInput label="Name" type="text" placeholder="Enter you Name" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }} /> : null }
                        <LabelledInput label="Email" type="email" placeholder="example@gmail.com" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }} />
                        <LabelledInput label="Password" type="password" placeholder="Enter you password" onChange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }} />
                        <div className="pt-4">
                            <button onClick={sendRequest} type="button" className=" text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                                { (type === "signin") ? "Signin" : "Signup"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({ label, placeholder, type, onChange} : LabelledInputType) {
    return (
        <div >
            <label className="block mb-2 text-sm font-bold text-gray-900">{label}</label>
            <input onChange={onChange} type={type} id={label} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />        
        </div>
    );
}