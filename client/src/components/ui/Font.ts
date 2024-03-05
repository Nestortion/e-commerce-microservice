import { cva } from "class-variance-authority";

export const fontStyles = cva([""], {
  variants: {
    intent: {
      HeadersNav: "font-gudea text-xl text-white font-bold",
      HeadersContent: "font-gudea font-bold text-2xl text-cyan-500",
      Label: "font-inconsolata font-semibold text-lg ",
      Button: "font-inconsolata font-bold text-sm",
      CartLabel: "font-inconsolata text-sm text-black",
      CartHeader: "font-gudea text-lg",
      addProductLabel: "font inconsolata text-lg font-semibold text-cyan-400",
      ProductPage: "font-gudea font-semibold text-2xl text-black",
    },
  },
});
