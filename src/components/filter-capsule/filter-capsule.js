import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import styles from "./filter-capsule.module.css";

const FilterCapsule = (props) => {
  const { active, name, queryParams, onClick } = props;

  const handleClick = () => {
    onClick({ name, queryParams });
  };

  return (
    <div
      className={`${styles.wrapper} ${active ? styles.active : ""}`}
      onClick={handleClick}
    >
      <Typography variant="body2" className={styles.text}>
        {name}
      </Typography>
    </div>
  );
};

FilterCapsule.propTypes = {
  active: PropTypes.bool,
  name: PropTypes.string,
  queryParams: PropTypes.shape({
    with_original_language: PropTypes.string,
    with_companies: PropTypes.string,
    with_watch_providers: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default FilterCapsule;
