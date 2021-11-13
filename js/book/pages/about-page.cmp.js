import {
    eventBus
} from '../services/event-bus-service.js';

export default {
    template: `
        <section class="about-page app-main">
        <transition name="bounce">
            <div v-if="show">
                <h3 ref="header">About us...</h3>
                <h4>This is an application of books!</h4>
                <h3>Click on the "books" tab to see the books!</h3>
                <img class="home-books-img" src="./img/books2.jpg">
            </div>
           
            </transition>
            <nav  class="router-link-about-container" >
                <router-link class="router-link-about" to="team">Team</router-link> 
                <router-link class="router-link-about" to="service">Services</router-link>
            </nav>
            
            <router-view></router-view>
        </section>
    `,
    data() {
        return {
            show: true
        }
    },

    created() {
        this.myInterval = setTimeout(() => {}, 1000)
    },
    destroyed() {
        clearInterval(this.myInterval)
    },

};