import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Box, Slider, Typography } from "@mui/material";
import Navbar from "../components/common/Navbar";
import ProductList from "../components/products/ProductList";
import { setProducts } from "../features/products/productsSlice";
import productsService from "../features/products/productsService";
import Spinner from "../components/common/Spinner";
import { setCarts } from "../features/cart/cartSlice";
import cartService from "../features/cart/cartService";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth);
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0,0]);
  const [currentPriceRange, setCurrentPriceRange] = useState([0,0]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productsService.fetchProductsByCategory(category);
        const prices = products.map(product => product.price);
        const sortedPrices = prices.sort((a, b) => a-b);
        const minPrice = sortedPrices[0], maxPrice = sortedPrices[sortedPrices.length - 1];

        setPriceRange([minPrice, maxPrice])
        setCurrentPriceRange([minPrice, maxPrice])
        dispatch(setProducts(products));

        const carts = await cartService.getCartsByUserId(user._id);
        dispatch(setCarts(carts));
      } catch (error) {
        console.error(error)
        toast.error(error.response.data.error || "Something went wrong")
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [dispatch, category, user._id]);


  const handlePriceChange = (event, newValue) => {
    setCurrentPriceRange(newValue);
  };

  const handlePriceChangeFilter = async (event, newValue) => {
    // call filter API based on price
    try {
      setIsLoading(true);
      const min = currentPriceRange[0], max = currentPriceRange[1];
      const products = await productsService.fetchProductsByCategoryAndPrice(category, min, max);
      dispatch(setProducts(products));
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.error || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Navbar />
      {isLoading ? <Spinner /> :
        <>
          <Box display="flex" justifyContent="space-between" py={1}>
            <h1>{category?.toUpperCase() || "Features"}</h1>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6" mr={2}>
                Price Range:
              </Typography>
              <Slider
                value={currentPriceRange}
                onChange={handlePriceChange}
                onChangeCommitted={handlePriceChangeFilter}
                valueLabelDisplay="auto"
                min={priceRange[0]}
                max={priceRange[1]}
                sx={{ width: 200, color: "lightblue" }}
              />
              <Typography variant="body2" pl={2}>
                ${priceRange[0]} to ${priceRange[1]}
              </Typography>
            </Box>
          </Box>
          <ProductList products={products} />
        </>
      }
    </Box>
  );
};

export default Home;
