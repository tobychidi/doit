import { defineConfig, transformerVariantGroup } from "unocss";

export default defineConfig({
   transformers: [transformerVariantGroup()],
   theme: {
      colors: {
         transparent: "transparent",
         current: "currentColor",
         white: "#ffffff",
         dark: {
            100: "#C2C2F3",
            200: "#8B8BE8",
            300: "#4A4ABB",
            400: "#1D1D77",
            500: "#00001D",
            600: "#000018",
            700: "#000014",
            800: "#000010",
            900: "#00000D",
         },
         light: {
            100: "#F0F0FD",
            200: "#E3E3FB",
            300: "#D0D0F3",
            400: "#BDBDE7",
            500: "#A4A4D7",
            600: "#7777B8",
            700: "#52529A",
            800: "#34347C",
            900: "#1F1F67",
         },
         green: {
            100: "#EDFBDF",
            200: "#D8F8C1",
            300: "#B8EB9D",
            400: "#97D87E",
            500: "#6ABE55",
            600: "#4AA33E",
            700: "#2F882A",
            800: "#1B6E1D",
            900: "#105B17",
         },
         blue: {
            100: "#CAEDF9",
            200: "#97D6F4",
            300: "#5FAFDE",
            400: "#3684BD",
            500: "#075091",
            600: "#053E7C",
            700: "#032E68",
            800: "#022054",
            900: "#011745",
         },
         skyblue: {
            100: "#DEFCFD",
            200: "#BDF4FC",
            300: "#9BE6F8",
            400: "#80D5F2",
            500: "#58BBEA",
            600: "#4094C9",
            700: "#2C70A8",
            800: "#1C5087",
            900: "#103870",
         },
         red: {
            100: "#FDDFD5",
            200: "#FCB7AC",
            300: "#F88782",
            400: "#F16269",
            500: "#E9314B",
            600: "#C8234A",
            700: "#A71847",
            800: "#870F41",
            900: "#6F093D",
         },
      },
   },
});
