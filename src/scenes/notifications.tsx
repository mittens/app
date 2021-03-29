import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import Image from 'react-native-fast-image'
import { SafeAreaView } from 'react-native-safe-area-context'

import { img_mittens } from '../assets'
import { useTheme } from '../hooks'
import { MainParams } from '../navigators'
import { fonts, layout, typography } from '../styles'

type Props = {
  navigation: StackNavigationProp<MainParams, 'Notifications'>
  route: RouteProp<MainParams, 'Notifications'>
}

export const Notifications: FunctionComponent<Props> = () => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    logo: {
      height: 340 / 3,
      width: 400 / 3
    },
    main: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
    title: {
      ...typography.xl,
      ...fonts.semibold,
      color: theme.foreground,
      marginTop: layout.space.xl
    }
  })

  return (
    <SafeAreaView style={styles.main}>
      <Image source={img_mittens} style={styles.logo} />
      <Text style={styles.title}>Notifications</Text>
    </SafeAreaView>
  )
}
