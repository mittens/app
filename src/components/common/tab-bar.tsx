import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent, useMemo } from 'react'
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useSignOut, useTheme } from '../../hooks'
import { layout } from '../../styles'
import { Icon } from './icon'
import { Spinner } from './spinner'

export const TabBar: FunctionComponent<BottomTabBarProps> = ({
  navigation: { navigate },
  state: { index, routes }
}) => {
  const { bottom } = useSafeAreaInsets()

  const { loading, signOut } = useSignOut()

  const styles = StyleSheet.create({
    main: {
      flexDirection: 'row'
    }
  })

  return (
    <View style={styles.main}>
      {routes.map((route, i) => (
        <TabBarButton
          active={index}
          bottom={bottom}
          index={i}
          key={route.key}
          name={route.name}
          onPress={() => navigate(route.name)}
        />
      ))}
      <TabBarButton
        bottom={bottom}
        loading={loading}
        name="SignOut"
        onPress={signOut}
      />
    </View>
  )
}

type Props = {
  active?: number
  bottom: number
  index?: number
  loading?: boolean
  name: string

  onPress: () => void
}

const TabBarButton: FunctionComponent<Props> = ({
  active,
  bottom,
  index,
  loading,
  name,
  onPress
}) => {
  const isDark = useColorScheme() === 'dark'
  const theme = useTheme()

  const iconName = useMemo(() => {
    switch (name) {
      case 'Notifications':
        return 'tab-notifications'

      case 'Help':
        return 'tab-help'

      case 'SignOut':
        return 'tab-sign-out'
    }
  }, [name])

  const iconColor = useMemo(() => {
    if (index === active) {
      switch (name) {
        case 'Notifications':
          return isDark ? '#34d399' : '#059669'

        case 'Help':
          return isDark ? '#38bdf8' : '#0284c7'
      }
    }

    return theme.foregroundLight
  }, [active, index, isDark, name, theme.foregroundLight])

  const styles = StyleSheet.create({
    main: {
      alignItems: 'center',
      flex: 1,
      padding: layout.space.lg,
      paddingBottom: layout.space.lg + bottom
    }
  })

  return (
    <Pressable disabled={loading} onPress={onPress} style={styles.main}>
      {loading ? <Spinner /> : <Icon color={iconColor} name={iconName} />}
    </Pressable>
  )
}
