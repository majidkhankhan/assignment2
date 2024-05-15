import { addTask } from "@/lib/slices/tasksSlice";
import { useAppDispatch } from "@/lib/store";
import { generateRandomColor } from "@/utils/helper";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import { useState, FormEvent, ChangeEvent } from 'react';
export default function ReportForm() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    reportType: "",
    startDate: "",
    endDate: "",
    agency: "",
    format: "",
    useDate: ""
  });

  const [errors, setErrors] = useState({
    reportType: "",
    startDate: "",
    endDate: "",
    agency: "",
    format: "",
    useDate: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 

  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = { ...errors };
    // Simple validation
    if (formData.reportType === "") {
      newErrors.reportType = "Please select report type";
      hasErrors = true;
    }

    if (formData.startDate === "") {
      newErrors.startDate = "Please enter start date";
      hasErrors = true;
    }

    if (formData.endDate === "") {
      newErrors.endDate = "Please enter end date";
      hasErrors = true;
    }

    if (formData.agency === "") {
      newErrors.agency = "Please select agency";
      hasErrors = true;
    }

    if (formData.format === "") {
      newErrors.format = "Please select format";
      hasErrors = true;
    }
console.log(hasErrors)
    setErrors(newErrors);
    if (!hasErrors) {
      dispatch(addTask({ title: formData.reportType, datetime: formData.startDate, color: generateRandomColor() }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={3}
          sx={{
            "& select": {
              width: "100%",
              borderRadius: "5px",
              padding: "5px 10px",
              background: "#f4f6f5",
              height: "50px",
              color: "#3e4859",
              outline: "none",
            },
            "& input": {
              width: "100%",
              borderRadius: "5px",
              padding: "5px 10px",
              background: "#f4f6f5",
              height: "50px",
              color: "#3e4859",
              outline: "none",
            },
          }}
        >
          <Grid item xs={12}>
            <select name="reportType" onChange={handleChange}>
              <option value="">Select report type</option>
              <option value="2">Select report 1</option>
              <option value="3">Select report 2</option>
              <option value="4">Select report 3</option>
            </select>
            {errors.reportType && <p style={{ color: 'red' }}>{errors.reportType}</p>}
          </Grid>
          <Grid item xs={12} lg={6}>
            <input name="startDate" placeholder="Start Date" onChange={handleChange} />
            {errors.startDate && <p style={{ color: 'red' }}>{errors.startDate}</p>}
          </Grid>
          <Grid item xs={12} lg={6}>
            <input name="endDate" placeholder="End Date" onChange={handleChange} />
            {errors.endDate && <p style={{ color: 'red' }}>{errors.endDate}</p>}
          </Grid>
          <Grid item xs={12} lg={6}>
            <select name="agency" onChange={handleChange}>
              <option value="">Select Agency</option>
              <option value="2">Agency 1</option>
              <option value="3">Agency 2</option>
              <option value="4">Agency 3</option>
            </select>
            {errors.agency && <p style={{ color: 'red' }}>{errors.agency}</p>}
          </Grid>
          <Grid item xs={12} lg={6}>
            <select name="format" onChange={handleChange}>
              <option value="">Select format</option>
              <option value="Format 1">Format 1</option>
              <option value="Format 2">Format 2</option>
              <option value="Format 3">Format 3</option>
            </select>
            {errors.format && <p style={{ color: 'red' }}>{errors.format}</p>}
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="h1"
              sx={{ mb: 3, fontSize: "24px", fontWeight: "700" }}
            >
              Use date
            </Typography>
            <FormControlLabel
              value="Collected"
              control={<Radio />}
              label="Collected"
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            boxShadow: "-5px 10px 47px -28px rgba(0,0,0,0.75)",
            p: 2
          }}
        >
          <Button type="submit" sx={{ borderRadius: "30px", background: "#17c2af", color: "#fff", px: 2, "&:hover": { background: "#17c2af", color: "#fff" } }}>Submit</Button>
        </Box>
      </form>
    </>
  );
}
