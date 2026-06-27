import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import CategoryFilter from "./Filter";
import { useAppContext } from '../useContextHook/context';

const ProductList = () => {
    const { Categories, products } = useAppContext();
    // console.log(Categories);
    console.log("product : ",products);

    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleFilterChange = (selected) => {
    if (selected.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          selected.includes(product.category)
        )
      );
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3, p: 3 }}>
      {/* Sidebar Filter */}
      <CategoryFilter categories={Categories} onFilterChange={handleFilterChange} />

      {/* Product Grid */}
      <Grid container spacing={2} sx={{ flex: 1 }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Category: {product.categorySlug}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {filteredProducts.length === 0 && (
          <Typography sx={{ m: 2 }}>No products found.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ProductList;
