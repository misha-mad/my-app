<script>
  import {setClient} from '../common/helpers'
  import Todo from '../components/Todo/Todo.svelte'
  import {apolloClient} from '../common/helpers'

  setClient(apolloClient)
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
