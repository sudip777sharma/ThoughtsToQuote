import { useMutation } from '@apollo/client';
import React from 'react'
import { CREATE_QUOTE } from '../graphqlOperations/mutations';

const CreateQuote = () => {
    const updatedToken = localStorage.getItem('token');
    const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
        onCompleted: () => {
            window.location.href = '/profile';
        },
        refetchQueries: [
            'getAllQuotes',
            'getMyProfile',
        ],
        context: {
            headers: {
                authorization: updatedToken ? `${updatedToken}` : ''
            }
        }
    });
    const [quote, setQuote] = React.useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        createQuote({
            variables: {
                name: quote
            }
        });
    }
    if (loading) return <p>Loading...</p>
    return (
        <div
            className='container my-container'
            style={{
                background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white', gap: '1rem', marginTop: '3rem'
            }}
        >
            <h5>Create Quote!</h5>
            <form
                onSubmit={(e) => handleSubmit(e)}
                style={{
                    gap: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '30vh'
                }}
            >
                <input
                    type="text"
                    placeholder='convert your thoughts to quote'
                    name='quote'
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                />
                <button className='btn green'>create</button>
            </form>
            {
                error && <p className='red card-panel'>{error.message}</p>
            }
            {
                data && data.createQuote && <p className='green card-panel'>{data.createQuote}</p>
            }
        </div>
    )
}

export default CreateQuote
