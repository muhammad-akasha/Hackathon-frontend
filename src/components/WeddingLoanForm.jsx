import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { api } from "../axios-interceptor/axios";

const WeddingLoanForm = () => {
  const [loanPurpose, setLoanPurpose] = useState("");
  const [loanTenure, setLoanTenure] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const loanPurposes = ["Valima", "Furniture", "Valima Food", "Jahez", "Other"];
  const loanTenures = ["1 year", "2 years", "3 years"];

  const onSubmit = async (data) => {
    console.log(data);
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
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: "600px",
        mx: "auto",
        p: 3,
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Wedding Loan Form
      </Typography>

      {/* Loan Purpose */}
      <Controller
        name="loanPurpose"
        control={control}
        defaultValue={loanPurpose}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            select
            margin="normal"
            label="Loan Purpose"
            error={!!errors.loanPurpose}
            helperText={errors.loanPurpose ? "This field is required" : ""}
          >
            {loanPurposes.map((purpose, index) => (
              <MenuItem key={index} value={purpose}>
                {purpose}
              </MenuItem>
            ))}
          </TextField>
        )}
        rules={{ required: "Loan Purpose is required" }}
      />

      {/* Loan Amount */}
      <Controller
        name="loanAmount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            label="Loan Amount (Max: PKR 5 Lakh)"
            type="number"
            inputProps={{ max: 500000 }}
            error={!!errors.loanAmount}
            helperText={errors.loanAmount ? "This field is required" : ""}
          />
        )}
        rules={{ required: "Loan Amount is required" }}
      />

      {/* Loan Tenure */}
      <Controller
        name="loanTenure"
        control={control}
        defaultValue={loanTenure}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            select
            margin="normal"
            label="Loan Tenure"
            error={!!errors.loanTenure}
            helperText={errors.loanTenure ? "This field is required" : ""}
          >
            {loanTenures.map((tenure, index) => (
              <MenuItem key={index} value={tenure}>
                {tenure}
              </MenuItem>
            ))}
          </TextField>
        )}
        rules={{ required: "Loan Tenure is required" }}
      />

      {/* Initial Deposit (Optional) */}
      <Controller
        name="initialDeposit"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            label="Initial Deposit (Optional)"
            type="number"
          />
        )}
      />

      <Typography variant="h6" sx={{ mt: 3 }}>
        Applicant Details
      </Typography>

      {/* Applicant Details */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Controller
            name="applicantName"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth margin="normal" label="Name" />
            )}
            rules={{ required: "Name is required" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="applicantCNIC"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth margin="normal" label="CNIC" />
            )}
            rules={{ required: "CNIC is required" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="applicantPhone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                label="Phone Number"
              />
            )}
            rules={{ required: "Phone Number is required" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="applicantAddress"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth margin="normal" label="Address" />
            )}
            rules={{ required: "Address is required" }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Guarantor Details (Two Guarantors)
      </Typography>

      {/* Guarantor 1 */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Guarantor 1
      </Typography>
      <Controller
        name="guarantor1Name"
        control={control}
        render={({ field }) => (
          <TextField {...field} fullWidth margin="normal" label="Name" />
        )}
      />
      <Controller
        name="guarantor1CNIC"
        control={control}
        render={({ field }) => (
          <TextField {...field} fullWidth margin="normal" label="CNIC" />
        )}
      />
      <Controller
        name="guarantor1Phone"
        control={control}
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
        name="guarantor1Relationship"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            label="Relationship to Applicant"
          />
        )}
      />

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
  );
};

export default WeddingLoanForm;
