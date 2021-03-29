import AsyncStorage from '@react-native-async-storage/async-storage'
import { Action, createHook, createStore } from 'react-sweet-state'

type State = {
  loading: boolean
  loggedIn: boolean
}

const initialState: State = {
  loading: true,
  loggedIn: false
}

type Actions = typeof actions

const actions = {
  init: (): Action<State> => async ({ setState }) => {
    setState({
      loading: true
    })

    const authToken = await AsyncStorage.getItem('@authToken')
    const githubToken = await AsyncStorage.getItem('@githubToken')

    setState({
      loading: false,
      loggedIn: !!(authToken && githubToken)
    })
  }
}

const Store = createStore<State, Actions>({
  actions,
  initialState,
  name: 'auth'
})

export const useAuth = createHook(Store)
