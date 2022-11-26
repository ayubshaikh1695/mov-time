/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useState, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import ProfileStrip from "components/profile-strip/profile-strip";
import Search from "components/search/search";
import MoviesList from "components/movies-list/movies-list";
import MovieFilters from "components/movie-filters/movie-filters";
import PopularMovie from "components/popular-movie/popular-movie";
import PopularActor from "components/popular-actor/popular-actor";
import {
  get,
  SEARCH_MOVIES_ENDPOINT,
  POPULAR_ACTORS_ENDPOINT,
} from "utils/api";
import { debounce } from "utils";
import { getSearchMoviesMessage, SEARCH_MOVIES_MESSAGE_TYPE } from "./utils";
import { DEFAULT_ACCOUNT_DETAILS } from "utils/constants";
import styles from "./right-sidebar.module.css";

const RightSidebar = (props) => {
  const { filter, popularMovies, handleFilterChange } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovies, setSearchedMovies] = useState({
    loading: false,
    message: "",
    currentPage: 0,
    totalPages: Infinity,
    result: [],
  });

  const [popularActors, setPopularActors] = useState([]);

  useEffect(() => {
    fetchPopularActors();
  }, []);

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (searchedMovies.currentPage === 1 && wrapperRef.current.scrollTop > 0) {
      wrapperRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [searchedMovies.result, searchedMovies.currentPage]);

  const fetchSearchedMovies = (query, page) => {
    if (page === 1 || searchedMovies.currentPage < searchedMovies.totalPages) {
      setSearchedMovies({
        ...searchedMovies,
        loading: true,
        message: getSearchMoviesMessage(
          SEARCH_MOVIES_MESSAGE_TYPE.search,
          query
        ),
      });

      get(SEARCH_MOVIES_ENDPOINT, { query, page }).then((res) => {
        if (res?.results?.length > 0) {
          setSearchedMovies({
            loading: false,
            message: getSearchMoviesMessage(
              SEARCH_MOVIES_MESSAGE_TYPE.success,
              query
            ),
            currentPage: page,
            totalPages: res?.total_pages || 0,
            result:
              page === 1
                ? res.results
                : [...searchedMovies.result, ...res.results],
          });
        } else {
          setSearchedMovies({
            loading: false,
            message: getSearchMoviesMessage(
              SEARCH_MOVIES_MESSAGE_TYPE.failure,
              query
            ),
            currentPage: 0,
            totalPages: Infinity,
            result: [],
          });
        }
      });
    }
  };

  const debouncedFetchSearchedMovies = useCallback(
    debounce(fetchSearchedMovies, 500),
    [searchedMovies.result.length]
  );

  const fetchPopularActors = () => {
    get(POPULAR_ACTORS_ENDPOINT).then((res) => {
      if (res?.results) {
        setPopularActors(res.results.slice(0, 3));
      }
    });
  };

  const resetSearchedMovies = () => {
    setSearchedMovies({
      loading: false,
      message: "",
      currentPage: 0,
      totalPages: Infinity,
      result: [],
    });
  };

  const handleSearchInput = (e) => {
    const query = e.target.value;

    setSearchQuery(query);
    if (query.trim().length <= 0) {
      resetSearchedMovies();
    } else {
      setSearchedMovies({
        ...searchedMovies,
        currentPage: 0,
        totalPages: Infinity,
      });
      debouncedFetchSearchedMovies(e.target.value, 1);
    }
  };

  const fetchNextPageSearchedMovies = () => {
    fetchSearchedMovies(searchQuery, searchedMovies.currentPage + 1);
  };

  const handleSearchClose = () => {
    resetSearchedMovies();
    setSearchQuery("");
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <ProfileStrip
        name={DEFAULT_ACCOUNT_DETAILS.name}
        avatarPath={DEFAULT_ACCOUNT_DETAILS.avatarPath}
      />
      <div className={styles.stickyContent}>
        <Search
          value={searchQuery}
          onInput={handleSearchInput}
          onCancel={handleSearchClose}
        />
      </div>
      {searchQuery.trim().length ? (
        <MoviesList
          message={searchedMovies.message}
          movies={searchedMovies.result}
          isLastPage={searchedMovies.currentPage === searchedMovies.totalPages}
          onListEnd={fetchNextPageSearchedMovies}
        />
      ) : (
        <Fragment>
          <MovieFilters
            selectedFilter={filter}
            onFilterChange={handleFilterChange}
          />
          <PopularMovie movies={popularMovies} />
          <PopularActor actors={popularActors} />
        </Fragment>
      )}
    </div>
  );
};

RightSidebar.propTypes = {
  filter: PropTypes.shape({
    name: PropTypes.string,
    queryParams: PropTypes.shape({
      with_original_language: PropTypes.string,
      with_companies: PropTypes.string,
      with_watch_providers: PropTypes.string,
    }),
  }),
  popularMovies: PropTypes.array,
  handleFilterChange: PropTypes.func,
};

export default RightSidebar;
