import { addANewDog, newDog } from "@/api/addANewDog";
import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { FormError } from "./FormError";
import { useSession } from "next-auth/react";

export const AddNewDogModalForm = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { data: sessionData } = useSession();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isSmallScreen ? 370 : 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const {
    mutate: addANewDogMutation,
    isSuccess,
    isError,
    data,
  } = useMutation(
    (data: newDog) => addANewDog(data, sessionData?.user.accessToken),
    {
      onSuccess: (data) => {
        console.log("success!");
        console.log(data);
      },
      onError: (error) => {
        console.log("error!");
        console.log(error);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      dogName: "",
      dogDescription: "",
      images: [],
    },
    validationSchema: Yup.object({
      dogName: Yup.string().required("Required"),
      images: Yup.array().required("Required"),
    }),

    onSubmit: (values) => {
      addANewDogMutation({
        dogName: values.dogName,
        dogDescription: values.dogDescription,
      });
    },
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          sx={{ mb: 2 }}
          textAlign="center"
        >
          Add a new dog
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Dog name"
                fullWidth
                id="dogName"
                name="dogName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dogName}
                sx={{
                  backgroundColor: "#fff",
                }}
              />
              {formik.errors.dogName && formik.touched.dogName && (
                <FormError error={formik.errors.dogName} />
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dog description"
                fullWidth
                id="dogDescription"
                name="dogDescription"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dogDescription}
                sx={{
                  backgroundColor: "#fff",
                }}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              dropzone
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button type="submit" variant="outlined" color="secondary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};