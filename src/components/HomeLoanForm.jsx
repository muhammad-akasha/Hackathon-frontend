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
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { api } from "../axios-interceptor/axios";

export default function HomeConstructionLoanForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Submitted", data);
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
        Home Construction Loan Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Loan Amount */}
        <Controller
          name="loanAmount"
          control={control}
          defaultValue=""
          rules={{
            required: "Loan Amount is required",
            max: {
              value: 1000000,
              message: "Max amount is 10 Lakh",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label="Loan Amount (Max: 10 Lakh)"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">PKR</InputAdornment>
                ),
              }}
              error={!!errors.loanAmount}
              helperText={errors.loanAmount?.message}
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
            rules={{ required: "Loan Tenure is required" }}
            render={({ field }) => (
              <Select {...field} label="Loan Tenure">
                <MenuItem value="1 Year">1 Year</MenuItem>
                <MenuItem value="3 Years">3 Years</MenuItem>
                <MenuItem value="5 Years">5 Years</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Loan Purpose */}
        <Controller
          name="loanPurpose"
          control={control}
          defaultValue=""
          rules={{ required: "Loan Purpose is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label="Loan Purpose"
            />
          )}
        />

        {/* Initial Deposit */}
        <Controller
          name="initialDeposit"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              margin="normal"
              label="Initial Deposit (Optional)"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">PKR</InputAdornment>
                ),
              }}
            />
          )}
        />

        {/* Guarantor Details */}
        <Typography variant="h6" gutterBottom>
          Guarantor Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Controller
              name="guarantor1Name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Guarantor 1 Name"
                />
              )}
            />
            <Controller
              name="guarantor1CNIC"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  margin="normal"
                  label="Guarantor 1 CNIC"
                />
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
                  label="Guarantor 1 Phone Number"
                />
              )}
            />
          </Grid>
        </Grid>

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
      </form>
    </Box>
  );
}
