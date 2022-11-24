import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import styles from "./menu-item.module.css";

const MenuItem = (props) => {
  const { active = false, id, iconClass, name, onClick } = props;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className={`${styles.wrapper} ${active ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.iconContainer}>
        <i className={iconClass} />
      </div>
      <Typography variant="body1">{name}</Typography>
    </div>
  );
};

MenuItem.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  iconClass: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default MenuItem;
