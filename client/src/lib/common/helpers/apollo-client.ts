import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client/core'
import {PUBLIC_GRAPHQL_HTTP_API_URL, PUBLIC_GRAPHQL_WS_API_URL} from '$env/static/public'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {createClient} from 'graphql-ws'
import {setContext} from '@apollo/client/link/context'
import {getMainDefinition} from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: PUBLIC_GRAPHQL_HTTP_API_URL,
})

const wsLink = new ApolloLink((operation) =>
  new GraphQLWsLink(
    createClient({
      lazy: true,
      connectionParams: {headers: operation.getContext().headers},
      lazyCloseTimeout: 10000,
      retryAttempts: 10,
      url: PUBLIC_GRAPHQL_WS_API_URL,
    }),
  ).request(operation),
)

const splitLink = setContext((_, linkParams) => {
  return linkParams.accessToken ? {headers: {authorization: `Bearer ${linkParams.accessToken}`}} : {}
}).split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },

  wsLink,
  httpLink,
)

const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

export default apolloClient
