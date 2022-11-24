import PropTypes from "prop-types";
import FilterCapsule from "components/filter-capsule/filter-capsule";
import { MOVIE_FILTER_OPTIONS } from "utils/constants";
import styles from "./movie-filters.module.css";

const MovieFilters = (props) => {
  const { selectedFilter, onFilterChange } = props;

  return (
    <div className={styles.wrapper}>
      {MOVIE_FILTER_OPTIONS.map((filter, index) => (
        <FilterCapsule
          key={`${filter.name}-${index}`}
          active={filter.name === selectedFilter.name}
          name={filter.name}
          queryParams={filter.queryParams}
          onClick={onFilterChange}
        />
      ))}
    </div>
  );
};

MovieFilters.propTypes = {
  selectedFilter: PropTypes.shape({
    name: PropTypes.string,
    queryParams: PropTypes.shape({
      with_original_language: PropTypes.string,
      with_companies: PropTypes.string,
      with_watch_providers: PropTypes.string,
    }),
  }),
  onFilterChange: PropTypes.func,
};

export default MovieFilters;
