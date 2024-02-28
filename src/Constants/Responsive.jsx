import {Dimensions,Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');

export const f_inch = width <= 350 && height <= 600;
export const tab = width >= 768 && height >= 1024;
export const phone = width <= 400 && height <= 800;

export const OS = Platform.OS;
export const iOS = Platform.OS === "ios"