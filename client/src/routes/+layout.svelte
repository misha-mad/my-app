<script lang="ts">
	import '@unocss/reset/normalize.css'
	import Layout from '$lib/Layout/index.svelte'
	import {apolloClient} from '$lib/common/helpers'
	import {setContext} from 'svelte'

	setContext(Symbol('client'), apolloClient)
</script>

<Layout>
	<slot />
</Layout>
