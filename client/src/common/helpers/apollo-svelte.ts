import {getContext, onMount, setContext} from 'svelte'
import {readable} from 'svelte/store'
import type {ApolloClient, NormalizedCacheObject} from '@apollo/client/core'
import {ApolloError} from '@apollo/client/core'
import type {DocumentNode} from 'graphql/index'

const CLIENT = typeof Symbol !== 'undefined' ? Symbol('client') : '@@client'

function getClient(): ApolloClient<NormalizedCacheObject> {
  const client: ApolloClient<NormalizedCacheObject> = getContext(CLIENT)

  if (!client) {
    throw new Error('ApolloClient has not been set yet, use setClient(new ApolloClient({ ... })) to define it')
  }

  return client
}

function setClient(client: ApolloClient<NormalizedCacheObject>) {
  setContext(CLIENT, client)
}

function mutation(mutation: DocumentNode, initialOptions = {}) {
  const client = getClient()
  return (options: any) => client.mutate({mutation, ...initialOptions, ...options})
}

function observableToReadable(
  observable: any,
  initialValue = {
    loading: true,
    data: undefined,
    error: undefined,
  },
) {
  return readable(initialValue, (set) => {
    const skipDuplicate = initialValue?.data !== undefined
    let skipped = false

    const subscription = observable.subscribe(
      (result: any) => {
        if (skipDuplicate && !skipped) {
          skipped = true
          return
        }
        if (result.errors) {
          const error = new ApolloError({graphQLErrors: result.errors})
          set({loading: false, data: undefined, error: error as any})
        } else {
          set({loading: false, data: result.data, error: undefined})
        }
      },
      (error: any) =>
        set({
          loading: false,
          data: undefined,
          error: error && 'message' in error ? error : new Error(error),
        }),
    )
    return () => subscription.unsubscribe()
  })
}

const extensions = [
  'fetchMore',
  'getCurrentResult',
  'getLastError',
  'getLastResult',
  'isDifferentFromLastResult',
  'refetch',
  'resetLastResults',
  'resetQueryStoreErrors',
  'result',
  'setOptions',
  'setVariables',
  'startPolling',
  'stopPolling',
  'subscribeToMore',
  'updateQuery',
]

function observableQueryToReadable(query: DocumentNode, initialValue: any) {
  const store = observableToReadable(query, initialValue)
  for (const extension of extensions) {
    // @ts-ignore
    store[extension] = query[extension].bind(query)
  }
  return store
}

const restoring = typeof WeakSet !== 'undefined' ? new WeakSet() : new Set()
function restore(query: DocumentNode, options: any) {
  const client = getClient()
  restoring.add(client)
  afterHydrate(() => restoring.delete(client))
  client.writeQuery({query, ...options})
}

function afterHydrate(callback: any) {
  // Attempt to wait for onMount (hydration of current component is complete),
  // but if that fails (e.g. outside component initialization)
  // wait for next event loop for hydrate to complete
  try {
    onMount(callback)
  } catch (_error) {
    setTimeout(callback, 1)
  }
}

function query(query: DocumentNode, options = {}) {
  const client = getClient()
  const queryOptions = {...options, query}
  // If client is restoring (e.g. from SSR), attempt synchronous readQuery first
  let initialValue

  if (restoring.has(client)) {
    try {
      // undefined = skip initial value (not in cache)
      initialValue = client.readQuery(queryOptions) || undefined
    } catch (err) {
      // Ignore preload errors
    }
  }

  const observable = client.watchQuery(queryOptions)

  return observableQueryToReadable(
    observable as unknown as DocumentNode,
    initialValue !== undefined
      ? {
          data: initialValue,
        }
      : undefined,
  )
}

function subscribe(query: any, options = {}) {
  const client = getClient()
  const observable = client.subscribe({query, ...options})
  return observableToReadable(observable)
}

export {getClient, mutation, observableToReadable, query, restore, setClient, subscribe}
