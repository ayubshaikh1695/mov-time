import PropTypes from "prop-types";
import Avatar from "components/avatar/avatar";
import Typography from "components/typography/typography";
import { getImageUrl } from "utils";
import { ACTOR_GENDER } from "utils/constants";
import styles from "./actor-strip.module.css";

const ActorStrip = (props) => {
  const { name, imagePath, gender = 0, popularity } = props;

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentLeft}>
        <Avatar alt={name} url={getImageUrl(imagePath, "w45")} />
        <div className={styles.col}>
          <Typography variant="body2" className={styles.actorName}>
            {name}
          </Typography>
          <Typography variant="caption-text" className={styles.lightText}>
            {ACTOR_GENDER[gender]}
          </Typography>
        </div>
      </div>
      <div className={`${styles.col} ${styles.contentRight}`}>
        <Typography variant="body2" className={styles.lightText}>
          {popularity}
        </Typography>
        <Typography variant="caption-text" className={styles.lightText}>
          Popularity
        </Typography>
      </div>
    </div>
  );
};

ActorStrip.propTypes = {
  name: PropTypes.string,
  imagePath: PropTypes.string,
  gender: PropTypes.number,
  popularity: PropTypes.number,
};

export default ActorStrip;
