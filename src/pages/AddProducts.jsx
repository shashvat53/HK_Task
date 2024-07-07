import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, ThemeProvider, createTheme } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    white: {
      main: "#ffffff",
    },
  },
});

const AddProductForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    reset();
    let listOfData = JSON.parse(localStorage.getItem("List") || "[]");

    listOfData.push(data);
    // console.log(listOfData, "999");
    localStorage.setItem("List", JSON.stringify(listOfData));
    toast.success("Product added successfully");
  };

  return (
    <div className="min-h-[calc(100vh-65px)] w-full md:min-w-[calc(100vw-300px)] bg-gradient-to-b from-[#894AFF] to-[#B824FF] flex justify-center items-center">
      <div className="flex flex-col gap-7">
        <h1 className="text-white text-3xl">Add Product!</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
          <ThemeProvider theme={theme}>
            <TextField
              label="Product Name"
              variant="standard"
              color="white"
              {...register("productName", {
                required: "Product Name is required",
              })}
              error={!!errors.productName}
              helperText={errors.productName?.message}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <TextField
              label="Price"
              variant="standard"
              color="white"
              {...register("price", {
                required: "Price is required",
                pattern: {
                  value: /^\d+$/,
                  message: "Price must be a number",
                },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              variant="outlined"
              color="white"
              sx={{ mt: 2 }}
            >
              ADD
            </Button>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
