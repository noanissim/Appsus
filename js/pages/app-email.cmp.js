import emailList from '../email/cmps/email-list.cmp.js'
import emailFilter from '../email/cmps/email-filter.cmp.js'
import emailAdd from '../email/cmps/email-add.cmp.js'
// import {
//     eventBus
// } from '../services/event-bus-service.js';
// import {
//     emailService
// } from '../email/services/email-service.js';


export default {
    props: [''],
    components: {
        emailList,
        emailFilter,
        emailAdd


    },
    template: `
       <section class="app-main">
           <h1>app-email</h1>
           <!-- <header></header> -->
           <!-- search -->
           <!-- actions  any item is a new route -(stars-filter) -->
           <!-- emails list  preview  details -->

       </section>
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