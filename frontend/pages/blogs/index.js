import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout"
import { useState } from "react";
import { listAllPosts } from "../../actions/blog";
import { API } from "../../config";

const BlogPosts = () => {
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
                            Mostrar todos os posts
                            </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}

export default BlogPosts;