import { DefaultTheme } from 'styled-components';
import { ITheme } from '../interface';

export const baseTheme = {
  colors: {
    primary: '#2F80ED',
    white: 'white',
    black: '#252733',
    superBlack: '#0C0F21',
    lightGray1: '#f7f8fc',
    lightGray2: '#DFE0EB',
    lightGray3: '#c5c7cd',
    lightGray4:'#BDBDBD',
    green: '#27AE60',
    mediumGray1: '#7A7E99',
    mediumGray2:'#a4a6b3',
    darkGray:'#4F4F4F',
    high:'#EB5757',
    normal:'#29CC97',
    low:'#F2C94C',
    bgNav:'#363740',
    activeNavFont:'#dde2ff',
    activeNavBg:'f7f8f9',
  },
  media: {
    extraLarge: '(max-width: 1440px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 900px)',
  },
  sizes: {
    container: '1122px',
    navWidth: '255px',
    navWidthSmall: '76px',
  },
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    font: '#252733',
    bg: '#F7F8FC',
    contentBg: 'white',
    headColor: '#9FA2B4',
    primaryBtn: '#2F80ED',
    cardBg: 'white',
    border: '#DFE0EB',
    completed: '#EBFFE6',
    shadow: '0px 0px 10px #616473',
  },
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    font: 'white',
    headColor: '#bdbdbd',
    bg: '#252733',
    contentBg: '#7A7E99',
    primaryBtn: '#8AB7F6',
    cardBg: '#9598ad',
    border: '#0C0F21',
    completed: '#6D838D',
    shadow: '0px 0px 10px #4d5254',
  },
};

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
