const escapeCookieName = (cookieName: string) => {
  return cookieName.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1')
}

const getValueFromCookieString = (cookie: string, cookieName: string) => {
  const match = cookie.match(
    RegExp('(?:^|;\\s*)' + escapeCookieName(cookieName) + '=([^;]*)'),
  )
  return match && match[1] ? match[1] : ''
}

const getAuthTokenFromCookie = (cookie: string) => {
  return getValueFromCookieString(cookie, 'Authorization')
}

export default getAuthTokenFromCookie
