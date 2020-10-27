import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout"
import Card from "../../components/blog/Card"
import { useState } from "react";
import { listAllPosts } from "../../actions/blog";

const BlogPosts = ({ blogs, categories, tags, size }) => {

    const showAllBlogs = () => {

        return blogs.map((blog, index) => {

            return (
                <article key={index}>
                    <Card blog={blog} />
                    <hr />
                </article>
            );
        });
    };

    const showAllCategories = () => {

        return categories.map((category, index) => (
            <Link href={`/categories/${category.slug}`} key={index}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">
                    {category.name}
                </a>
            </Link>
        ))
    }

    const showAllTags = () => {

        return tags.map((tag, index) => (
            <Link href={`/tags/${tag.slug}`} key={index}>
                <a className="btn btn-outline-info mr-1 ml-1 mt-3">
                    {tag.name}
                </a>
            </Link>
        ))
    }


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
                            <div className="pb-5 text-center">
                                {showAllCategories()}
                                <br />
                                {showAllTags()}
                            </div>
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