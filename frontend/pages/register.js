import Layout from "../components/Layout";
import Link from "next/link";

const Register = () => {
    return (
        <Layout>
            <h2> Register Page </h2>
            <Link href="/"> 
                <a> Home </a>
            </Link>
        </Layout>
    )
}

export default Register;