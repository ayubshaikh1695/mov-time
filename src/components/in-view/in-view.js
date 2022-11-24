/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, memo } from "react";

let observer = null;
const targetActionMap = {};

const InView = (props) => {
  const {
    children,
    as: Tag = "div",
    once = true,
    handleInView,
    root = null,
    threshold = 1.0,
    uniqueId: uniqueid,
    ...restProps
  } = props;

  const node = useRef(null);
  const pageLoad = useRef(true);
  const visibleContent = new Set();

  const unobserve = (el) => {
    if (observer) {
      observer.unobserve(el);
      delete targetActionMap[el.dataset.uniqueid];

      if (Object.keys(targetActionMap).length === 0) {
        observer.disconnect();
      }
    }
  };

  const handleChange = (entries) => {
    entries.forEach((entry) => {
      const { isIntersecting, target } = entry;
      const eleId = target.dataset.uniqueid;

      if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
        visibleContent.add(eleId);
      } else {
        visibleContent.delete(eleId);
      }

      if (isIntersecting && targetActionMap[target.dataset.uniqueid]) {
        targetActionMap[target.dataset.uniqueid]({
          entry,
          trigger: pageLoad.current ? "on_load" : "on_scroll",
          visibleContent,
        });

        if (once) {
          unobserve(target);
        }
      }
    });

    pageLoad.current = false;
  };

  useEffect(() => {
    if (window?.IntersectionObserver) {
      if (!observer) {
        observer = new IntersectionObserver(handleChange, {
          root,
          rootMargin: "0px",
          threshold,
        });
      }

      targetActionMap[uniqueid] = handleInView;
      observer.observe(node.current);
    }

    return () => {
      if (node.current) {
        unobserve(node.current);
      }
    };
  }, []);

  useEffect(() => {
    // checking and updating the reference of handleInView for every reference change for
    // that function in the props so that the stale data issue due to closure can be avoided
    if (targetActionMap[uniqueid]) {
      targetActionMap[uniqueid] = handleInView;
    }
  }, [handleInView]);

  return (
    <Tag {...restProps} ref={node} data-uniqueid={uniqueid} id={uniqueid}>
      {children}
    </Tag>
  );
};

export default memo(InView);
