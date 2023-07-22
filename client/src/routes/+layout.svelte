<script>
	import '@unocss/reset/normalize.css'
	import {apolloClient} from '$lib/common/helpers'
	import {setContext} from 'svelte'

	setContext(Symbol('client'), apolloClient)
</script>

<slot />
