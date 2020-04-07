import {Dimensions, PixelRatio
} from 'react-native';

const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 720;
const drawerWidth = (width * 85) / 100;
const listHeight = (height / 3);
const scale = size => PixelRatio.roundToNearestPixel(width / guidelineBaseWidth * size)
export const reverseScale = size => PixelRatio.roundToNearestPixel(guidelineBaseWidth/width * size);
const scaleVertical = size => PixelRatio.roundToNearestPixel(height / guidelineBaseHeight * size);
const scaleModerate = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const responsiveHeight = h => height * (h / 100);
const responsiveWidth = w => width * (w / 100);

export {listHeight, drawerWidth, scale, scaleVertical, scaleModerate, responsiveHeight, responsiveWidth};
