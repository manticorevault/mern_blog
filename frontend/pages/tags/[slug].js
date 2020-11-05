import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { singleTag } from '../../actions/tag';
import { API, DOMAIN, APP_NAME } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Tag = ({ tag, blogs, query }) => {

    const head = () => (
        <Head>
            <title>
                {tag.name} | {APP_NAME}
            </title>

            <meta name="description" content={`As melhores receitas ${tag.name} direto da fazenda`} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${tag.name} | ${APP_NAME}`} />
            <meta property="og:description" content={`As melhores receitas ${tag.name} direto da fazenda`} />
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
                                <h1 className="display-4 font-weight-bold">{tag.name}</h1>
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

Tag.getInitialProps = async ({ query }) => {
    const data = await singleTag(query.slug);
    if (data.error) {
        console.log(data.error);
    } else {
        return { tag: data.tag, blogs: data.blogs, query };
    }
};

export default Tag;