import { ApolloProvider } from '@apollo/client'
import { NavigationContainer, Theme } from '@react-navigation/native'
import React, { FunctionComponent, useEffect, useMemo } from 'react'
import { KeyboardAvoidingView, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { client } from './lib'
import { AuthNavigator, MainNavigator } from './navigators'
import { useAuth } from './store'
import { colors } from './styles'

export const Mittens: FunctionComponent = () => {
  const dark = useColorScheme() === 'dark'

  const [{ loading, loggedIn }, { init }] = useAuth()

  useEffect(() => {
    init()
  }, [init])

  const theme: Theme = useMemo(
    () => ({
      colors: {
        background: colors[dark ? 'dark' : 'light'].background,
        border: colors[dark ? 'dark' : 'light'].border,
        card: colors[dark ? 'dark' : 'light'].background,
        notification: colors.accent,
        primary: colors.primary,
        text: colors[dark ? 'dark' : 'light'].foreground
      },
      dark
    }),
    [dark]
  )

  if (loading) {
    return null
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.main}>
        <ApolloProvider client={client}>
          <NavigationContainer theme={theme}>
            {loggedIn ? <MainNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </ApolloProvider>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
