import React,{useState,useEffect} from 'react'
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Tables from "../../Components/Tables/Tables";
import Modal from "../../Components/Modal/Modal";
import ModalEdit from "../../Components/Modal/ModalEdit";
import { useTranslation } from "react-i18next";
import { DeleteCategoryApi, GetCategoryApi } from '../../Api/Category/CategorySlice';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
const Category = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate =useNavigate()
  const [cates, setcates] = useState([]);
    const categoriesColumns = [
        { label: t("global.table.category.category_id"), field: "id" },
        { label: t("global.table.category.title"), field: "title" },
        { label: t("global.table.category.image"), field: "image" },
      ];
     

      const [currentcate,setcurrentcate]=useState(null)
      const handleAddCate = () => {
        // Logic for adding a new cate
      };
    
      const handleEditCate = (cate) => {
        // Logic for editing the cate
        
        navigate(`/category/${cate?.id}`)
      };
    
      const handleDeleteCate = (cate) => {
        
        setcates(cates.filter((b) => b === cate));
        dispatch(DeleteCategoryApi(cate)).then((res)=>{
          if(res.payload?.code === 200 ){

            dispatch(GetCategoryApi()).then((res) => {
              if (res.payload?.code === 200) {
                setcates(res.payload?.data?.categories);
              }
            });
          }
        })
      };

      useEffect(() => {
        dispatch(GetCategoryApi()).then((res) => {
          if (res.payload?.code === 200) {
            setcates(res.payload?.data?.categories);
          }
        });
      }, []);

  return (
    <>
     <div class="content-page">
        {/* <!-- Start content --> */}
        <div class="content">
          <Topbar />

          <div class="page-content-wrapper">
            <div class="container-fluid">
              <div class="row">
                <Breadcrumb page={t("global.nav.menu.category.title")} />
              </div>
              {/* tables for data and cate crud functionlity */}
              <Tables
                entityType={t("global.nav.menu.category.title")}
                data={cates}
                route="category"
                columns={categoriesColumns}
                // onAdd={handleAddCate}
                onEdit={handleEditCate}
                onDelete={handleDeleteCate}
              />
            </div>
          </div>
        </div>
      </div>
   {/* <Modal
  actionType="Add"
  entityName={t("global.nav.menu.category.title")}
  fields={categoriesColumns}
  onSave={handleAddCate}
   /> 
     <ModalEdit
  actionType={t("global.table.edit")}
  entityName={t("global.nav.menu.category.title")}
  fields={categoriesColumns}
  initialData={currentcate}
  onSave={handleEditCate}
/> */}
    </>
  )
}

export default Category