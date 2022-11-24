import PropTypes from "prop-types";
import styles from "./search.module.css";

const Search = (props) => {
  const { value, onInput, onCancel } = props;

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search Movies"
        value={value}
        onChange={onInput}
      />
      {value.length > 0 ? (
        <i
          onClick={onCancel}
          className={`fa-regular fa-circle-xmark ${styles.icon} ${styles.closeIcon}`}
        />
      ) : (
        <i className={`fa-solid fa-magnifying-glass ${styles.icon}`} />
      )}
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Search;
