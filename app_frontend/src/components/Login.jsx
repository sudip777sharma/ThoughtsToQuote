import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../graphqlOperations/mutations';
import { useMutation, } from '@apollo/client';
const Login = () => {
    const navigate = useNavigate();
    const [signinUser, { loading, error, data }] = useMutation(LOGIN_USER, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.user.token);
            // const updatedToken = data.user.token;
            navigate('/profile');
        },
        onError: (error) => {
            console.log("unable to setItem to local storage", error);
        },
    });
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
        signinUser({
            variables: {
                userSignin: formData
            }
        });
    }
    if (loading) return <p>Loading...</p>
    if (data) {
        console.log("data", data);
    }

    return (
        <div
            className='container my-container'
            style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white', gap: '1rem', marginTop: '3rem', height: '60vh'
            }}
        >
            <h5>Login!</h5>
            <form onSubmit={(e) => handleSubmit(e)}
                style={{
                    gap: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}
            >
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
                <button className='btn'>login</button>
            </form>
            <Link to='/signup'>Dont have an account? Signup!</Link>
            {
                error && <p className='red card-panel'>{error.message}</p>
            }
        </div>
    )
}

export default Login
