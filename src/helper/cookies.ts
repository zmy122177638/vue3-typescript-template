import jsCookie from 'js-cookie'

const TOKEN_KEY = 'vue3-typescript-template'

export const setToken = (token: string) => jsCookie.set(TOKEN_KEY, token)

export const getToken = () => jsCookie.get(TOKEN_KEY)
