import React, { FunctionComponent } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native'

import { colors, fonts, layout, typography } from '../../styles'
import { Spinner } from './spinner'

interface Props {
  label: string
  loading?: boolean
  style?: StyleProp<ViewStyle>

  onPress: () => void
}

export const Button: FunctionComponent<Props> = ({
  label,
  loading,
  onPress,
  style
}) => (
  <Pressable disabled={loading} onPress={onPress} style={[styles.main, style]}>
    <Text style={styles.label}>{label}</Text>
    {loading && <Spinner light style={styles.spinner} />}
  </Pressable>
)

const styles = StyleSheet.create({
  label: {
    ...typography.base,
    ...fonts.medium,
    color: colors.white
  },
  main: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: layout.rounded.base,
    flexDirection: 'row',
    height: layout.button,
    justifyContent: 'center',
    paddingHorizontal: layout.space.xl
  },
  spinner: {
    marginLeft: layout.space.xl
  }
})
