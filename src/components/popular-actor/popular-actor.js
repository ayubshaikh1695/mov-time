import PropTypes from "prop-types";
import Typography from "components/typography/typography";
import ActorStrip from "components/actor-strip/actor-strip";
import styles from "./popular-actor.module.css";

const PopularActor = (props) => {
  const { actors } = props;

  if (!actors?.length) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Typography variant="h3" className={styles.heading}>
        Popular Actor
      </Typography>
      <ul>
        {actors.map((actor, index) => (
          <li key={`${actor.name}-${index}`} className={styles.actorStrip}>
            <ActorStrip
              name={actor.name}
              imagePath={actor.profile_path}
              gender={actor.gender}
              popularity={actor.popularity}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

PopularActor.propTypes = {
  actors: PropTypes.array,
};

export default PopularActor;
