<script>
	import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client/core'
	import {setClient} from 'svelte-apollo'
	import {PUBLIC_GRAPHQL_WS_API_URL} from '$env/static/public'
	import Todo from '../components/Todo/Todo.svelte'

	const client = new ApolloClient({
		link: createHttpLink({uri: PUBLIC_GRAPHQL_WS_API_URL}),
		cache: new InMemoryCache(),
	})

	setClient(client)
</script>

<style>
  h5 {color: grey}
  .centrify {text-align: center}
</style>

<div class="centrify">
	<h5>Hello PUP!</h5>
	<Todo />
</div>
