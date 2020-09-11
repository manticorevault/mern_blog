import Layout from "../components/Layout";
import RegisterComponent from "../components/auth/RegisterComponent";

const Register = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4"> Register </h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <RegisterComponent />
                </div>
            </div>
        </Layout>
    )
}

export default Register;