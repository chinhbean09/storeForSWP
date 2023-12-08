import { useEffect, useState } from "react";
import GridView from "./GridView";

import { useDispatch, useSelector } from "react-redux";
import { getAllStore } from "../action/features/store/storeSlice";
import storeService from "../action/features/store/storeService";

const StoreList = () => {
  const dispatch = useDispatch();
  const [isFilterUpdated, setIsFilterUpdated] = useState(false);

  useEffect(() => {
    dispatch(getAllStore());
  }, []);

  const filters = useSelector((state) => state.filter.filters);
  const stores = useSelector((state) => state.store.stores);

  useEffect(() => {
    if (filters.length > 0) {
      setIsFilterUpdated(true);
    }
  }, [filters]);

  console.log(filters);
  console.log(stores);
  return (
    <>
      <h2 style={{ marginLeft: "1rem" }} className="py-5">
        List of stores:{" "}
      </h2>
      <br />
      {isFilterUpdated && filters.length === 0 ? (
        <>
          <p style={{ textAlign: "center", color: "red", fontSize: "20px" }}>
            There are no stores that match your filter, please select the store
            list below
          </p>
          <GridView data={stores} />
        </>
      ) : (
        <GridView data={filters.length > 0 ? filters : stores} />
      )}
    </>
  );
};

export default StoreList;