import tinycolor from 'tinycolor2';
import {colors} from '../theme';
export const ColorModifier = (color: string) => {
  let lightColor: string = colors.lightColor;
  let mainColor: string = colors.mainColor;
  let darkColor: string = colors.darkColor;

  const brightness = tinycolor(color).getBrightness();

  if (brightness < 230 && tinycolor(color).isValid()) {
    lightColor = tinycolor(color).lighten().toString();
    mainColor = color;
    darkColor = tinycolor(color).darken().toString();
  }
  return {
    lightColor,
    mainColor,
    darkColor,
  };
};
