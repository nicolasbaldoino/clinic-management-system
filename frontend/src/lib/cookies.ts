import Cookies from 'js-cookie'

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export const setCookie = (name: string, value: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(name, value, options)
}

export const removeCookie = (name: string): void => {
  Cookies.remove(name)
}

export const getAllCookies = (): { [key: string]: string } => {
  return Cookies.get()
} 