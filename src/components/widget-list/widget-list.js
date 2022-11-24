import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import InView from "components/in-view/in-view";
import MovieTile from "./components/movie-tile";
import styles from "./widget-list.module.css";

const WidgetList = (props) => {
  const { heading, list, onListEnd } = props;

  if (!list?.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Typography variant="h2" className={styles.heading}>
        {heading}
      </Typography>
      <ul className={styles.list}>
        {list.map(
          (item, index) =>
            item.title &&
            item.poster_path && (
              <li
                key={`${item.heading}-${item.title}-${index}`}
                className={styles.listItem}
              >
                {index === list.length - 1 ? (
                  <InView
                    uniqueId={`${heading}-${item.title}-${index}`}
                    handleInView={onListEnd}
                  >
                    <MovieTile
                      title={item.title}
                      posterPath={item.poster_path}
                    />
                  </InView>
                ) : (
                  <MovieTile title={item.title} posterPath={item.poster_path} />
                )}
              </li>
            )
        )}
      </ul>
    </div>
  );
};

WidgetList.propTypes = {
  heading: PropTypes.string,
  list: PropTypes.array,
  onListEnd: PropTypes.func,
};

export default WidgetList;
