import { useState } from "react";
import { register } from "../../actions/auth";


const RegisterComponent = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        loading: false,
        message: "",
        showForm: true
    })

    const {name, email, password, error, loading, message, showForm} = values

    const handleSubmit = e => {
        e.preventDefault()
        setValues({...values, loading: true, error: false})
        const user = { name, email, password } 

        register(user)
            .then(data => {
                if(data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, 
                                name: "", 
                                email: "", 
                                password: "", 
                                error: "", 
                                loading: false, 
                                message: data.message,
                                showForm: false
                            })
                }
            })
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

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        value={ name }
                        onChange={ handleChange("name") }
                        type="text" 
                        className="form-control"
                        placeholder="Insert Your Name">

                    </input>

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
                        Register! 
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
            { showForm && registerForm() }
        </React.Fragment>
    )
}

export default RegisterComponent;