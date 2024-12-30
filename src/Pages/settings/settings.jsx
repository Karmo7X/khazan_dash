import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/breadcrumb/Breadcrumb";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
const Settings = () => {
    const { t, i18n } = useTranslation();
      const dispatch = useDispatch();

  const [value, setValue] = useState("banner");









      
      
        const handleChangetab = (event, newValue) => {
          setValue(newValue);
        };
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
              <Box sx={{ width: "100%" }}>
                  <TabContext value={value}>
                    <Box
                      sx={{
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex", // Apply flexbox layout
                        justifyContent: "center", // Center the tabs horizontally
                      }}
                    >
                      <TabList
                        sx={{
                          "& .MuiTab-root": {
                            color: "#000", // Tab text color (inactive)
                          },
                          "& .MuiTab-root.Mui-selected": {
                            color: "#007bff", // Active tab text color
                          },
                          "& .MuiTabs-indicator": {
                            backgroundColor: "#007bff", // Indicator color
                          },
                        }}
                        onChange={handleChangetab}
                        aria-label="lab API tabs example"
                        variant="scrollable"
                        scrollButtons={false}
                      >
                        <Tab label={t("global.nav.menu.banner_management.title")} value="banner" />
                        <Tab label={t("global.nav.menu.about_us.title")} value="new_feature" />
                        <Tab label={t("global.nav.menu.city.title")} value="city" />
                        <Tab label={t("global.nav.menu.privacy_policy.title")} value="privacy" />
                        <Tab label={t("global.nav.menu.terms_and_conditions.title")} value="terms" />
                        <Tab label={t("global.nav.menu.about_us.title")} value="about_us" />
                        
                      </TabList>
                    </Box>

                    <TabPanel value="banner">
                      
                    </TabPanel>
                    <TabPanel value="new_feature">
                   
                   </TabPanel>
                    <TabPanel value="city">
                   
                    </TabPanel>
                    <TabPanel value="privacy">
                    
                    </TabPanel>
                    <TabPanel value="terms">
                   
                    </TabPanel>
                    <TabPanel value="about_us">
                   
                   </TabPanel>
                  
                  </TabContext>
                </Box>
             
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Settings