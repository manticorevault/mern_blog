import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout"
import { useState } from "react";
import { listAllPosts } from "../../actions/blog";
import { API } from "../../config";

const BlogPosts = ({ blogs, categories, tags, size }) => {
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
                            {JSON.stringify(blogs)}
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