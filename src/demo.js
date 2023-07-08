import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {  
  
  MuiImageListItem: {
    styleOverrides: {
      // For label
        root: {
          "& .hidden-title": {
            display: "none"
          },
          "&:hover .hidden-title": {
            display: "flex",
            fontSize: ".5rem",
          }
        }
      }
  },
  MuiImageListItemBar: {
    styleOverrides: {
      titleWrap: {
        padding: "5px"
      },
      title: {
        lineHeight: "14px",
        fontSize: ".55rem"
      }
    }
  }

  }
});