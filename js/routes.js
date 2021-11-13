import appEmail from "./pages/app-email.cmp.js";
import appKeep from "./pages/app-keep.cmp.js";
import appBook from './pages/app-book.cmp.js';
import appHome from "./pages/app-home.cmp.js";
import emailDetails from "./email/pages/email-details.cmp.js";
import emailAdd from './email/cmps/email-add.cmp.js'

// import homePage from './pages/home-page.cmp.js';
// import aboutPage from './pages/about-page.cmp.js';
import bookDetails from './book/pages/book-details.cmp.js';
// import bookAdd from './cmps/book-add.cmp.js';

const routes = [{
        path: '/',
        component: appHome
    },
    {
        path: '/book',
        component: appBook
    },
    {
        path: '/keep',
        component: appKeep
    },
    {
        path: '/keep/:emailId?/:subject?/:fullname?/:body?',
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
        path: '/email/add/:body?',
        component: emailAdd
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },




];

export const router = new VueRouter({
    routes,
})



const aboutTeam = {
    template: `<section class="about-team">
        <h3>Our Team is Amazing</h3>
        <p>
            Yarden & Noa are the best!
        </p>
    </section>   `
}
const aboutService = {
    template: `<section class="about-service">
        <h3>Services Are Us</h3>
        <p>
        This is Miss Books Service page!
        </p>
    </section>   `
}