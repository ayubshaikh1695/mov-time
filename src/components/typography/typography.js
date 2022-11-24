import PropTypes from "prop-types";
import styles from "./typography.module.css";

const Typography = ({ variant, ...props }) => {
  let classNames = props?.className || "";

  switch (variant) {
    case "h1":
    case "h2":
      return (
        <h2
          className={`${styles.typographyBase} ${styles[variant]} ${classNames}`}
        >
          {props.children}
        </h2>
      );

    case "h3":
      return (
        <h3
          className={`${styles.typographyBase} ${styles[variant]} ${classNames}`}
        >
          {props.children}
        </h3>
      );

    case "body1":
    case "body2":
      return (
        <p
          className={`${styles.typographyBase} ${styles[variant]} ${classNames}`}
        >
          {props.children}
        </p>
      );

    case "menu-heading":
    case "caption-text":
      return (
        <span
          className={`${styles.typographyBase} ${styles[variant]} ${classNames}`}
        >
          {props.children}
        </span>
      );

    default:
      return (
        <h2 className={`${styles.typographyBase} ${styles.h1} ${classNames}`}>
          {props.children}
        </h2>
      );
  }
};

Typography.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default Typography;
