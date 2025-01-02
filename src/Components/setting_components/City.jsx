import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteCityApi,
  GetCityApi,
  GetHomeApi,
  GetpolicyApi,
  GetTermApi,
  UpdateHomeApi,
  UpdatepolicyApi,
  UpdateTermApi,
} from "../../Api/App/App";
import Tables from "../Tables/Tables";
const City = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const loading = useSelector((state) => state.app.status);
  // State for form data
  const [city, setCities] = useState([]);

  const citysColumns = [
    { label: t("global.table.category.category_id"), field: "id" },
    { label: t("global.nav.menu.city.title"), field: "title" },
  ];

  const [currentcity, setcurrentcity] = useState(null);
  const handleAddcity = () => {
    // Logic for adding a new city
    navigate(`/city/create`);
  };

  const handleEditcity = (city) => {
    // Logic for editing the city

    navigate(`/city/${city?.id}`);
  };

  const handleDeletecity = (city) => {
    // setCities(city.filter((b) => b === city));
    dispatch(DeleteCityApi(city)).then((res) => {
      if (res.payload?.code === 200) {
        dispatch(GetCityApi()).then((res) => {
          if (res.payload?.code === 200) {
            setCities(res.payload?.data?.cities);
          }
        });
      }
    });
  };

  useEffect(() => {
    dispatch(GetCityApi()).then((res) => {
      if (res.payload?.code === 200) {
        setCities(res.payload?.data?.cities);
      }
    });
  }, []);

  return (
    <>
      <Tables
        entityType={t("global.nav.menu.city.title")}
        data={city}
        route="city"
        columns={citysColumns}
        onAdd={handleAddcity}
        // onEdit={handleEditcity}
        onDelete={handleDeletecity}
      />
    </>
  );
};

export default City;
