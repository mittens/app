import { ApolloClient, InMemoryCache } from '@apollo/client'
import { API_BASE } from '@env'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${API_BASE}/graphql`
})
