import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import { API, DOMAIN, APP_NAME } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs, query }) => {

    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>

            <meta name="description" content={`As melhores receitas ${category.name} direto da fazenda`} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
            <meta property="og:description" content={`As melhores receitas ${category.name} direto da fazenda`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blogs.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blogs.slug}`} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    )

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                                {blogs.map((blog, index) => (
                                    <div>
                                        <Card key={index} blog={blog} />
                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Category.getInitialProps = async ({ query }) => {
    const data = await singleCategory(query.slug);
    if (data.error) {
        console.log(data.error);
    } else {
        return { category: data.category, blogs: data.blogs, query };
    }
};

export default Category;