import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import {
  Message
} from 'element-ui'
import {
  getToken
} from '@/utils/auth' // get token from cookie

const whiteList = ['/login'] // no redirect whitelist

NProgress.configure({ showSpinner: false }) // NProgress Configuration
//console.log('router:', router)
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  //console.log('store', store)
  // set page title
  document.title = getPageTitle(to.meta.title)

  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (
        store.getters.addRouters.length === 0
      ) {
        store.dispatch('permission/generateRoutes').then(routers => {
          console.log('addRouteres:', routers)
          router.addRoutes(routers)
          next({
            ...to,
            replace: true
          })
        })
      } else {
        next()
      }

      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')
      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1 || to.path.indexOf('/login') === 0) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // store.dispatch('oidc/oidcCheckAccess', to).then(hasAccess => {
  //   console.log('hasAccess:', hasAccess)
  //   if (hasAccess) {
  //     if (
  //       store.getters.addRouters.length === 0 &&
  //       store.getters['oidc/oidcIsAuthenticated']
  //     ) {
  //       store.dispatch('permission/generateRoutes').then(routers => {
  //         console.log('addRouteres:', routers)
  //         router.addRoutes(routers)
  //         next({
  //           ...to,
  //           replace: true
  //         })
  //       })
  //     } else {
  //       next()
  //     }
  //   }
  // })
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
