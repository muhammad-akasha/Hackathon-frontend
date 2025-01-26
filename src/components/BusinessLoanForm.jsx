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

export default function BusinessLoanForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    // console.log("Form Submitted:", data);
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
        Business Startup Loan Form
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Business Type */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Business Type</InputLabel>
          <Controller
            name="businessType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Business Type">
                <MenuItem value="Stall Setup">Stall Setup</MenuItem>
                <MenuItem value="Shop Rent Advance">Shop Rent Advance</MenuItem>
                <MenuItem value="Shop Assets">Shop Assets</MenuItem>
                <MenuItem value="Machinery">Machinery</MenuItem>
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
              label="Loan Amount (Max: 10 Lakh)"
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
                <MenuItem value="3 Years">3 Years</MenuItem>
                <MenuItem value="5 Years">5 Years</MenuItem>
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

        {/* Applicant Details */}
        <Typography variant="h6" gutterBottom>
          Applicant Details
        </Typography>
        <Controller
          name="applicant.name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth margin="normal" label="Name" />
          )}
        />
        <Controller
          name="applicant.cnic"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth margin="normal" label="CNIC" />
          )}
        />
        <Controller
          name="applicant.phoneNumber"
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
        <Controller
          name="applicant.address"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} fullWidth margin="normal" label="Address" />
          )}
        />

        {/* Guarantor Details */}
        <Typography variant="h6" gutterBottom>
          Guarantor Details
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Guarantor</Typography>
          <Controller
            name={`guarantorsname`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth margin="normal" label="Name" />
            )}
          />
          <Controller
            name={`guarantorscnic`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field} fullWidth margin="normal" label="CNIC" />
            )}
          />
          <Controller
            name={`guarantorsphoneNumber`}
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
          <Controller
            name={`guarantorsrelationship`}
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Relationship to Applicant"
              />
            )}
          />
        </Box>

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
