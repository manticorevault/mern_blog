import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { listBlogs, removeBlog } from '../../actions/blog';
import moment from "moment"

const BlogRead = () => {

    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState("");
    const token = getCookie("token");

    useEffect(() => {
        loadBlogs()
    }, [])

    const loadBlogs = () => {
        listBlogs().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setBlogs(data)
            }
        })
    }

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const confirmDelete = (slug) => {
        let answer = window.confirm("Tem certeza que quer deletar esse post?")

        if (answer) {
            deleteBlog(slug)
        }
    }

    const showUpdateButton = (blog) => {

        // Button authorized for regular user. 
        // Change to 1 for Admin only.
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/manage/${blog.slug}`}>
                    <a className="btn btn-sm btn-warning">
                        Atualizar
                    </a>
                </Link>
            )
            // Now it authorizes the Admin
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/manage/${blog.slug}`}>
                    <a className="btn btn-sm btn-warning ml-2">
                        Atualizar
                    </a>
                </Link>
            )
        }
    }

    const showAllBlogs = () => {
        return blogs.map((blog, index) => {
            return (
                <div key={index} className="pb-5">
                    <h3>
                        {blog.title}
                    </h3>

                    <p className="mark">
                        Escrito por {blog.postedBy.name} | Publicado em {moment(blog.updatedAt).fromNow()}
                    </p>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => confirmDelete(blog.slug)}
                    >
                        Deletar
                    </button>
                    {showUpdateButton(blog)}
                </div>
            )
        })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllBlogs()}
                </div>
            </div>
        </React.Fragment>
    )
}

export default BlogRead;