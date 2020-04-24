import React from 'react'
import {
  createClient,
  defaultExchanges,
  subscriptionExchange,
  Provider,
} from 'urql'
import {SubscriptionClient} from 'onegraph-subscription-client'
import {auth, APP_ID, CLIENT_URL} from './auth'

const subscriptionClient = new SubscriptionClient(APP_ID, {
  oneGraphAuth: auth,
})

const client = createClient({
  url: CLIENT_URL,
  fetchOptions: () => {
    return {
      headers: {...auth.authHeaders()},
    }
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
})

export default function UrqlProvider({children}) {
  return <Provider value={client}>{children}</Provider>
}
