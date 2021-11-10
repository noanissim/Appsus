export default {
  template: `
        <header class="app-header">
            <div class="logo">
             <a  class="logo-link" href="/"><h3>Appsus</h3></a>
             </div>
             <nav class="main-nav">
            <router-link @click.native="scrollToTop"  to="/">Home</router-link>
            <h1>ahlan</h1>

             <router-link @click.native="scrollToTop"  to="/email">emails</router-link>
             <router-link @click.native="scrollToTop"  to="/keep">keep</router-link>
             <router-link @click.native="scrollToTop"  to="/book">books</router-link>

            </nav>
        </header>
    `,
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}
