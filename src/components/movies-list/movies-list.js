import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import InView from "components/in-view/in-view";
import MovieCard from "components/movie-card/movie-card";
import styles from "./movies-list.module.css";

const MoviesList = (props) => {
  const { message, movies, isLastPage, onListEnd } = props;

  return (
    <div className={styles.wrapper}>
      <Typography variant="body2" className={styles.heading}>
        {message}
      </Typography>
      <ul>
        {movies.map((movie, index) => (
          <li key={`${movie.title}-${index}`} className={styles.movieCard}>
            {index === movies.length - 1 ? (
              <InView
                uniqueId={`${movie.title}-${index}`}
                handleInView={onListEnd}
              >
                <MovieCard
                  imagePath={movie.backdrop_path}
                  voteCount={movie.vote_count}
                  voteAverage={movie.vote_average}
                  title={movie.title}
                  overview={movie.overview}
                />
              </InView>
            ) : (
              <MovieCard
                imagePath={movie.backdrop_path}
                voteCount={movie.vote_count}
                voteAverage={movie.vote_average}
                title={movie.title}
                overview={movie.overview}
              />
            )}
          </li>
        ))}
        {isLastPage && (
          <li className={styles.listEndTextContainer}>
            <Typography variant="caption-text">No more results</Typography>
          </li>
        )}
      </ul>
    </div>
  );
};

MoviesList.propTypes = {
  message: PropTypes.string,
  movies: PropTypes.array,
  isLastPage: PropTypes.bool,
  onListEnd: PropTypes.func,
};

export default MoviesList;
