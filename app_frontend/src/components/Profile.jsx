import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../graphqlOperations/queries";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiTwotoneEdit } from 'react-icons/ai';
const Profile = () => {
    const [quotes, setQuotes] = React.useState([]);
    const updatedToken = localStorage.getItem('token');
    if (updatedToken === null) {
        window.location.href = '/login';
    }
    const { loading, error, data } = useQuery(GET_MY_PROFILE,
        {
            context: {
                headers: {
                    authorization: updatedToken ? `${updatedToken}` : ''
                }
            }
        }
    );
    const loadData = () => {
        if (data?.myprofile) {
            setQuotes(() => [...data.myprofile.quotes].reverse());
        }
    }
    useEffect(() => {
        loadData();
    }, [data?.myprofile.quotes]);

    if (loading) return <p>Loading...</p>
    return (
        <div className='container'>
            <div
                style={{
                    background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white', gap: '1rem', marginTop: '1rem',
                }}
            >
                <img src={`https://robohash.org/${data.myprofile.firstName}${data.myprofile.lastName}.png?size=100x100`} alt="profile pic" />
                <h5>{data.myprofile.firstName} {data.myprofile.lastName}</h5>
                <h6>{data.myprofile.email}</h6>
            </div>
            <h4>your quotes</h4>
            {
                quotes.map(quote => {
                    return (
                        <div key={quote._id}>
                            <blockquote
                                style={{ background: '#1F2937', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <h6>
                                    {quote.name}
                                </h6>
                                <Link to={`/editDeleteQuote/${quote._id}`}
                                    style={{
                                        color: 'white', backgroundColor: '#4B5563',
                                        padding: '0.3rem',
                                        borderRadius: '5px', fontWeight: 'bold',
                                    }}
                                >
                                    <AiTwotoneEdit
                                        style={{
                                            height: '1.5rem',
                                            width: '1.5rem',
                                        }}
                                    />
                                </Link>
                            </blockquote>
                        </div>
                    )
                })
            }
            {
                error && <p className='red card-panel'>{error.message}</p>
            }
        </div>
    )
}

export default Profile;