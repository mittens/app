import { createStackNavigator } from '@react-navigation/stack'
import React, { FunctionComponent } from 'react'

import { Landing } from '../scenes'

export type AuthParams = {
  Landing: undefined
}

const { Navigator, Screen } = createStackNavigator<AuthParams>()

export const AuthNavigator: FunctionComponent = () => (
  <Navigator headerMode="none">
    <Screen component={Landing} name="Landing" />
  </Navigator>
)
