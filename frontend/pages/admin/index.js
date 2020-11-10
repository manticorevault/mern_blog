import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul class="list-group">

                                <li className="list-group-item">
                                    <Link href="/admin/manage/category-tag">
                                        <a>Criar Categoria</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/manage/category-tag">
                                        <a>Criar Tag</a>
                                    </Link>
                                </li>


                                <li className="list-group-item">
                                    <a href="/admin/manage/blog">
                                        Escreva um post!
                                    </a>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/admin/manage/blogs">
                                        <a>Atualizar/Deletar Posts</a>
                                    </Link>
                                </li>

                                <li className="list-group-item">
                                    <Link href="/user/update">
                                        <a>Atualizar Perfil</a>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="col-md-8">right</div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;