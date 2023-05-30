import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import MainPanel from "./components/Layout/MainPanel";
import PanelContainer from "./components/Layout/PanelContainer";
import PanelContent from "./components/Layout/PanelContent";
import Dashboard from "./Dashboard copy";

const Dash = () => {
  return (
    <Box>
      <MainPanel
        w={{
          base: "100%",
          xl: "100%",
        }}
      >
        <PanelContent>
          <PanelContainer>
            <Routes>
              <Route path="/:username" element={<Dashboard />} />
            </Routes>
          </PanelContainer>
        </PanelContent>
      </MainPanel>
    </Box>
  );
};

export default Dash;
