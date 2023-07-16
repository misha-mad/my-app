import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.graphql',
  documents: './src/**/*.graphql',
  generates: {
    './src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
      config: {
        clientPath: '../common/helpers/apollo-client',
      },
    },
  },
}

export default config
