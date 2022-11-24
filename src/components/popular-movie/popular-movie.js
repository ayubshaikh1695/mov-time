import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import MovieCard from "components/movie-card/movie-card";
import styles from "./popular-movie.module.css";

const PopularMovie = (props) => {
  const { movies } = props;

  if (!movies?.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" className={styles.heading}>
        Popular Movie
      </Typography>
      <ul>
        {movies.map((movie, index) => (
          <li key={`${movie.title}-${index}`} className={styles.movieCard}>
            <MovieCard
              imagePath={movie.backdrop_path}
              voteCount={movie.vote_count}
              voteAverage={movie.vote_average}
              title={movie.title}
              overview={movie.overview}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

PopularMovie.propTypes = {
  movies: PropTypes.array,
};

export default PopularMovie;
