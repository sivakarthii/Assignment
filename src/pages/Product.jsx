// pages/Product.tsx
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Tooltip,
  Typography
} from "@mui/material";
import React from "react";
import { addToCart } from '../store/cartSlice';
import { useDispatch } from "react-redux";

const Product = ({ state }) => {
  // const { productId } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const contentReducer = (textValues) => {
    return textValues.length > 60
      ? textValues.substring(0, 60) + "..."
      : textValues;
  };

  const titleContentReducer = (textValues) => {
    return textValues.length > 25
      ? textValues.substring(0, 25) + "..."
      : textValues;
  };

  return (
    <Grid container spacing={2}>
      {state?.map((product, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ height: 350 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  <Tooltip title={product.title}>
                    {titleContentReducer(product.title)}
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {product.price}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  <Tooltip title={product.description}>
                    {contentReducer(product.description)}
                  </Tooltip>
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" variant="contained" onClick={()=> handleAddToCart(product)}>
                  Add to Cart
                </Button>
                <Button size="small">Details</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Product;
