import appEmail from "./pages/app-email.cmp.js";
import appKeep from "./pages/app-keep.cmp.js";
import appHome from "./pages/app-home.cmp.js";
import emailDetails from "./email/pages/email-details.cmp.js";
import emailAdd from './email/cmps/email-add.cmp.js'


const routes = [{
        path: '/',
        component: appHome
    },
    {
        path: '/keep',
        component: appKeep
    },
    {
        path: '/email',
        component: appEmail
    },
    {
        path: '/email/:emailId?/add',
        component: emailAdd
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    },
    // {
    //     path: '/email/inbox/:emailId?',
    //     component: emailInbox
    // },




];

export const router = new VueRouter({
    routes,
})