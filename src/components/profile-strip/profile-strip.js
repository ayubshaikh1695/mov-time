import PropTypes from "prop-types";
import Avatar from "components/avatar/avatar";
import Typography from "components/typography/typography";
import { getImageUrl } from "utils";
import styles from "./profile-strip.module.css";

const ProfileStrip = (props) => {
  const { name, avatarPath } = props;

  return (
    <div className={styles.wrapper}>
      <div>
        <Avatar
          className={styles.avatar}
          url={getImageUrl(avatarPath, "w150_and_h150_face")}
        />
        <Typography variant="body1" className={styles.text}>
          {name}
        </Typography>
        <i
          className={`fa-solid fa-chevron-down ${styles.icon} ${styles.chevronIcon}`}
        />
      </div>
      <div className={styles.rhs}>
        <i className={`fa-solid fa-location-dot ${styles.icon}`} />
        <i className={`fa-solid fa-bell ${styles.icon}`} />
      </div>
    </div>
  );
};

ProfileStrip.propTypes = {
  name: PropTypes.string,
  avatarPath: PropTypes.string,
};

export default ProfileStrip;
