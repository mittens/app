import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'

import { TabBar } from '../components'
import { Help, Notifications } from '../scenes'

export type MainParams = {
  Notifications: undefined
  Help: undefined
}

const { Navigator, Screen } = createBottomTabNavigator<MainParams>()

export const MainNavigator: FunctionComponent = () => (
  <Navigator tabBar={props => <TabBar {...props} />}>
    <Screen component={Notifications} name="Notifications" />
    <Screen component={Help} name="Help" />
  </Navigator>
)
