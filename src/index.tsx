import { ApolloProvider } from '@apollo/client'
import { NavigationContainer, Theme } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import { KeyboardAvoidingView, StyleSheet, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { client } from './lib'
import { AuthNavigator } from './navigators'
import { colors } from './styles'

export const Mittens: FunctionComponent = () => {
  const dark = useColorScheme() === 'dark'

  const theme: Theme = {
    colors: {
      background: colors[dark ? 'dark' : 'light'].background,
      border: colors[dark ? 'dark' : 'light'].border,
      card: colors[dark ? 'dark' : 'light'].background,
      notification: colors.accent,
      primary: colors.primary,
      text: colors[dark ? 'dark' : 'light'].foreground
    },
    dark
  }

  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView style={styles.main}>
        <ApolloProvider client={client}>
          <NavigationContainer theme={theme}>
            <AuthNavigator />
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
