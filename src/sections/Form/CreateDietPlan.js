import React, { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Container,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { postPersonalInfo } from "../../services/apiService";
import DietPlan from "../DietPlan/DietPlan";
import logo from "../../assets/create-plan.jpeg";
import { getFoodItems } from "../../services/apiService";

// Schemas for validation
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup.number().required("Age is required").typeError("Must be a number"),
  gender: yup.string().required("Gender is required"),
  height: yup
    .number()
    .required("Height is required")
    .typeError("Must be a number"),
  weight: yup
    .number()
    .required("Weight is required")
    .typeError("Must be a number"),
  activityLevel: yup.number().typeError("Must be a number"),
  previousConditions: yup.array().of(yup.string()),
  excludedFoods: yup.array().of(yup.string()),
});

// Initial values for the form
const initialValues = {
  name: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  activityLevel: "",
  previousConditions: [],
  excludedFoods: [],
};

function CreateDietPlan() {
  document.title = "Create Weekly Diet Plan";

  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState("form");
  const [dietPlan, setDietPlan] = useState({});
  const [foodOptions, setFoodOptions] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        // Fetch food items
        const res = await getFoodItems();
        setFoodOptions(res.data.fooditems);
        console.log(res.data.fooditems);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };

    fetchFoodItems();
  }, []);

  const prepareData = (values) => {
    return {
      name: values.name,
      age: Number(values.age), // Convert to number
      gender: values.gender,
      height: Number(values.height), // Convert to number
      weight: Number(values.weight), // Convert to number
      sedentary_activity_level: Number(values.activityLevel), // Convert to number
      is_high_blood_pressure: Boolean(
        values.previousConditions.includes("HighBloodPressure")
      ), // Ensure boolean
      is_diabetic: Boolean(values.previousConditions.includes("IsDiabetic")), // Ensure boolean
      excludedFoods: values.excludedFoods, // List of excluded foods
    };
  };

  const handleFormSubmit = async (values) => {
    try {
      console.log(values);
      const dataToSend = prepareData(values);
      const res = await postPersonalInfo(dataToSend);
      console.log(res.data);
      setDietPlan(res.data);
      setCurrentPage("diet-plan");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return currentPage === "form" ? (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "background.paper",
            borderRadius: 4,
            border: "1px solid #e0e0e0",
            py: 6,
            px: 4,
            boxShadow: 3,
          }}
        >
          <Box flex={1} sx={{ display: { xs: "none", md: "block" }, p: 0 }}>
            <img src={logo} alt="logo" style={{ width: "300px" }} />
          </Box>

          <Box flex={1}>
            <Stack spacing={2}>
              <div>
                <Typography component="h1" variant="h4" fontWeight={700}>
                  Let&apos;s start
                </Typography>
              </div>

              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({
                  isSubmitting,
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <Box
                    component="form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <Stack direction="row" spacing={2}>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.name) && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} mt={2}>
                      <TextField
                        fullWidth
                        label="Age"
                        name="age"
                        value={values.age}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={Boolean(touched.age) && Boolean(errors.age)}
                        helperText={touched.age && errors.age}
                      />
                      <FormControl fullWidth>
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                          labelId="gender-label"
                          label="Gender"
                          value={values.gender}
                          name="gender"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            Boolean(touched.gender) && Boolean(errors.gender)
                          }
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                        {Boolean(touched.userType) && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.main", mt: 0.5 }}
                          >
                            {errors.userType}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>

                    <Stack direction="row" spacing={2} mt={2}>
                      <TextField
                        fullWidth
                        label="Height"
                        name="height"
                        value={values.height}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          Boolean(touched.height) && Boolean(errors.height)
                        }
                        helperText={touched.height && errors.height}
                      />
                      <TextField
                        fullWidth
                        label="Weight"
                        name="weight"
                        value={values.weight}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={
                          Boolean(touched.weight) && Boolean(errors.weight)
                        }
                        helperText={touched.weight && errors.weight}
                      />
                    </Stack>

                    <Stack direction="row" spacing={2} mt={2}>
                      <FormControl fullWidth>
                        <InputLabel id="activity-level-label">
                          Activity Level
                        </InputLabel>
                        <Select
                          labelId="activity-level-label"
                          label="Activity Level"
                          value={values.activityLevel}
                          name="activityLevel"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            Boolean(touched.activityLevel) &&
                            Boolean(errors.activityLevel)
                          }
                        >
                          <MenuItem value="1.2">
                            Little (or no exercise)
                          </MenuItem>
                          <MenuItem value="1.375">
                            Lightly active (exercise 1-3 days/week)
                          </MenuItem>
                          <MenuItem value="1.55">
                            Moderately active (exercise 3-5 days/week)
                          </MenuItem>
                          <MenuItem value="1.725">
                            Active (exercise 6-7 days/week)
                          </MenuItem>
                          <MenuItem value="1.9">
                            Extremely active (hard exercise 6-7 days/week)
                          </MenuItem>
                        </Select>
                        {Boolean(touched.userType) && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.main", mt: 0.5 }}
                          >
                            {errors.userType}
                          </Typography>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel id="previous-conditions-label">
                          Previous Conditions
                        </InputLabel>
                        <Select
                          labelId="previous-conditions-label"
                          label="Previous Conditions"
                          multiple
                          value={values.previousConditions}
                          name="previousConditions"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            Boolean(touched.previousConditions) &&
                            Boolean(errors.previousConditions)
                          }
                          renderValue={(selected) => selected.join(", ")}
                        >
                          <MenuItem key="IsDiabetic" value="IsDiabetic">
                            <Checkbox
                              checked={values.previousConditions.includes(
                                "IsDiabetic"
                              )}
                            />
                            <ListItemText primary="Diabetic" />
                          </MenuItem>

                          <MenuItem
                            key="HighBloodPressure"
                            value="HighBloodPressure"
                          >
                            <Checkbox
                              checked={values.previousConditions.includes(
                                "HighBloodPressure"
                              )}
                            />
                            <ListItemText primary="Hypertension" />
                          </MenuItem>
                        </Select>
                        {Boolean(touched.previousConditions) && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.main", mt: 0.5 }}
                          >
                            {errors.previousConditions}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>

                    <Stack direction="row" spacing={2} mt={2}>
                      <FormControl fullWidth>
                        <InputLabel id="excluded-foods-label">
                          Exclude Foods
                        </InputLabel>
                        <Select
                          labelId="excluded-foods-label"
                          label="Exclude Foods"
                          multiple
                          value={values.excludedFoods}
                          name="excludedFoods"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            Boolean(touched.excludedFoods) &&
                            Boolean(errors.excludedFoods)
                          }
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {foodOptions &&
                            foodOptions.map((food) => (
                              <MenuItem key={food} value={food}>
                                <Checkbox
                                  checked={values.excludedFoods.includes(food)}
                                />
                                <ListItemText primary={food} />
                              </MenuItem>
                            ))}
                        </Select>
                        {Boolean(touched.excludedFoods) && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.main", mt: 0.5 }}
                          >
                            {errors.excludedFoods}
                          </Typography>
                        )}
                      </FormControl>
                    </Stack>

                    <Button
                      disabled={isSubmitting}
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 3,
                        p: 2,
                      }}
                    >
                      {isSubmitting ? "Creating Diet Plan..." : "Create"}
                    </Button>
                  </Box>
                )}
              </Formik>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  ) : (
    <DietPlan dietPlan={dietPlan} />
  );
}

export default CreateDietPlan;
