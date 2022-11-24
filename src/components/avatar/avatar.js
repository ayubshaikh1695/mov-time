import PropTypes from "prop-types";
import { PLACEHOLDER_IMAGE } from "utils/constants";
import styles from "./avatar.module.css";

const Avatar = (props) => {
  const { alt, url, className = "" } = props;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img
        className={styles.image}
        alt={alt}
        src={url || PLACEHOLDER_IMAGE}
        loading="lazy"
      />
    </div>
  );
};

Avatar.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
