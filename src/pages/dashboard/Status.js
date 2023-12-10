import { useEffect } from "react";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../features/allJobs/allJobsSlice";

const Status = () => {
  useEffect(() => {
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Status;
