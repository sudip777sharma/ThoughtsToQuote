import { useMutation } from '@apollo/client';
import React from 'react'
import { Link } from 'react-router-dom';
import { SIGNUP_USER } from '../graphqlOperations/mutations';

const Signup = () => {

    const [signupUser, { loading, error, data }] = useMutation(SIGNUP_USER);

    const [formData, setFormData] = React.useState({});
    const handleChange = (e) => {
        setFormData((formData) => {
            return {
                ...formData,
                [e.target.name]: e.target.value
            };
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signupUser({
            variables: {
                userNew: formData
            }
        });
    }

    if (loading) return <p>Loading...</p>
    return (
        <div className='container'
            style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white', gap: '1rem', marginTop: '1rem', height: 'fit-content'
            }}
        >
            <h5>Signup!</h5>
            <form onSubmit={(e) => handleSubmit(e)}
                style={{
                    gap: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}
            >
                <input
                    type="text"
                    placeholder='enter your first name'
                    name='firstName'
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder='enter your last name'
                    name='lastName'
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    placeholder='enter your email'
                    name='email'
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder='enter your password'
                    name='password'
                    onChange={handleChange}
                    required
                />
                <button className='btn'>signup</button>
            </form>
            <Link to='/login'>Already have an account? Login!</Link>
            {
                error && <p className='red card-panel'>{error.message}</p>
            }
            {
                data && data.user && <p className='green card-panel'>{data.user.firstName} User signedUp successfully!. you can login now.</p>
            }
        </div>
    )
}

export default Signup
