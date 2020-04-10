import React from 'react'
import {getToken} from './oneGraphTokens'
import {createClient, Provider} from 'urql'

const client = createClient({
  url: `https://serve.onegraph.com/graphql?app_id=${process.env.REACT_APP_ONE_GRAPH_APP_ID}`,
  fetchOptions: () => {
    const token = getToken()
    return {
      headers: {authorization: token ? `Bearer ${token}` : ''},
    }
  },
})

export default function UrqlProvider({children}) {
  return <Provider value={client}>{children}</Provider>
}
