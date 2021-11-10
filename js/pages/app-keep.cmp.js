import {
    eventBus
} from "../services/event-bus-service.js";
import {
    utilService
} from '../services/util-service.js'


export default {
    props: [''],
    template: `
       <section class="app-main">
           <h1>app-keep</h1>
           <!-- <header></header> -->
           <!-- search with filter -->

           <!-- main: notes list -->
       </section>

       <!-- <section class="book-app app-main">
            <book-filter @filtered="setFilter"/>
            <book-add @bookAdded="addBook" />
            <book-list v-if="books" :books="booksToShow" @selected="selectBook" @remove="removeBook"/>
        </section> -->
    `,
    data() {
        return {

        }
    },
    methods: {


    },
    computed: {

    },
}