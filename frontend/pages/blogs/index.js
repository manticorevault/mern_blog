import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout"
import Card from "../../components/blog/Card"
import { useState } from "react";
import { listAllPosts } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config"

const BlogPosts = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

    const head = () => (
        <Head>
            <title>
                Blog de receitas! | {APP_NAME}
            </title>

            <meta name="description" content="Blog de Receitas direto da fazenda com sobremesas vegetarianas e pratos criativos" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`As melhores receitas direto da fazenda | ${APP_NAME}`} />
            <meta property="og:description" content="Blog de Receitas direto da fazenda com sobremesas vegetarianas e pratos criativos" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content="../../static/images/fazenda.jpeg" />
            <meta property="og:image:secure_url" content="../../static/images/fazenda.jpeg" />
            <meta property="og:image:type" content="../../static/images/fazenda.jpeg" />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    )

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit
        listAllPosts(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg" >
                    Carregar mais
                </button>
            )
        )
    }

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

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, index) => (

            <article key={index}>
                <Card blog={blog} />
            </article>
        ))
    }


    return (
        <React.Fragment>
            { head()}
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
                        {showAllBlogs()}
                    </div>

                    <div className="container-fluid">
                        {showLoadedBlogs()}
                    </div>

                    <div className="text-center pt-5 pb-5">
                        {loadMoreButton()}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
}

BlogPosts.getInitialProps = () => {

    let skip = 0;
    let limit = 4;

    return listAllPosts(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            }
        }
    })
}

export default withRouter(BlogPosts);