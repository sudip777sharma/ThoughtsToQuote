import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DELETE_QUOTE, UPDATE_QUOTE } from '../graphqlOperations/mutations';
import { useMutation, useQuery } from '@apollo/client';
import { GET_QUOTE_BY_ID } from '../graphqlOperations/queries';

const EditDeleteQuote = () => {
    const updatedToken = localStorage.getItem('token');
    if (updatedToken === null) {
        window.location.href = '/login';
    }
    const [newQuote, setNewQuote] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    const { quoteId } = useParams();

    const { loading: loading2, error: error2, data: data2 } = useQuery(GET_QUOTE_BY_ID, {
        variables: {
            _id: quoteId
        },
        context: {
            headers: {
                authorization: updatedToken ? `${updatedToken}` : ''
            }
        }
    });

    useEffect(() => {
        if (data2?.quoteById) {
            setNewQuote(data2.quoteById.name);
        }
    }, [data2?.quoteById?.name])
    const [updateQuote, { loading, error }] = useMutation(UPDATE_QUOTE, {
        onCompleted: (data) => {
            console.log("data", data)
            window.location.href = '/profile';
        },
        onError: (error) => {
            console.log("error", error)
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
    const [deleteQuote, { loading: loading1, error: error1 }] = useMutation(DELETE_QUOTE, {
        onCompleted: (data) => {
            console.log("data", data)
            window.location.href = '/profile';
        },
        onError: (error) => {
            console.log("error", error)
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

    const handleSaveUpdate = () => {
        if (newQuote) {
            updateQuote({
                variables: {
                    quoteId: quoteId,
                    name: newQuote
                }
            });
        }
    }
    const handleConfirmDelete = () => {
        deleteQuote({
            variables: {
                quoteId: quoteId,
            }
        });
    }
    if (loading || loading1 || loading2) return <p>Loading...</p>
    if (error || error1 || error2) return <p>Error :{error.message}</p>
    return (
        <div
            style={{
                background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white', gap: '1rem', marginTop: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '55vh',
            }}
            className='container my-container'
        >
            {
                !isEdit && !isDelete &&
                <div
                    className='container my-container'
                    style={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '60vh', gap: '1rem',
                    }}
                >
                    <h5>{newQuote}</h5>
                    <button
                        className='btn btn-small blue'
                        onClick={() => setIsEdit((prev) => !prev)}
                    >Edit</button>
                    <button
                        className='btn btn-small red'
                        onClick={() => setIsDelete((prev) => !prev)}
                    >Delete</button>
                </div>
            }
            {
                isEdit && (
                    <div
                        style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem',
                        }}
                        className='container my-container'
                    >
                        <h5>Edit Quote!</h5>
                        <input
                            value={newQuote}
                            onChange={(e) => setNewQuote(e.target.value)}
                            type="text"
                        />
                        <button
                            className='btn btn-small green'
                            onClick={handleSaveUpdate}
                        >Save</button>
                        <button
                            className='btn btn-small red'
                            onClick={() => setIsEdit((prev) => !prev)}
                        >Cancel</button>
                    </div>
                )
            }
            {
                isDelete && (
                    <div
                        style={{
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem',
                        }}
                        className='container my-container'
                    >
                        <h5>Delete Quote!</h5>
                        <h5>{newQuote}</h5>
                        <button
                            className='btn btn-small green'
                            onClick={handleConfirmDelete}
                        >Confirm</button>
                        <button
                            className='btn btn-small red'
                            onClick={() => setIsDelete((prev) => !prev)}
                        >Cancel</button>
                    </div>
                )
            }
        </div>
    );
};

export default EditDeleteQuote;
