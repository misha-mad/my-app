<script>
  import {ApolloClient, InMemoryCache, HttpLink, ApolloLink} from '@apollo/client/core'
  import {setClient} from 'svelte-apollo'
  import {PUBLIC_GRAPHQL_HTTP_API_URL, PUBLIC_GRAPHQL_WS_API_URL} from '$env/static/public'
  import Todo from '../components/Todo/Todo.svelte'
  import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
  import {setContext} from '@apollo/client/link/context'
  import {createClient} from 'graphql-ws'
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

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  })

  setClient(client)
</script>

<div class="centrify">
  <h5>Hello PUP!</h5>
  <Todo />
</div>

<style>
  h5 {
    color: grey;
  }
  .centrify {
    text-align: center;
  }
</style>
