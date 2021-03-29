import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { API_BASE } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

const httpLink = createHttpLink({
  uri: `${Platform.select({
    android: 'http://10.0.2.2:4000',
    ios: API_BASE
  })}/graphql`
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@authToken')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})
