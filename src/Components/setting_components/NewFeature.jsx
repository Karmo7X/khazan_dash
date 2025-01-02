import React, { useEffect, useState } from 'react'
import Topbar from '../Topbar/Topbar'
import { Breadcrumb } from 'react-bootstrap'
import Tables from '../Tables/Tables'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { DeleteFeatureApi, GetFeatureApi } from '../../Api/App/App';
const NewFeature = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate =useNavigate()
    const [features, setfeatures] = useState([]);
      const featuresColumns = [
          { label: t("global.table.category.category_id"), field: "id" },
          { label: t("global.table.category.title"), field: "title" },
          { label: t("global.table.category.image"), field: "image" },
        ];


        
              const [currentfeature,setcurrentfeature]=useState(null)
              const handleAddfeature = () => {
                // Logic for adding a new feature
                navigate(`/feature/create`)
              };
            
              const handleEditfeature = (feature) => {
                // Logic for editing the feature
                
                navigate(`/feature/${feature?.id}`)
              };
            
              const handleDeletefeature = (feature) => {
                
                setfeatures(features.filter((b) => b === feature));
                dispatch(DeleteFeatureApi(feature)).then((res)=>{
                  if(res.payload?.code === 200 ){
        
                dispatch(GetFeatureApi()).then((res) => {
                  if (res.payload?.code === 200) {
                    setfeatures(res.payload?.data?.featureItems);
                  }
                });
                  }
                })
              };
        
              useEffect(() => {
                dispatch(GetFeatureApi()).then((res) => {
                  if (res.payload?.code === 200) {
                    setfeatures(res.payload?.data?.featureItems);
                  }
                });
              }, []);
  return (
    <>
        <Tables
                entityType={t("global.nav.menu.new_feature.title")}
                data={features}
                route="feature"
                columns={featuresColumns}
                onAdd={handleAddfeature}
                // onEdit={handleEditfeature}
                onDelete={handleDeletefeature}
              />
    </>
  )
}

export default NewFeature