import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import BlogUpdate from "../../../components/manage/BlogUpdate";
import Link from "next/link";

const Blog = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Edite ou atualize esse post</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogUpdate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Blog;