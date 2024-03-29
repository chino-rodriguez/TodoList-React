import auth from '../hooks/auth';
import Error from './Error';


function Register() {
    const { values, handleChange, handleKeyDown, handleSubmit, error } = auth({
        initialValues: {
            username: '',
            password: '',
        },
        slug: 'api/users/register'
    });

    return (
        <div className="card-shadow">
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
                {/* Heading */}
                <h5 className="card-title display-4 fw-bold my-2">Register</h5>

                {/* Login form */}
                <form action="#" method="POST" onSubmit={handleSubmit}>

                    {/* Username input */}
                    <div className="mb-3 text-center">
                        <label htmlFor="username" name="username" className='form-label h4'>Username</label>
                        <input type="text" className="form-control" placeholder="Username" id="username" name="username" value={values.username} onChange={handleChange} onKeyDown={handleKeyDown} required />
                    </div>

                    {/* Password input */}
                    <div className="mb-3 text-center">
                        <label htmlFor="password" name="password" className='form-label h4'>Password</label>
                        <input type="password" className="form-control" placeholder="Password" id="password" name="password" value={values.password} onChange={handleChange} onKeyDown={handleKeyDown} required />
                    </div>

                    {/* Submit button */}
                    <button className="btn btn-primary mb-3">Register</button>
                </form>

                {/* Error message if there is one */}
                {error && <Error error={error.messages} />}
            </div>
        </div>
    )
}

export default Register;