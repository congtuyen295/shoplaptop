import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Paper,
  TextField,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAlert } from "react-alert";
import { ProductService } from "../../../services/product-service";
import { CategoryService } from "../../../services/category-service";

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [cate, setCate] = useState("");
  const prams = useParams();
  const history = useHistory();
  const alert = useAlert();

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

  useEffect(() => {
    const getProducts = async (name) => {
      const res = await productService.getProductById({ id: prams.id });
      setProduct(res.product);
    };
    getProducts();
  }, []);

  const handleSubmitt = async (values) => {
    const updateProduct = {
      ...values,
      id: prams.id,
      category: cate,
      images: imagesPreview,
    };
    console.log(updateProduct);
    try {
      await productService.updateProduct(updateProduct);
      history.push("/admin/products");
      alert.success("Cập nhật thành công !");
    } catch (e) {
      console.log(e);
    }
  };

  const updateProductImagesChange = (e) => {
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
      {product && (
        <Paper className="addProd-container grid wide pt-2 pb-2 mt-4">
          <div className="grid wide">
            <h2 className="title">Sửa sản phẩm</h2>
            <Formik
              initialValues={product}
              validationSchema={SignupSchema}
              onSubmit={handleSubmitt}
            >
              {({ errors, touched, handleSubmit, handleChange }) => (
                <div className="row">
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Tên sản phẩm"
                      name="name"
                      variant="standard"
                      defaultValue={product.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <FormControl fullWidth>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Danh mục sản phẩm
                      </InputLabel>
                      <NativeSelect
                        defaultValue={product.category}
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
                  
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Giá (vnđ)"
                      type="number"
                      name="price"
                      variant="standard"
                      defaultValue={product.price}
                      onChange={handleChange}
                    />
                    {errors.price && touched.price && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.price}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Giảm giá (%)"
                      type="number"
                      name="discount"
                      variant="standard"
                      defaultValue={product.discount}
                      onChange={handleChange}
                    />
                    {errors.discount && touched.discount && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.discount}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="RAM"
                      name="ram"
                      variant="standard"
                      defaultValue={product.ram}
                      onChange={handleChange}
                    />
                    {errors.ram && touched.ram && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.ram}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Số lượng"
                      variant="standard"
                      defaultValue={product.quantity}
                      disabled
                    />
                    </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Hệ điều hành"
                      name="operatingSystem"
                      variant="standard"
                      defaultValue={product.operatingSystem}
                      onChange={handleChange}
                    />
                    {errors.operatingSystem && touched.operatingSystem && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.operatingSystem}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="CPU"
                      name="cpu"
                      variant="standard"
                      defaultValue={product.cpu}
                      onChange={handleChange}
                    />
                    {errors.cpu && touched.cpu && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.cpu}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Card VGA"
                      name="vga"
                      variant="standard"
                      defaultValue={product.vga}
                      onChange={handleChange}
                    />
                    {errors.vga && touched.vga && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.vga}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Ổ cứng"
                      name="hardDrive"
                      variant="standard"
                      defaultValue={product.hardDrive}
                      onChange={handleChange}
                    />
                    {errors.hardDrive && touched.hardDrive && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.hardDrive}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Màn hình"
                      name="screen"
                      variant="standard"
                      defaultValue={product.screen}
                      onChange={handleChange}
                    />
                    {errors.screen && touched.screen && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.screen}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Kích thước sản phẩm (mm)"
                      name="size"
                      variant="standard"
                      placeholder="123 x 456 x 789"
                      defaultValue={product.size}
                      onChange={handleChange}
                    />
                    {errors.size && touched.size && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.size}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Trọng lượng (kg)"
                      type="number"
                      name="weight"
                      variant="standard"
                      defaultValue={product.weight}
                      onChange={handleChange}
                    />
                    {errors.weight && touched.weight && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.weight}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Màu sắc"
                      name="color"
                      variant="standard"
                      defaultValue={product.color}
                      onChange={handleChange}
                    />
                    {errors.color && touched.color && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.color}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="webcam"
                      name="webcam"
                      variant="standard"
                      defaultValue={product.webcam}
                      onChange={handleChange}
                    />
                    {errors.webcam && touched.webcam && (
                      <div style={{ color: "red", marginTop: "5px" }}>
                        {errors.webcam}
                      </div>
                    )}
                  </div>
                  <div className="col l-6 mb-1">
                    <TextField
                      label="Pin (Wh)"
                      type="number"
                      name="pin"
                      variant="standard"
                      defaultValue={product.pin}
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
                      label="Mô tả sản phẩm"
                      name="description"
                      multiline
                      rows={4}
                      defaultValue={product.description}
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
                      onChange={updateProductImagesChange}
                      multiple
                    />
                  </div>
                  <div id="createProductFormImage" className="row mt-2">
                    {imagesPreview.length !== 0 &&
                      imagesPreview.map((image, index) => (
                        <div key={index} className="col l-2">
                          <img
                            className="image-prod"
                            key={index}
                            src={image}
                            alt="Product Preview"
                          />
                        </div>
                      ))}
                    {imagesPreview.length === 0 &&
                      product.images.map((image, index) => (
                        <div key={index} className="col l-2">
                          <img
                            className="image-prod"
                            key={index}
                            src={image.url}
                            alt="Product Preview"
                          />
                        </div>
                      ))}
                  </div>
                  <div className="group-btn">
                    <input
                      type="submit"
                      onClick={handleSubmit}
                      value="Sửa sản phẩm"
                    />
                    <Button
                      startIcon={<KeyboardBackspaceIcon />}
                      size="medium"
                      onClick={backProdPage}
                    >
                      Trở về
                    </Button>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        </Paper>
      )}
    </>
  );
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Tên không được để trống!"),
  description: Yup.string().required("Mô tả không được để trống"),
  operatingSystem: Yup.string().required("Hệ điều hành không được để trống!"),
  price: Yup.number().required("Price không được để trống!"),
  cpu: Yup.string().required("CPU không được để trống!"),
  vga: Yup.string().required("CardVGA không được để trống!"),
  ram: Yup.string().required("RAM không được để trống!"),
  hardDrive: Yup.string().required("Ổ cứng không được để trống!"),
  screen: Yup.string().required("Màn hình không được để trống!"),
  size: Yup.string().required("Kích thước không được để trống!"),
  color: Yup.string().required("Màu sắc không được để trống!"),
  webcam: Yup.string().required("Webcam không được để trống!"),
  weight: Yup.number().required("Trọng lượng không được để trống!"),
  pin: Yup.number().required("Pin không được để trống!"),
  discount: Yup.number().required("Giảm giá không được để trống!"),
});

export default UpdateProduct;
