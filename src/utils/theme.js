// theme.js
import { Vibrant } from "node-vibrant/browser"
export const lightTheme = {
    background: '#021b6e',
    textColor: '#fff',
    themeMode:'light',
    accent:"#FFC916"
    // other light theme variables...
  };
  
  
  export const darkTheme = {
    background: '#000000',
    textColor: '#CCCCCC',
    themeMode:'dark',
    accent:"#FFC916"
    // other dark theme variables...
  };

// Utility: Blend color with black (or any other color)
function blendWithBlack(hexColor, amount = 0.4) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  const blend = (channel) => Math.round(channel * (1 - amount));

  const newR = blend(r);
  const newG = blend(g);
  const newB = blend(b);

  return `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

export const extractGradientColors = async (imageSrc) => {
  try {
    const palette = await Vibrant.from(imageSrc).getPalette();
    const rawColor1 = palette.DarkVibrant?.hex || "#222";
    const rawColor2 = palette.Vibrant?.hex || "#444";
    const rawColor3 = palette.DarkVibrant?.hex || "#333";
    const highlightColor = palette.LightVibrant?.hex || "#ff4081";

    // 🎨 Blend extracted colors with black for depth
    const color1 = blendWithBlack(rawColor1, 0.7);
    const color2 = blendWithBlack(rawColor2, 0.55);
    const color3 = blendWithBlack(rawColor3, 0.8);

    const gradient = `linear-gradient(135deg, ${color1}, ${color2}, ${color3})`;
    document.documentElement.style.setProperty("--accent-color", highlightColor);
    


    const textColor = "#fff"; // Default for dark backgrounds

    return {
      background: gradient,
      text: textColor,
      accent:highlightColor
    };
  } catch (err) {
    console.error("Vibrant error:", err);
    throw err;
  }
};

