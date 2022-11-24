import PropTypes from "prop-types";
import { getImageUrl } from "utils";
import { PLACEHOLDER_IMAGE } from "utils/constants";
import styles from "./movie-tile.module.css";

const MovieTile = (props) => {
  const { title, posterPath } = props;

  if (!title || !posterPath) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        alt={title}
        src={posterPath ? getImageUrl(posterPath, "w154") : PLACEHOLDER_IMAGE}
        loading="lazy"
      />
    </div>
  );
};

MovieTile.propTypes = {
  title: PropTypes.string,
  posterPath: PropTypes.string,
};

export default MovieTile;
