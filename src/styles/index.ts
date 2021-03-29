import { StyleSheet } from 'react-native'

export const colors = {
  accent: '#5dc3c4',
  black: '#000',
  dark: {
    background: '#000',
    backgroundDark: '#18181b',
    border: '#18181b',
    foreground: '#fff',
    foregroundLight: '#a1a1aa'
  },
  light: {
    background: '#fff',
    backgroundDark: '#f4f4f5',
    border: '#e4e4e7',
    foreground: '#000',
    foregroundLight: '#52525b'
  },
  primary: '#ff5058',
  white: '#fff'
}

export const layout = {
  border: StyleSheet.hairlineWidth,
  button: 48,
  floatingButton: 64,
  header: 56,
  rounded: {
    base: 8,
    lg: 12,
    sm: 4
  },
  space: {
    base: 8,
    lg: 12,
    sm: 4,
    xl: 16
  },
  textBox: 48
}

export const fonts = {
  bold: {
    fontFamily: 'RobotoMono-Bold'
  },
  medium: {
    fontFamily: 'RobotoMono-Medium'
  },
  regular: {
    fontFamily: 'RobotoMono-Regular'
  },
  semibold: {
    fontFamily: 'RobotoMono-SemiBold'
  }
}

const base = 16

export const typography = {
  base: {
    fontSize: 1 * base,
    lineHeight: 1.5 * base
  },
  lg: {
    fontSize: 1.125 * base,
    lineHeight: 1.75 * base
  },
  sm: {
    fontSize: 0.875 * base,
    lineHeight: 1.25 * base
  },
  xl: {
    fontSize: 1.25 * base,
    lineHeight: 1.75 * base
  },
  xxl: {
    fontSize: 1.5 * base,
    lineHeight: 2 * base
  },
  xxxl: {
    fontSize: 1.875 * base,
    lineHeight: 2.25 * base
  }
}
