import { useState } from "react";
import { login } from "../../actions/auth";
import Router from "next/router";


const LoginComponent = () => {
    const [values, setValues] = useState({
        email: "artur@email.com",
        password: "123123",
        error: "",
        loading: false,
        message: "",
        showForm: true
    })

    const { email, password, error, loading, message, showForm } = values

    const handleSubmit = e => {
        e.preventDefault();

        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        login(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // Save user token to cookie
                // Save user info to localstorage
                // Authenticate user
                Router.push(`/`);
            }
        });
    };

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value
        });
    }

    const showLoading = () => (
        loading ? <div className="alert alert-info"> Loading </div> : ""
    );

    const showError = () => (
        error ? <div className="alert alert-danger"> { error } </div> : ""
    );

    const showMessage = () => (
        message ? <div className="alert alert-info"> { message } </div> : ""
    );

    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">

                    <input 
                        value={ email }
                        onChange={ handleChange("email") }
                        type="email" 
                        className="form-control"
                        placeholder="Insert Your Email">

                    </input>

                    <input 
                        value={ password }
                        onChange={ handleChange("password") }
                        type="password" 
                        className="form-control"
                        placeholder="Insert Your Password">

                    </input>
                </div>

                <div>
                    <button className="btn btn-primary">
                        Login
                    </button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            { showError () }
            { showLoading() }
            { showMessage() } 
            { showForm && loginForm() }
        </React.Fragment>
    )
}

export default LoginComponent;