import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: { main: "#EFE9F4" },
      secondary: { main: "#9C27B0" },
    },
    typography: {
      fontFamily: "Lato, sans-serif",
      allVariants: {
        color: "#000",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "--TextField-brandBorderColor": "#E0E3E7",
            "--TextField-brandBorderHoverColor": "#B2BAC2",
            "--TextField-brandBorderFocusedColor": "#6F7E8C",
            "& label.Mui-focused": {
              color: "var(--TextField-brandBorderFocusedColor)",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { backgroundColor: "#fff" },
        },
      },
    },
  }),
  { factor: 4 }
);

// declare module "@mui/material/styles" {
//   interface Palette {
//     white: Palette["primary"];
//     secondaryText: Palette["secondary"];
//   }

//   interface PaletteOptions {
//     white: PaletteOptions["primary"];
//     secondaryText: PaletteOptions["secondary"];
//   }
// }
