import tinycolor from 'tinycolor2';

export const ColorModifier = (color: string) => {
  let lightColor: string = 'yellow';
  let mainColor: string = 'gold';
  let darkColor: string = '#AA6C39';;

  const brightness = tinycolor(color).getBrightness();

  if (brightness < 230) {
    lightColor = tinycolor(color).lighten().toString();
    mainColor = color;
    darkColor = tinycolor(color).darken().toString();;
  }
  return {
    lightColor,
    mainColor,
    darkColor,
  };
};
