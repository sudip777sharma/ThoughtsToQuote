import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphqlOperations/queries";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const OtherProfile = () => {
    const { userId } = useParams();
    const [quotes, setQuotes] = React.useState([]);
    const { loading, error, data } = useQuery(GET_USER_BY_ID,
        {
            variables: {
                userId
            },
        }
    );
    const loadData = () => {
        if (data?.user) {
            setQuotes(() => [...data.user.quotes].reverse());
        }
    }
    useEffect(() => {
        loadData();
    }, [data?.user.quotes]);

    if (loading) return <p>Loading...</p>
    return (
        <div className='container'
        >
            <div
                style={{
                    background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white', gap: '1rem', marginTop: '1rem',
                }}
            >
                <img src={`https://robohash.org/${data.user.firstName}${data.user.lastName}.png?size=100x100`} alt="profile pic" />
                <h5>{data.user.firstName} {data.user.lastName}</h5>
                <h6>{data.user.email}</h6>
            </div>
            <h4>{data.user.firstName} &apos;s quotes</h4>
            {
                quotes.map(quote => {
                    return (
                        <blockquote
                            key={quote._id}
                            style={{ background: '#1F2937', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <h6>
                                {quote.name}
                            </h6>
                        </blockquote>
                    )
                })
            }
            {
                error && <p className='red card-panel'>{error.message}</p>
            }
        </div>
    )
}

export default OtherProfile;