import { useState } from "react";


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
        console.log("Submit handled")
    }

    const handleChange = name = e => {
        setValues({...values, error: false, [name]: e.target.value
        });
    }

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
            { registerForm() }
        </React.Fragment>
    )
}

export default RegisterComponent;