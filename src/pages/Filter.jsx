// import React, { useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Box,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// // import { useAppContext } from '../useContextHook/context';


// const CategoryFilter = () => {
//   const [selectedCategories, setSelectedCategories] = useState([]);

// //   const { Categories } = useAppContext();
//   console.log("Categories : ",Categories);
//   // Extract top-level categories
//   const parentCategories = Categories.filter((cat) => !cat.parentCategoryName);

//   // Handle checkbox selection
//   const handleCategorySelect = (slug) => {
//     setSelectedCategories((prev) =>
//       prev.includes(slug)
//         ? prev.filter((item) => item !== slug)
//         : [...prev, slug]
//     );
//   };

//   return (
//     <Box sx={{ width: 300, p: 2, borderRadius: 2, boxShadow: 2, bgcolor: "#fff" }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Filter by Category
//       </Typography>

//       {parentCategories.map((parent) => {
//         const subCategories = Categories.filter(
//           (sub) => sub.parentCategoryName === parent.name
//         );

//         return (
//           <Accordion key={parent.slug} sx={{ mb: 1 }}>
//             <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//               <Typography sx={{ fontWeight: 600 }}>{parent.name}</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               {subCategories.map((sub) => (
//                 <FormControlLabel
//                   key={sub.slug}
//                   control={
//                     <Checkbox
//                       checked={selectedCategories.includes(sub.slug)}
//                       onChange={() => handleCategorySelect(sub.slug)}
//                     />
//                   }
//                   label={sub.name}
//                 />
//               ))}
//             </AccordionDetails>
//           </Accordion>
//         );
//       })}
//     </Box>
//   );
// };

// export default CategoryFilter;


import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CategoryFilter = ({ categories, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Filter out only top-level categories
  const parentCategories = categories.filter((cat) => !cat.parentCategory);

  const handleCategorySelect = (slug) => {
    // console.log(slug);
    // console.log("selectedCategories ; ",selectedCategories);
    setSelectedCategories((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug];
        // console.log(updated);
      onFilterChange(updated); // send selected categories to parent
      return updated;
    });
  };

  return (
    <Box
      sx={{
        width: 300,
        p: 2,
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "#fff",
        height: "fit-content",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Filter by Category
      </Typography>

      {parentCategories.map((parent) => {
        const subCategories = categories.filter(
          (sub) => sub.parentCategory === parent._id
        );
        // console.log("parent : ",subCategories);

        return (
          <Accordion key={parent.slug} sx={{ mb: 1, borderRadius: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>{parent.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {subCategories.map((sub) => (
                // console.log("subcat : ",sub),
                <FormControlLabel
                  key={sub._id}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(sub._id)}
                      onChange={() => handleCategorySelect(sub._id)}
                    />
                  }
                  label={sub.name}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default CategoryFilter;
