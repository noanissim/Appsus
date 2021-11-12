export default {
  template: `
        <header  class="app-header">
          <div >
            <router-link @click.native="scrollToTop"  to="/">
            <img class="logo" src="./img/logo.png" >
            </router-link>
            
          </div>

          <div v-if="menuOpen"  @click="toggleScreen" class="main-screen">
          </div>

             <button class="btn-menu" @click="toggleScreen"><img src="./img/menu.png" class="menu-img"></button>

             <ul v-bind:class="{ 'menu-open': menuOpen }" class="main-nav flex clean-list">
                <li><router-link @click.native="scrollToTop"  to="/">Home</router-link></li>
                <li> <router-link @click.native="scrollToTop"  to="/email">emails</router-link></li>
                <li><router-link @click.native="scrollToTop"  to="/keep">keep</router-link></li>
                <li><router-link @click.native="scrollToTop"  to="/book">books</router-link></li>
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
      console.log(this.menuOpen)
    },
  },
  computed: {},
}