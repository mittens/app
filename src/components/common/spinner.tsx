import React, { FunctionComponent } from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleProp,
  useColorScheme,
  ViewStyle
} from 'react-native'

import { colors } from '../../styles'

type Props = {
  light?: boolean
  style?: StyleProp<ViewStyle>
  size?: ActivityIndicatorProps['size']
}

export const Spinner: FunctionComponent<Props> = ({
  light,
  size = 'small',
  style
}) => {
  const isDark = useColorScheme() === 'dark'

  return (
    <ActivityIndicator
      color={light ? colors.white : isDark ? colors.accent : colors.primary}
      size={size}
      style={style}
    />
  )
}
