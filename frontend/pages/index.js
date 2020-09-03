import Layout from "../components/Layout";
import  Link  from "next/link";

const Index = () => {
    return (
        <Layout>
            <h2> Index Page </h2>
            <Link href="/register">
                <a> Register </a>
            </Link>
        </Layout>
    )
}

export default Index;