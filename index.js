import 'react-native-gesture-handler'

import { AppRegistry } from 'react-native'

import { name } from './app.json'
import { Mittens } from './src'

AppRegistry.registerComponent(name, () => Mittens)
