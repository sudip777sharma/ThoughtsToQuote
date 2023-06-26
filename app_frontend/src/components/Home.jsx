import { useQuery } from "@apollo/client"
import { GET_ALL_QUOTES } from "../graphqlOperations/queries";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {

    const [quotes, setQuotes] = React.useState([]);
    const { loading, error, data } = useQuery(GET_ALL_QUOTES);
    const loadData = () => {
        if (data?.quotes) {
            setQuotes(() => [...data.quotes].reverse());
        }
    }
    useEffect(() => {
        loadData();
    }, [data?.quotes])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :{error.message}</p>
    return (
        <div className='container'>
            {
                quotes?.map(quote => {
                    return (
                        <blockquote key={quote._id}
                            style={{
                                background: '#1F2937', borderRadius: '10px', padding: '10px', color: 'white'
                            }}
                        >
                            <h6 className='left-align'>
                                {quote.name}
                            </h6>
                            <Link to={`/otherProfile/${quote.by._id}`}>
                                <p className='right-align'>~ {quote.by.firstName} {quote.by.lastName}</p>
                            </Link>
                        </blockquote>

                    )
                })
            }
        </div>
    )
}

export default Home
