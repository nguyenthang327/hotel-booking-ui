import { useCookies } from 'vue3-cookies'

const cookiesManager = useCookies()

const userCookies = {
  token: 'sgEZkA7zyDqT7ZcMVLVhA2dYdiNHmLQD4',
  user: 'gsgT7Un46hLk4jBzyTGEq6j634H34jmU8'
}

export const SET_TOKEN = (token) => cookiesManager.cookies.set(userCookies.token, token)
export const SET_USER = (user) => cookiesManager.cookies.set(userCookies.user, user)

export default {
  TOKEN: () => cookiesManager.cookies.get(userCookies.token),
  USER: () => cookiesManager.cookies.get(userCookies.user),
  SIGNOUT: () => {
    cookiesManager.cookies.remove(userCookies.token)
    cookiesManager.cookies.remove(userCookies.user)
  },
  DOMAIN_URL: 'http://localhost:8091/api/v1/',
  TITLE: 'Hotel Booking App',
  TYPE_ROOM: [
    { name: 'Đơn', value: 1, style: 'color: white; background: green;' },
    { name: 'Đôi', value: 2, style: 'color: white; background: orange;' },
    { name: 'Sang trọng', value: 3, style: 'color: white; background: red;' }
  ],
  STATUS_ROOM: [
    { name: 'Vận hành', value: 1, style: 'color: white; background: green;' },
    { name: 'Bảo trì', value: 2, style: 'color: white; background: red;' }
  ]
}
