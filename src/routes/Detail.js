import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const id = useParams();    
    const [loading, setLoading] = useState(true);
    console.log(id);
    
    const getMovie = async () => {
        const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        const json = await response.json();
        setLoading(false);
        console.log(json);
    }
    useEffect(() => {
        getMovie();
    }, [])
    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <h1>`Detail: {id}`</h1>
            )}
        </div>
    );
}

export default Detail;