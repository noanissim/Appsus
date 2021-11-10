// import appEmail from "./pages/app-email.cmp.js";
import appKeep from './pages/app-keep.cmp.js'
import appHome from './pages/app-home.cmp.js'

const routes = [
  {
    path: '/',
    component: appHome,
  },
  {
    path: '/keep',
    component: appKeep,
  },
  //   {
  //     path: '/email',
  //     component: appEmail,
  //   },
]

export const router = new VueRouter({
  routes,
})
