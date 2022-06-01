import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../BreadCrumb";
import "./style.scss";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import FilterPrice from "../FilterPrice";
import Product from "../product";
import "./style.scss";
import { useLocation } from "react-router-dom";
import useCustomRouter from "../../hooks/useCustomRouter";
import { ProductService } from "../../services/product-service";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Loading from "../common/Loading";
import { CategoryService } from "../../services/category-service";

const Products = () => {
  const [page, setPage] = useState(1);
  const limit = 12;
  const [sort, setSort] = useState("-createdAt");
  const [category, setCategory] = useState();
  const [price, setPrice] = useState([0, 100000000]);

  const [categories, setCategories] = useState();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const { search } = useLocation();
  const { pushQuery } = useCustomRouter();
  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.count / limit);
  }, [data, limit]);

  const productService = new ProductService();
  const categoryService = new CategoryService();

  const getCategories = async () => {
    const res = await categoryService.getCategory();
    setCategories(res);
  };

  const getProductByID = async (page, limit, sort, category, price) => {
    const res = await productService.getProductByCategory2({
      page,
      limit,
      sort,
      category,
      price,
    });
    setData(res);
  };
  useEffect(() => {
    setLoading(true);
    const page = +new URLSearchParams(search).get("page") || 1;
    setPage(page);
    const sort = new URLSearchParams(search).get("sort") || "-createdAt";
    setSort(sort);
    const category = new URLSearchParams(search).get("category") || "HP";
    setCategory(category);
    const price1 = +new URLSearchParams(search).get("price_spe[gte]") || 0;
    const price2 = +new URLSearchParams(search).get("price_spe[lte]") || 100000000;
    setPrice([price1, price2]);
    getProductByID(page, limit, sort, category, price);
    getCategories();
    setLoading(false);
  }, [search]);

  const handleChangePage = (p) => {
    pushQuery({ page: p, sort, category, price });
  };

  const handleChangeSort = (e) => {
    pushQuery({ page, sort: e.target.value, category, price });
  };

  const handleFilterPrice = () => {
    pushQuery({ page, sort, category, price });
  };

  const handleChangeCategory = (e) => {
    console.log(e.target.value);
    pushQuery({ page, sort, category: e.target.value, price });
  };

  return (
    <>
      {loading && <Loading />}
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value={category}/>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-3">
            <aside className="left-content-pros">
              <div className="aside-item">
                <div className="title">
                  <h3>Thương hiệu</h3>
                </div>
                <div className="content">
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {categories &&
                        categories.map((cate) => (
                          <FormControlLabel
                            key={cate._id}
                            checked={cate.name===category}
                            value={cate.name}
                            control={<Radio />}
                            label={cate.name}
                            onChange={(e) => handleChangeCategory(e)}
                          />
                        ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className="aside-item">
                <div className="title">
                  <h3>Giá sản phẩm</h3>
                </div>
              </div>
              <div>
                <FilterPrice values={{ price, setPrice }} />
              </div>
              <button onClick={handleFilterPrice}>Lọc giá</button>
            </aside>
          </div>
          <div className="col l-9">
            <section className="main-content-pros">
              <div className="sortPagiBar">
                <div className="row">
                  <div className=" title-head  col l-12 m-12 c-12">
                    <h1>{category}</h1>
                    <Select
                      labelId="demo-simple-select-label"
                      variant="standard"
                      id="demo-simple-select"
                      value={sort}
                      label="Age"
                      onChange={(e) => {
                        handleChangeSort(e);
                      }}
                    >
                      <MenuItem value="-createdAt">Mới nhất</MenuItem>
                      <MenuItem value="createdAt">Cũ nhất</MenuItem>
                      <MenuItem value="price_spe">Giá tăng dần</MenuItem>
                      <MenuItem value="-price_spe">Giá giảm dần</MenuItem>
                    </Select>
                  </div>
                  <div className="col l-6 m-6 c-6">
                    {/* <SelectVariants /> */}
                  </div>
                </div>
              </div>
              <div className="row">
                {data?.products?.map((item) => (
                  <div className="col l-3">
                    <Product product={item} />
                  </div>
                ))}
                {/* <div className="col l-3">
                  <Product />
                </div> */}
              </div>
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => handleChangePage(value)}
                />
              </Stack>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
