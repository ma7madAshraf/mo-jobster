import { useDispatch, useSelector } from "react-redux";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import {
  changeSearchValues,
  clearSearchValues,
} from "../features/allJobs/allJobsSlice";
import { useState } from "react";
import { useMemo } from "react";

const SearchContainer = () => {
  const { isLoading,  searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch(changeSearchValues({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearSearchValues());
  };

  //debounce
  const [localSearch, setLocalSearch] = useState("");

  const debounce = () => {
    let timeOutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        dispatch(
          changeSearchValues({ name: e.target.name, value: e.target.value })
        );
      }, 2000);
    };
  };

  const reactDebounce = useMemo(
    () => debounce(),
    // eslint-disable-next-line
    []
  );
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search by position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={reactDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by  job type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
