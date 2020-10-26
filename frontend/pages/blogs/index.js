import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout"
import { useState } from "react";
import { listAllPosts } from "../../actions/blog";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../../config";

const BlogPosts = ({ blogs, categories, tags, size }) => {

    const showAllBlogs = () => {

        return blogs.map((blog, i) => {

            return (
                <article key={i}>

                    <div className="lead pb-4">
                        <header>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a>
                                    <h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2>
                                </a>
                            </Link>
                        </header>
                        <section>
                            <p className="mark ml-1 pt-2 pb-2">
                                Escrito por {blog.postedBy.name} | Publicado {moment(blog.updatedAt).fromNow()}
                            </p>
                        </section>
                        <section>
                            <p>categorias e tags</p>
                        </section>

                        <div className="row">
                            <div className="col-md-4">imagem</div>
                            <div className="col-md-8">
                                <section>
                                    <div className="pb-3">
                                        {renderHTML(blog.excerpt)}
                                    </div>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <a className="btn btn-primary pt-2">Leia mais</a>
                                    </Link>
                                </section>
                            </div>
                        </div>
                    </div>
                    <hr />
                </article>
            );
        });
    };


    return (
        <Layout>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">
                                Blog com receitas direto da fazenda!
                                </h1>
                        </div>
                        <section>
                            <p> Mostrar Categorias e Tags </p>
                        </section>
                    </header>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {showAllBlogs()}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

BlogPosts.getInitialProps = () => {
    return listAllPosts().then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size
            }
        }
    })
}

export default BlogPosts;