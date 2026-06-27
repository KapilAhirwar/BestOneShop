// import { useState, useEffect } from "react";
// import Spinner from "../components/Spinner";
// import Product from "../components/Product";
// import { useAppContext } from "../useContextHook/context";
// import "./product.css"

// const Home = () => {
//   const { products, GetProduct } = useAppContext();
//   const [loading, setLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   const fetchProductData = async () => {
//     setLoading(true);
//     try {
//       await GetProduct();
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductData();

//     // Check if the screen is mobile or desktop
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 480);
//     };
    
//     window.addEventListener("resize", handleResize);
//     handleResize(); // Initial check
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen px-4">
//         <Spinner />
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen px-4">
//         <p className="text-center text-gray-600 text-lg">No Data Found</p>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="container"
//     >
//       {products.map((post) => (
//         <div key={post._id}>
//           <Product post={post} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Home;


// import { useState, useEffect } from "react";
// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import CategoryFilter from "./Filter";
// import Spinner from "../components/Spinner";
// import Product from "../components/Product";
// import { useAppContext } from "../useContextHook/context";
// import "./product.css";

// const Home = () => {
//   const { products, GetProduct, Categories } = useAppContext();

//   const [loading, setLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Fetch product data from backend
//   const fetchProductData = async () => {
//     setLoading(true);
//     try {
//       await GetProduct();
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update filtered products whenever products change
//   useEffect(() => {
//     if (products && products.length > 0) {
//       setFilteredProducts(products);
//     }
//   }, [products]);

//   // Handle category filtering
//   const handleFilterChange = (selected) => {
//     if (selected.length === 0) {
//       setFilteredProducts(products);
//     } else {
//       setFilteredProducts(
//         products.filter((product) =>
//           selected.includes(product.category?.slug || product.category)
//         )
//       );
//     }
//   };

//   // Detect mobile screen
//   useEffect(() => {
//     fetchProductData();

//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 480);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Loader
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen px-4">
//         <Spinner />
//       </div>
//     );
//   }

//   // No products found
//   if (!products || products.length === 0) {
//     return (
//       <div className="flex justify-center items-center min-h-screen px-4">
//         <p className="text-center text-gray-600 text-lg">No Data Found</p>
//       </div>
//     );
//   }

//   return (
//     <Box sx={{ display: "flex", gap: 3, p: 3 }}>
//       {/* Sidebar Filter */}
//       {!isMobile && (
//         <CategoryFilter
//           categories={Categories}
//           onFilterChange={handleFilterChange}
//         />
//       )}

//       <Grid container spacing={3} sx={{ flex: 1,}}>
//         {filteredProducts.map((product) => (
//           <Grid
//             item
//             key={product._id}
//             xs={6}   // 12/6 = 2 per row on mobile
//             sm={4}   // 12/4 = 3 per row on small screens
//             md={2}   // 12/2 = 6 per row on laptop/desktop
//             lg={1.5} // 12/1.5 ≈ 8 per row on larger screens
//             xl={1}   // 12/1 = 12 per row on very large screens
//           >
//             <Product post={product} />
//           </Grid>
//         ))}

//         {filteredProducts.length === 0 && (
//           <Typography sx={{ m: 2 }}>No products found.</Typography>
//         )}
//       </Grid>
//     </Box>
//   );
// };
// export default Home;

import { useState, useEffect } from "react";
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Drawer,
  Menu,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CategoryFilter from "./Filter";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { useAppContext } from "../useContextHook/context";

const Home = () => {
  const { products, GetProduct, Categories } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      await GetProduct();
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 480);
      setIsTablet(width > 480 && width <= 780);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleFilterChange = (selected) => {
    if (selected.length === 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          selected.includes(product.category?.slug || product.category)
        )
      );
    }
    if (isMobile) setFilterDrawerOpen(false);
  };

  if (loading) return <SpinnerCentered />;
  if (!products || products.length === 0) return <NoDataFound />;

  return (
    <Box sx={{ p: 2 }}>
      {/* ✅ Mobile View - Drawer Filter */}
      

      {/* ✅ Tablet View - Main + Subcategory Dropdowns */}
      {(isTablet || isMobile ) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            justifyContent: "center",
          }}
        >
          {Categories?.filter((cat) => !cat.parentCategory)?.map((mainCat) => (
            <Box key={mainCat._id}>
              <CategoryDropdown
                mainCategory={mainCat}
                categories={Categories}
                onFilterChange={handleFilterChange}
              />
            </Box>
          ))}

          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleFilterChange([])}
          >
            All
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 3 }}>
        {/* ✅ Desktop View - Sidebar Filter */}
        {!isMobile && !isTablet && (
          <CategoryFilter
            categories={Categories}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* ✅ Product Grid */}
        <Grid container spacing={2} sx={{ flex: 1 }}>
          {filteredProducts.map((product) => (
            <Grid
              item
              key={product._id}
              xs={6}   // 2 per row on mobile
              sm={4}   // 3 per row on small screens
              md={2}   // 6 per row on laptop
              lg={1.5} // 8 per row
              xl={1}   // 12 per row
            >
              <Product post={product} />
            </Grid>
          ))}

          {filteredProducts.length === 0 && (
            <Typography sx={{ m: 2 }}>No products found.</Typography>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

// ✅ Dropdown Component for Tablet View
const CategoryDropdown = ({ mainCategory, categories, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const subCategories = categories.filter(
    (sub) => sub.parentCategory === mainCategory._id
  );

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSubCategorySelect = (slug) => {
    onFilterChange([slug]);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        size="small"
        onClick={handleClick}
      >
        {mainCategory.name}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {subCategories.length > 0 ? (
          subCategories.map((sub) => (
            <MenuItem
              key={sub._id}
              onClick={() => handleSubCategorySelect(sub._id)}
            >
              {sub.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No Subcategories</MenuItem>
        )}
      </Menu>
    </>
  );
};

// Loader component
const SpinnerCentered = () => (
  <div className="flex justify-center items-center min-h-screen px-4">
    <Spinner />
  </div>
);

// No data found component
const NoDataFound = () => (
  <div className="flex justify-center items-center min-h-screen px-4">
    <p className="text-center text-gray-600 text-lg">No Data Found</p>
  </div>
);

export default Home;




//--------------------Dummy -----------------

// import React, { useState, useEffect } from "react";
// import { Box, Grid, Typography, Button } from "@mui/material";
// import Product from "../components/Product";
// import CategoryFilter from "./Filter";

// const productsDummy = [
//   {
//     _id: "1",
//     title: "Laptop ABC",
//     description: "High performance laptop for work and gaming.",
//     price: 45000,
//     category: { slug: "laptop", name: "Laptop" },
//     images: ["https://via.placeholder.com/150"]
//   },
//   {
//     _id: "2",
//     title: "Smartphone XYZ",
//     description: "Latest smartphone with amazing features.",
//     price: 25000,
//     category: { slug: "smartphone", name: "Smartphone" },
//     images: ["https://via.placeholder.com/150"]
//   },
//   {
//     _id: "3",
//     title: "Headphones 123",
//     description: "Noise cancelling headphones for music lovers.",
//     price: 5000,
//     category: { slug: "headphones", name: "Headphones" },
//     images: ["https://via.placeholder.com/150"]
//   },
//   {
//     _id: "4",
//     title: "Smartwatch 456",
//     description: "Stylish smartwatch with health tracking features.",
//     price: 7000,
//     category: { slug: "smartwatch", name: "Smartwatch" },
//     images: ["https://via.placeholder.com/150"]
//   },
// ];

// const Home = () => {
//   const [filteredProducts, setFilteredProducts] = useState(productsDummy);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showFilter, setShowFilter] = useState(false);

//   // Handle category filter (just for demo)
//   const handleFilterChange = (selected) => {
//     if (selected.length === 0) {
//       setFilteredProducts(productsDummy);
//     } else {
//       setFilteredProducts(
//         productsDummy.filter((product) =>
//           selected.includes(product.category.slug)
//         )
//       );
//     }
//   };

//   const [width, setWidth] = useState(
//     typeof window !== "undefined" ? window.innerWidth : 0
//   );

//   useEffect(() => {
//     const onResize = () => setWidth(window.innerWidth);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   console.log("open window width : ", width);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth <= 480);
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", p: 2 }}>
//       {/* Filter Button on Mobile */}
//       {isMobile && (
//         <Button
//           variant="contained"
//           sx={{ mb: 2 }}
//           onClick={() => setShowFilter((prev) => !prev)}
//         >
//           {width}
//         </Button>
//       )}

//       {/* Category Filter Sidebar */}
//       {(showFilter || !isMobile) && (
//         <CategoryFilter
//           categories={[
//             { slug: "laptop", name: "Laptop" },
//             { slug: "smartphone", name: "Smartphone" },
//             { slug: "headphones", name: "Headphones" },
//             { slug: "smartwatch", name: "Smartwatch" },
//           ]}
//           onFilterChange={handleFilterChange}
//         />
//       )}

//       {/* Product Grid */}
//       <Grid container spacing={2} sx={{ mt: 1 }}>
//         {filteredProducts.map((product) => (
//           <Grid
//             item
//             key={product._id}
//             xs={6} // 2 per row on mobile
//             sm={4} // 3 per row on small
//             md={2} // 6 per row on desktop
//           >
//             <Product post={product} />
//           </Grid>
//         ))}
//       </Grid>

//       {filteredProducts.length === 0 && (
//         <Typography sx={{ mt: 2 }}>No products found</Typography>
//       )}
//     </Box>
//   );
// };

// export default Home;
