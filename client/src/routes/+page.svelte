<script>
  import Todo from '$lib/components/Todo/Todo.svelte'
  import {apolloClient} from '$lib/common/helpers'
  import {setContext} from 'svelte'

  setContext(typeof Symbol !== 'undefined' ? Symbol('client') : '@@client', apolloClient)
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
