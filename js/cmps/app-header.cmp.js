export default {
  template: `
        <header  class="app-header">
          <div class="logo">
            <router-link @click.native="scrollToTop"  to="/">
            <img src="./img/logo3.png">
            </router-link>
          </div>

          <div v-if="menuOpen"  @click="toggleScreen" class="main-screen"></div>

             <a class="btn-menu" @click="toggleScreen"><img src="./img/notes/view-more.png"/></a>

             <ul v-bind:class="{ 'menu-open': menuOpen }" class="main-nav flex clean-list">
                <li><router-link @click.native="scrollToTop"  to="/">Home</router-link></li>
                <li> <router-link @click.native="scrollToTop"  to="/email">Emails</router-link></li>
                <li><router-link @click.native="scrollToTop"  to="/keep">Keep</router-link></li>
                <li><router-link @click.native="scrollToTop"  to="/book">Books</router-link></li>
            </ul>

        </header>
    `,
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    toggleScreen() {
      this.menuOpen = !this.menuOpen
    },
  },
  computed: {},
}