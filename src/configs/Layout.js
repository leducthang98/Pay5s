import {Platform, Dimensions, StatusBar} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const {height: W_HEIGHT, width: W_WIDTH} = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX =
        (W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
        (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT);
}

const bar_height = Platform.select({
    ios: isIPhoneX ? 44 : 20,
    android: StatusBar.currentHeight,
    default: 0,
});

let height =
    Platform.OS === 'android' && Platform.Version > 26
        ? screenHeight - bar_height
        : windowHeight;

export const window = {
    width: windowWidth,
    height:
        screenHeight - 2 * bar_height <= windowHeight ? windowHeight : screenHeight,
};

export const statusBarHeight = bar_height;
export const isSmallDevice = windowWidth < 375;
export const platForm = Platform.OS;
