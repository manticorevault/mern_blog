import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout"
import { userPublicProfile } from "../../actions/user"
import moment from "moment"
import { API, DOMAIN, APP_NAME } from "../../config"

const UserProfile = () => {
    return (
        <React.Fragment>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">

                                    <h5>
                                        USERNAME
                                    </h5>

                                    <p>
                                        User Information
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default UserProfile