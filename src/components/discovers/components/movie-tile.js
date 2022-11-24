import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import { getImageUrl, movieGenre } from "utils";
import { PLACEHOLDER_IMAGE } from "utils/constants";
import styles from "./movie-tile.module.css";

const MovieTile = (props) => {
  const { title, posterPath, genreIds, voteAverage } = props;

  if (!title || !posterPath) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        alt={title}
        src={posterPath ? getImageUrl(posterPath, "w780") : PLACEHOLDER_IMAGE}
        loading="lazy"
      />
      {posterPath && <div className={styles.imageOverlay} />}
      <div className={styles.stats}>
        <div className={styles.col}>
          <Typography variant="body1" className={styles.titleText}>
            {title}
          </Typography>
          <Typography variant="caption-text" className={styles.genreText}>
            {movieGenre(genreIds)}
          </Typography>
        </div>
        <div>
          <i className={`fa-solid fa-star ${styles.starIcon}`} />
          <Typography variant="caption-text" className={styles.voteAverageText}>
            {voteAverage}
          </Typography>
        </div>
      </div>
    </div>
  );
};

MovieTile.propTypes = {
  title: PropTypes.string,
  posterPath: PropTypes.string,
  genreIds: PropTypes.array,
  voteAverage: PropTypes.number,
};

export default MovieTile;
