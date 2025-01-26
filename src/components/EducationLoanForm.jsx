import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { api } from "../axios-interceptor/axios";

export default function EducationLoanForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    const {
      guarantor1CNIC,
      guarantor1Name,
      guarantor1Phone,
      initialDeposit,
      loanAmount,
      loanPurpose,
      loanTenure,
    } = data;

    const obj = {
      initialDeposit,
      loanAmount,
      loanPurpose,
      loanTunure: loanTenure,
      GuarantorName: guarantor1Name,
      GuarantorCNIC: guarantor1CNIC,
      GuarantorPhone: guarantor1Phone,
    };
    try {
      const response = await api.post("/createloan", obj);
      console.log(response.data);
      return response.data; // Success response
    } catch (error) {
      throw error?.data?.message || "Failed to create loan";
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Education Loan Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Loan Purpose */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Loan Purpose</InputLabel>
          <Controller
            name="loanPurpose"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Loan Purpose">
                <MenuItem value="University Fees">University Fees</MenuItem>
                <MenuItem value="School/Child Fees">School/Child Fees</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Loan Amount */}
        <Controller
          name="loanAmount"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              label="Loan Amount (Based on Requirement)"
              type="number"
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">PKR</InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Loan Tenure */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Loan Tenure</InputLabel>
          <Controller
            name="loanTenure"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Loan Tenure">
                <MenuItem value="1 Year">1 Year</MenuItem>
                <MenuItem value="2 Years">2 Years</MenuItem>
                <MenuItem value="3 Years">3 Years</MenuItem>
                <MenuItem value="4 Years">4 Years</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Initial Deposit */}
        <Controller
          name="initialDeposit"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              fullWidth
              margin="normal"
              label="Initial Deposit (Optional)"
              type="number"
              {...field}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">PKR</InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Guarantor 1 Details */}
        <Typography variant="h6" gutterBottom>
          Guarantor 1 Details
        </Typography>
        <Controller
          name="guarantor1Name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth margin="normal" label="Name" />
          )}
        />
        <Controller
          name="guarantor1CNIC"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth margin="normal" label="CNIC" />
          )}
        />
        <Controller
          name="guarantor1Phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label="Phone Number"
            />
          )}
        />

        {/* Submit Button */}
        <Box sx={{ mt: 3 }}>
          {/* Submit Button */}
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, width: "100%" }}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
