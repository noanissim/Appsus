export default {
    template: `
        <section class="home-page app-main">
            <h3>Home sweet home...</h3>
            <h3>Click on the "books" tab to see the books!</h3>
            <img class="home-books-img" src="./img/books3.png">
        </section>
    `,
    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
}