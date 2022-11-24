import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import { getImageUrl, trimString } from "utils";
import { PLACEHOLDER_IMAGE } from "utils/constants";
import styles from "./movie-card.module.css";

const MovieCard = (props) => {
  const { imagePath, voteCount, voteAverage, title, overview } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt={title}
          src={imagePath ? getImageUrl(imagePath, "w300") : PLACEHOLDER_IMAGE}
          loading="lazy"
        />
        {imagePath && <div className={styles.imageOverlay} />}
        <div className={styles.stats}>
          <div>
            <i className={`fa-solid fa-heart ${styles.heartIcon}`} />
            <Typography variant="caption-text" className={styles.voteCountText}>
              {voteCount}
            </Typography>
          </div>
          <div>
            <i className={`fa-solid fa-star ${styles.starIcon}`} />
            <Typography
              variant="caption-text"
              className={styles.voteAverageText}
            >
              {voteAverage}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <Typography variant="body2" className={styles.title}>
          {title}
        </Typography>
        <Typography variant="caption-text" className={styles.overview}>
          {trimString(overview, 70)}
        </Typography>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  imagePath: PropTypes.string,
  voteCount: PropTypes.number,
  voteAverage: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
};

export default MovieCard;
