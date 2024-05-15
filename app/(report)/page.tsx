"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { LeftSideMenu } from "./LeftSide";
import ReportForm from "./report-form";
import CalendarView from "@/components/CalendarView";
import DataTable from "@/components/DataTable";

export default function Report() {
  const [tabs, setTabs] = useState(5);

  const handleTabs=(id:number)=>{
    setTabs(id)
  }
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <Typography
              variant="h1"
              sx={{ mb: 5, fontSize: "24px", fontWeight: "700" }}
            >
              Home
            </Typography>

            <Stack direction={"column"} spacing={0} component={"ul"}>
              {LeftSideMenu.map((item, index) => (
                <Stack
                  key={index}
                  direction={"row"}
                  spacing={2}
                  component={"li"}
                  justifyContent={"space-between"}
                  onClick={()=>handleTabs(item.id)}
                  sx={{
                    color: "#8f8585",
                    fontSize: "14px",
                    cursor: "pointer",
                    borderRadius: "30px",
                    background:tabs=== item.id ? "#edfaf9":null,
                    p: 2,
                    "&:hover": { background: "#edfaf9" },
                  }}
                >
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <item.icon /> <span>{item.name}</span>
                  </Stack>
                  <Box>
                    <KeyboardArrowRightOutlinedIcon />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12} lg={9}>
            { tabs=== 5 && <>
              <Typography
              variant="h1"
              sx={{ mb: 5, fontSize: "24px", fontWeight: "700" }}
            >
              Reports
            </Typography>
            <Box sx={{ maxWidth:"75%"}}>
            <ReportForm/>
            </Box>
            </>}
            { tabs=== 4 && <>
              <Typography
              variant="h1"
              sx={{ mb: 5, fontSize: "24px", fontWeight: "700" }}
            >
             Work Reports
            </Typography>
            <DataTable/>
            </>}
            { tabs=== 8 && <>
              <Typography
              variant="h1"
              sx={{ mb: 5, fontSize: "24px", fontWeight: "700" }}
            >
              Calender
            </Typography>
              <CalendarView/>
            </>}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
