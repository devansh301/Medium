import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({id} : {id: string}) => {
  const [loading,setLoading] = useState<boolean>(true);
  const [blog,setBlog] = useState<Blog>();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      }
    }).then((response) => {
      setBlog(response.data.blog);
      setLoading(false);
    })
  }, [id]);
  return {
    blog,
    loading
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};