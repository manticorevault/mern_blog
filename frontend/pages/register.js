import Layout from "../components/Layout";
import Link from "next/link";
import RegisterComponent from "../components/auth/RegisterComponent";

const Register = () => {
    return (
        <Layout>
            <h2> Register Page </h2>
            <RegisterComponent></RegisterComponent>
        </Layout>
    )
}

export default Register;