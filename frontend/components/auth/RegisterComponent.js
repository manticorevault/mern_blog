const { useState } from "react"


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

    const handleSubmit = e => {
        e.preventDefault()
        console.log("Submit handled")
    }

    const handleChange = e => {
        console.log(e.target.value)
    }

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        onChange={ handleChange }
                        type="text" 
                        className="form-control"
                        placeholder="Insert Your Name">

                    </input>

                    <input 
                        onChange={ handleChange }
                        type="email" 
                        className="form-control"
                        placeholder="Insert Your Email">

                    </input>

                    <input 
                        onChange={ handleChange }
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