import { useColorScheme } from 'react-native'

import { colors } from '../styles'
import { Theme } from '../types'

type ThemeReturns = Theme

export const useTheme = (): ThemeReturns => {
  const isDark = useColorScheme() === 'dark'

  const { accent, dark, light, primary } = colors

  const {
    background,
    backgroundDark,
    border,
    foreground,
    foregroundLight
  } = isDark ? dark : light

  return {
    accent,
    background,
    backgroundDark,
    border,
    foreground,
    foregroundLight,
    primary
  }
}
