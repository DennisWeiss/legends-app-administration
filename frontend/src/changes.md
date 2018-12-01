auto-login: 
- is now only handled by auth-guard 
- current approach (in app-component) was causing problems with error-interceptor (error shown when visiting unprotected route)
- also fixed error in auth-guard causing redirection to fail, map apparently does not handle error callbacks,
  so I subscribed to observable and returned a promise instead
- poi-list is protected too since app shouldn't be used by unregistered people at all. Redirecting to login-page now.

