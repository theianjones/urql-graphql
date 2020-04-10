const AUTH_TOKEN_KEY = `oneGraph:${process.env.REACT_APP_ONE_GRAPH_APP_ID}`
export const getToken = () => {
  const {accessToken} = JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY))
  return accessToken
}
export const setToken = (token) => localStorage.setItem(AUTH_TOKEN_KEY, token)
export const deleteToken = () => localStorage.removeItem(AUTH_TOKEN_KEY)
