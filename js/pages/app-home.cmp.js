export default {
  template: `
        <section class="home-page app-main">
    

        <div class="main-home-container">
        
            <div class=home-details-container>
                <h1>Easy and secure access to all of your content</h1>
                <p>Store, share, and collaborate on files and folders from any mobile device, tablet, or computer</p>
                <div class="action-btn-home">
                        <router-link @click.native="scrollToTop"  to="/email">Emails</router-link>
                        <router-link @click.native="scrollToTop"  to="/keep">Keep</router-link>
                        <router-link @click.native="scrollToTop"  to="/book">Books</router-link>
                </div>
            </div>
                <img src="./img/home.png"/>
        </div>

        </section>
    `,
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
