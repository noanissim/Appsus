export default {
    template: `
        <section class="home-page app-main">
            <h3>Welcome to our Appsus!!!!</h3>
    
            <h3>Click on the "email" tab to see the emails!</h3>
            <router-link @click.native="scrollToTop"  to="/email">emails</router-link>
            <h3 >Click on the "keep" tab to see the keeps!</h3>
            <router-link @click.native="scrollToTop"  to="/keep">keep</router-link>
            <h3>Click on the "books" tab to see the books!</h3>
            <router-link @click.native="scrollToTop"  to="/book">books</router-link>

        </section>
    `,
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}