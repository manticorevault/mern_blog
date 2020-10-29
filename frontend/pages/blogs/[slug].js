import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout"
import { useState } from "react";
import renderHTML from "react-render-html"
import moment from "moment"
import { singleBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config"

const SingleBlog = ({ blog }) => {

    const showCategories = blog =>

        blog.categories.map((category, index) => (
            <Link key={index} href={`/categories/${category.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {category.name}
                </a>
            </Link>
        ))

    const showTags = blog =>

        blog.tags.map((tag, index) => (
            <Link key={index} href={`/tags/${tag.slug}`}>
                <a className="btn btn-outline-info mr-1 ml-1 mt-3">
                    {tag.name}
                </a>
            </Link>
        ))

    return (
        <React.Fragment>
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{ marginTop: "-30px" }}>

                                    <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid featured-image" />

                                </div>
                            </section>

                            <section>
                                <p className="lead mt-3 mark">
                                    Escrito por {blog.postedBy.name} | Publicado {moment(blog.updatedAt).fromNow()}
                                </p>

                                <div className="pb-3">

                                    {showCategories(blog)}
                                    {showTags(blog)}
                                    <br />
                                    <br />

                                </div>
                            </section>
                        </div>

                        <div className="container pb-5">
                            <section>
                                <div className="col-md-12 lead">
                                    {renderHTML(blog.body)}
                                </div>
                            </section>
                        </div>


                        <div className="container pb-5">
                            <h4 className="text-center pt-5 pb-5 h2">
                                Voce Tambem Pode Gostar
                            </h4>

                            <hr />

                            <p> Mostrar Mais Relacionados</p>
                        </div>

                        <div className="container pb-5">
                            <p> Mostrar Comentarios</p>
                        </div>

                    </article>
                </main>
            </Layout>
        </React.Fragment >
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { blog: data };
        }
    });
};

export default SingleBlog;