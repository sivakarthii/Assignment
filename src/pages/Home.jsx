import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  sortByPrice,
  sortByRating,
  filterByCategory,
  setCurrentPage
} from "../store/productSlice";
import {
  Box,
  Drawer,
  Toolbar,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import Header from "./Header";
import Product from "./Product";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const dispatch = useDispatch();
  const {
    currentItems,
    category,
    priceOrder,
    ratingOrder,
    itemsPerPage,
    data,
    currentPage
  } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  console.log("cartItems", cartItems);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategory = (value) => {
    dispatch(filterByCategory(value));
  };

  const handleChangePage = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  const handlePriceSort = () => {
    const newOrder = priceOrder === "ascending" ? "descending" : "ascending";
    dispatch(sortByPrice(newOrder));
  };

  const handleRatingSort = () => {
    const newOrder = ratingOrder === "ascending" ? "descending" : "ascending";
    dispatch(sortByRating(newOrder));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header drawerWidth={240}/>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Accordion>
          <AccordionSummary>
            <Typography>Category</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography onClick={() => handleCategory("allProduct")}>
              All Category
            </Typography>
            {category.map((cat, index) => (
              <Typography key={index} onClick={() => handleCategory(cat)}>
                {cat}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Price Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sort Price
              <SwapVertIcon onClick={handlePriceSort} />
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Ratings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Sort Ratings
              <SwapVertIcon onClick={handleRatingSort} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Product state={currentItems} />
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        />
      </Box>
    </Box>
  );
}
