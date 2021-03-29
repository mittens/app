import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'
import { StyleSheet, Text } from 'react-native'
import Image from 'react-native-fast-image'
import { SafeAreaView } from 'react-native-safe-area-context'

import { img_mittens } from '../assets'
import { Button } from '../components'
import { useSignIn, useTheme } from '../hooks'
import { AuthParams } from '../navigators'
import { fonts, layout, typography } from '../styles'

type Props = {
  navigation: StackNavigationProp<AuthParams, 'Landing'>
  route: RouteProp<AuthParams, 'Landing'>
}

export const Landing: FunctionComponent<Props> = () => {
  const theme = useTheme()

  const { loading, signIn } = useSignIn()

  const styles = StyleSheet.create({
    description: {
      ...typography.sm,
      ...fonts.regular,
      color: theme.foreground,
      marginTop: layout.space.base,
      textAlign: 'center'
    },
    logo: {
      height: 340 / 3,
      width: 400 / 3
    },
    main: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    },
    signIn: {
      marginTop: layout.space.xl * 2
    },
    title: {
      ...typography.xxxl,
      ...fonts.bold,
      color: theme.accent,
      marginTop: layout.space.xl,
      textAlign: 'center'
    }
  })

  return (
    <SafeAreaView style={styles.main}>
      <Image source={img_mittens} style={styles.logo} />
      <Text style={styles.title}>mittens</Text>
      <Text style={styles.description}>
        brings you push notifications {'\n'} from GitHub
      </Text>
      <Button
        label="Sign in with GitHub"
        loading={loading}
        onPress={signIn}
        style={styles.signIn}
      />
    </SafeAreaView>
  )
}
