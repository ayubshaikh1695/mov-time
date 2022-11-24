import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import InView from "components/in-view/in-view";
import MovieTile from "./components/movie-tile";
import styles from "./discovers.module.css";

const Discovers = (props) => {
  const { heading, list, onListEnd } = props;

  if (!list?.length) {
    return null;
  }

  return (
    <div>
      <Typography variant="h1" className={styles.heading}>
        {heading}
      </Typography>
      <ul className={styles.list}>
        {list.map(
          (item, index) =>
            item.title &&
            item.backdrop_path && (
              <li
                key={`${heading}-${item.title}-${index}`}
                className={styles.listItem}
              >
                {index === list.length - 1 ? (
                  <InView
                    uniqueId={`${heading}-${item.title}-${index}`}
                    handleInView={onListEnd}
                  >
                    <MovieTile
                      title={item.title}
                      posterPath={item.backdrop_path}
                      genreIds={item.genre_ids}
                      voteAverage={item.vote_average}
                    />
                  </InView>
                ) : (
                  <MovieTile
                    title={item.title}
                    posterPath={item.backdrop_path}
                    genreIds={item.genre_ids}
                    voteAverage={item.vote_average}
                  />
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

Discovers.propTypes = {
  heading: PropTypes.string,
  list: PropTypes.array,
  onListEnd: PropTypes.func,
};

export default Discovers;
