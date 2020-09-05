const RegisterComponent = () => {
    const handleSubmit = () => {
        e.preventDefault()
        console.log("Submit handled")
    }

    const handleChange = (e) => {
        event.preventDefault()
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