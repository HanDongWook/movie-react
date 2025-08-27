import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    const getMovie = async () => {
        try {
            const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            setMovie(json.data.movie);
        } catch (error) {
            console.error("Detail Failed to fetch movie:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <div className={styles.container}>
            {loading ? (
                <h1>Loading...</h1>
            ) : error ? (
                <div>Error: {error}</div>
            ) : movie && (
                <div className={styles.movieContainer}>
                    <div className={styles.posterContainer}>
                        <img 
                            src={movie.large_cover_image} 
                            alt={movie.title}
                            className={styles.poster}
                        />
                    </div>
                    <div>
                        <h1 className={styles.title}>
                            {movie.title} ({movie.year})
                        </h1>
                        <div className={styles.infoBar}>
                            <span>⭐ {movie.rating}</span>
                            <span>🕒 {movie.runtime}min</span>
                            <span>🎬 {movie.genres.join(", ")}</span>
                        </div>
                        <p className={styles.description}>
                            {movie.description_full || "No description available."}
                        </p>
                        {movie.torrents && (
                            <div className={styles.downloadSection}>
                                <h3>Download Options:</h3>
                                <div className={styles.downloadButtons}>
                                    {movie.torrents.map((torrent, index) => (
                                        <a 
                                            key={index}
                                            href={torrent.url}
                                            className={styles.downloadButton}
                                        >
                                            {torrent.quality} ({torrent.size})
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;