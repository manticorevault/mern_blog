const RegisterComponent = () => {
    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Insert Your Name">

                    </input>
                </div>
            </form>
        )
    }

    return (
        { registerForm }
    )
}

export default RegisterComponent;