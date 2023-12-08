import styled from "styled-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HeroSection from "./HeroSection";
import { getStore, resetState } from "../action/features/store/storeSlice";
import {
  getAllSpecialServicebyStore,
  getStandardServicebyStore,
} from "../action/features/laundry/laundrySlice";
import GridViewLaundry from "./GridViewLaundry";
import StandardDetailForm from "./StandardDetailForm";
import { Tabs } from "antd";
import { Background } from "@cloudinary/url-gen/qualifiers";

const SingleStore = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getStore(id));
    dispatch(getAllSpecialServicebyStore(id));
    dispatch(getStandardServicebyStore(id));
  }, []);

  const singleStore = useSelector((state) => state.store.singleStore);
  const specialLaundries = useSelector(
    (state) => state.laundry.specialLaundries
  );
  const standardLaundries = useSelector(
    (state) => state.laundry.standardLaundries
  );
  //const standardLaundries = useSelector((state) => state.laundry.standardLaundries);

  const data = [
    {
      key: 1,
      label: "Standard dry cleaning",
      children: (
        <StandardDetailForm key={standardLaundries.id} {...standardLaundries} />
      ),
    },
    {
      key: 2,
      label: "Wash special types of clothes",
      children: <GridViewLaundry data={specialLaundries}></GridViewLaundry>,
    },
  ];

  return (
    <>
      <Wrapper>
        <div>
          <section
            class="bsb-hero-2 px-3 card"
            style={{ borderRadius: "10px" }}
          >
            <div class="container p-4 overflow-hidden">
              <div class="row gy-3 gy-lg-0 align-items-lg-center justify-content-lg-between">
                <div class="col-12 col-lg-4 order-1 order-lg-0">
                  <h1 class="display-4 fw-bold mb-3">
                  Welcome to the store
                  </h1>
                  <p class="display-3 fw-bold  mb-5" style={{ color: "blue" }}>
                    {singleStore?.name}
                  </p>
                  <p class="display-6 mb-5">
                    {singleStore?.address}, {singleStore?.district}
                  </p>
                  <p class="display-6  mb-5">SĐT: {singleStore?.phone}</p>
                </div>
                <div class="col-12 col-lg-8 text-center">
                  <img
                    class="img-fluid"
                    loading="lazy"
                    src="https://res.cloudinary.com/df6mibrwv/image/upload/v1698075672/ifcbbfxfbngpkprwr1j8.png"
                    style={{ height: "495px", width: "883px" }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="py-5 container grid grid-filter-collumn">
          <section>
            <Tabs defaultActiveKey="1" type="card" size="large" items={data} />
          </section>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  .ant-tabs-content-holder {
    background-color: #ffff;
    border-radius: 10px;
    padding: 2rem;
  }
`;

export default SingleStore;
