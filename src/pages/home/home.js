/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LeftSidebar from "components/left-sidebar/left-sidebar";
import Discovers from "components/discovers/discovers";
import WidgetList from "components/widget-list/widget-list";
import RightSidebar from "components/right-sidebar/right-sidebar";
import { MOVIE_FILTER_OPTIONS } from "utils/constants";
import { get, DISCOVER_MOVIES_ENDPOINT } from "utils/api";
import styles from "./home.module.css";

const Home = () => {
  const [filter, setFilter] = useState(MOVIE_FILTER_OPTIONS[0]);

  const [discovers, setDiscovers] = useState({
    currentPage: 0,
    totalPages: Infinity,
    result: [],
  });

  const [popularMovies, setPopularMovies] = useState({
    currentPage: 0,
    totalPages: Infinity,
    result: [],
  });

  const [topMovies, setTopMovies] = useState({
    currentPage: 0,
    totalPages: Infinity,
    result: [],
  });

  const [sidebarPopularMovies, setSidebarPopularMovies] = useState([]);

  useEffect(() => {
    fetchDiscovers(1);
    fetchPopularMovies(1, true);
    fetchTopMovies(1);
  }, [filter]);

  const fetchDiscovers = (page) => {
    if (page === 1 || discovers.currentPage < discovers.totalPages) {
      get(DISCOVER_MOVIES_ENDPOINT, {
        page,
        sort_by: "popularity.desc",
        ...filter.queryParams,
      }).then((res) => {
        if (res?.results?.length > 0) {
          setDiscovers({
            currentPage: page,
            totalPages: res?.total_pages || 0,
            result:
              page === 1 ? res.results : [...discovers.result, ...res.results],
          });
        }
      });
    }
  };

  const fetchPopularMovies = (page, updateInSidebar = false) => {
    if (page === 1 || popularMovies.currentPage < popularMovies.totalPages) {
      get(DISCOVER_MOVIES_ENDPOINT, {
        page,
        sort_by: "popularity.desc",
        ...filter.queryParams,
      }).then((res) => {
        if (res?.results?.length > 0) {
          setPopularMovies({
            currentPage: page,
            totalPages: res?.total_pages || 0,
            result:
              page === 1
                ? res.results
                : [...popularMovies.result, ...res.results],
          });
        }

        if (updateInSidebar) {
          setSidebarPopularMovies(res.results.slice(0, 2));
        }
      });
    }
  };

  const fetchTopMovies = (page) => {
    if (page === 1 || topMovies.currentPage < topMovies.totalPages) {
      get(DISCOVER_MOVIES_ENDPOINT, {
        page,
        sort_by: "release_date.desc",
        ...filter.queryParams,
      }).then((res) => {
        if (res?.results?.length > 0) {
          setTopMovies({
            currentPage: page,
            totalPages: res?.total_pages || 0,
            result:
              page === 1 ? res.results : [...topMovies.result, ...res.results],
          });
        }
      });
    }
  };

  const fetchNextPageDiscovers = () => {
    fetchDiscovers(discovers.currentPage + 1);
  };

  const fetchNextPagePopularMovies = () => {
    fetchPopularMovies(popularMovies.currentPage + 1);
  };

  const fetchNextPageTopMovies = () => {
    fetchTopMovies(topMovies.currentPage + 1);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <LeftSidebar />
        <div className={styles.mainContent}>
          <Discovers
            heading="Discovers"
            list={discovers.result}
            page={discovers.currentPage}
            onListEnd={fetchNextPageDiscovers}
          />
          <WidgetList
            heading="Popular Movies"
            list={popularMovies.result}
            page={popularMovies.currentPage}
            onListEnd={fetchNextPagePopularMovies}
          />
          <WidgetList
            heading={filter.name}
            list={topMovies.result}
            page={topMovies.currentPage}
            onListEnd={fetchNextPageTopMovies}
          />
        </div>
        <RightSidebar
          filter={filter}
          popularMovies={sidebarPopularMovies}
          handleFilterChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Home;
