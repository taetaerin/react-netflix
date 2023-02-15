import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import "./Row.css"
import MovieModal from './MovieModal';

export default function Row({isLargeRow, title, id, fetchUrl}) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});
    useEffect(() => {
        fetchMovieData();
    }, []);

    const fetchMovieData = async() => {
        const request = await axios.get(fetchUrl);
        console.log(request)
        setMovies(request.data.results);
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    };

    return (
        <section className="row">
            <h2>{title}</h2>
            <div className="slider">
                <div className="slider_arrow-left">
                    <span 
                        className="arrow"
                        onClick={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}
                    >
                        {"<"}
                    </span>
                </div>

                <div id={id} className="row_posters">
                    {movies.map(movie =>(
                        <img 
                            onClick={() => handleClick(movie)}
                            key={movie.id}
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                            alt = {movie.name}
                        />
                    ))}
                </div>

                <div className="slider_arrow-right">
                    <span className="arrow"
                    onClick={() => {
                        document.getElementById(id).scrollLeft += window.innerWidth - 80;
                    }}>{">"}</span>
                </div>
            </div>

            {
                modalOpen && (
                    <MovieModal {...movieSelected} setModalOpen={setModalOpen}/>
                )
            }
        </section>
    )
}
