import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap',
})

export default client
