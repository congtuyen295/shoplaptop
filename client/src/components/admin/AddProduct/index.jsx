import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Paper,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAlert } from "react-alert";
import { CategoryService } from "../../../services/category-service";
import { ProductService } from "../../../services/product-service";

import "./style.scss";

const AddProduct = () => {
  const product = {
    name: "",
    description: "",
    operatingSystem: "",
    quantity: 0,
    price: 0,
    cpu: "",
    vga: "",
    ram: "",
    hardDrive: "",
    screen: "",
    size: "",
    color: "",
    webcam: "",
    weight: 0,
    pin: 0,
    category: "",
    discount: 0,
  };

  const [categories, setCategories] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [cate, setCate] = useState("");
  const alert = useAlert();
  const history = useHistory();

  const categoryService = new CategoryService();
  const productService = new ProductService();
  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryService.getCategory();
      setCategories(res);
      setCate(res[0]?.name);
    };
    getCategory();
  }, []);

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChangeCategory = (e) => {
    setCate(e.target.value);
  };

  const backProdPage = () => {
    history.push("/admin/products");
  };

  return (
    <>
      <Paper className="addProd-container grid wide pt-2 pb-2 mt-4">
        <div className="grid wide">
          <h2 className="title">Th??m s???n ph???m</h2>
          <Formik
            initialValues={product}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              console.log(values);
              const newProduct = {
                ...values,
                category: cate,
                images: imagesPreview,
              };
              try {
                await productService.addProduct(newProduct);
                history.push("/admin/products");
                alert.success("Th??n th??nh c??ng!");
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({ errors, touched, handleSubmit, handleChange }) => (
              <div className="row">
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="T??n s???n ph???m"
                    name="name"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      Danh m???c s???n ph???m
                    </InputLabel>
                    <NativeSelect
                      defaultValue={cate}
                      inputProps={{
                        name: "category",
                        id: "uncontrolled-native",
                      }}
                      onChange={(e) => handleChangeCategory(e)}
                    >
                      {categories?.map((cate) => (
                        <option key={cate._id} value={cate.name}>
                          {cate.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </div>
                
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="S??? l?????ng nh???p v??o"
                    name="quantity"
                    type="number"
                    variant="standard"
                    defaultValue={product.quantity}
                    onChange={handleChange}
                  />
                  {errors.quantity && touched.quantity && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.quantity}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="Gi?? (vn??)"
                    type="number"
                    name="price"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.price && touched.price && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.price}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="Gi???m gi?? (%)"
                    type="number"
                    name="discount"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.discount && touched.discount && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.discount}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="CPU"
                    name="cpu"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.cpu && touched.cpu && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.cpu}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="RAM"
                    name="ram"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.ram && touched.ram && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.ram}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="??? c???ng"
                    name="hardDrive"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.hardDrive && touched.hardDrive && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.hardDrive}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="Card VGA"
                    name="vga"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.vga && touched.vga && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.vga}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="H??? ??i???u h??nh"
                    name="operatingSystem"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.operatingSystem && touched.operatingSystem && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.operatingSystem}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="M??n h??nh"
                    name="screen"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.screen && touched.screen && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.screen}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="K??ch th?????c s???n ph???m (mm)"
                    name="size"
                    variant="standard"
                    placeholder="123 x 456 x 789"
                    onChange={handleChange}
                  />
                  {errors.size && touched.size && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.size}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="Tr???ng l?????ng (kg)"
                    type="number"
                    name="weight"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.weight && touched.weight && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.weight}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="M??u s???c"
                    name="color"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.color && touched.color && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.color}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="webcam"
                    name="webcam"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.webcam && touched.webcam && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.webcam}
                    </div>
                  )}
                </div>
                <div className="col l-6 m-12 c-12 mb-1">
                  <TextField
                    label="Pin (Wh)"
                    type="number"
                    name="pin"
                    variant="standard"
                    onChange={handleChange}
                  />
                  {errors.pin && touched.pin && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.pin}
                    </div>
                  )}
                </div>
                <div className="col l-12 mb-1">
                  <TextField
                    label="M?? t??? s???n ph???m"
                    name="description"
                    multiline
                    rows={4}
                    onChange={handleChange}
                  />
                  {errors.description && touched.description && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.description}
                    </div>
                  )}
                </div>
                <div id="createProductFormFile" className="col">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                  />
                </div>
                <div id="createProductFormImage" className="row mt-2">
                  {imagesPreview.map((image, index) => (
                    <div key={index} className="col l-2">
                      <img
                        className="image-prod"
                        key={index}
                        src={image}
                        alt="Product Preview"
                      />
                    </div>
                  ))}
                </div>
                <div className="group-btn">
                  <input
                    type="submit"
                    onClick={handleSubmit}
                    value="Th??m s???n ph???m"
                  />
                  <Button
                    startIcon={<KeyboardBackspaceIcon />}
                    size="medium"
                    onClick={backProdPage}
                  >
                    Tr??? v???
                  </Button>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </Paper>
    </>
  );
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("T??n kh??ng ???????c ????? tr???ng!"),
  description: Yup.string().required("M?? t??? kh??ng ???????c ????? tr???ng"),
  operatingSystem: Yup.string().required("H??? ??i???u h??nh kh??ng ???????c ????? tr???ng!"),
  quantity: Yup.number().min(1,"C???n nh???p s??? l?????ng ?????u v??o!"),
  price: Yup.number().required("Price kh??ng ???????c ????? tr???ng!"),
  cpu: Yup.string().required("CPU kh??ng ???????c ????? tr???ng!"),
  vga: Yup.string().required("CardVGA kh??ng ???????c ????? tr???ng!"),
  ram: Yup.string().required("RAM kh??ng ???????c ????? tr???ng!"),
  hardDrive: Yup.string().required("??? c???ng kh??ng ???????c ????? tr???ng!"),
  screen: Yup.string().required("M??n h??nh kh??ng ???????c ????? tr???ng!"),
  size: Yup.string().required("K??ch th?????c kh??ng ???????c ????? tr???ng!"),
  color: Yup.string().required("M??u s???c kh??ng ???????c ????? tr???ng!"),
  webcam: Yup.string().required("Webcam kh??ng ???????c ????? tr???ng!"),
  weight: Yup.number().required("Tr???ng l?????ng kh??ng ???????c ????? tr???ng!"),
  pin: Yup.number().required("Pin kh??ng ???????c ????? tr???ng!"),
  discount: Yup.number().required("Gi???m gi?? kh??ng ???????c ????? tr???ng!"),
});

export default AddProduct;
