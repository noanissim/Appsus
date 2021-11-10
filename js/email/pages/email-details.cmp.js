import {
    emailService
} from '../services/email-service.js';
// import {
//     eventBus
// } from "../services/event-bus-service.js";


export default {
    props: [''],
    components: {

    },
    template: `
        <section v-if="email" class="email-details app-main">
           <div class="email-details-box">

            <p>Subject: {{email.subject}}</p>
            <p>From: {{email.from}}</p>
            <p>{{email.body}}</p>
            <!-- <p>Is read: {{email.isRead}}</p> -->
            <!-- <p>Sent at: {{convertToTime}}</p> -->
            <!-- <p>Id: {{email.id}}</p> -->
            <div class="actions-email-preview">
                    <button @click="removeEmail(email.id)" >Delete</button>
                    <button>Save as note</button>
                    <!-- <button @click="select(email)" >Details</button> -->
                    <router-link @click.native="scrollToTop" to="/email" >Go back</router-link>
            </div>
            </div>
           <!-- <router-link to="/email">Go back</router-link> -->
        </section>
        <section v-else class="loader app-main">
            <h2>Loading...</h2>
        </section>
    `,
    data() {
        return {
            email: null,

            // nextemailId: null,
            // previousemailId: null
        }
    },
    watch: {
        '$route.params.emailId': {
            handler() {
                const {
                    emailId
                } = this.$route.params;
                console.log('emailId', emailId);
                emailService.getById(emailId)
                    .then(email => this.email = email);
                // emailService.getNextemailId(emailId)
                //     .then(emailId => this.nextemailId = emailId);
                // emailService.getPrevemailId(emailId)
                //     .then(emailId => this.previousemailId = emailId);
            },
            immediate: true
        }
    },
    created() {
        const {
            emailId
        } = this.$route.params; //get info on the curr location
        emailService.getById(emailId)
            .then(email => {

                this.email = email
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        closeDetails() {
            this.$router.push('/email') //move to another pagebu
        },
        removeEmail(emailId) {
            console.log('not deleteing');
            emailService.remove(emailId)
                .then(res => {
                    this.$router.push('/email')
                })
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
    },
    computed: {
        convertToTime() {
            const event = new Date(this.email.sentAt).toLocaleString('he', {
                hour12: false,
            })
            return event
        }
    }
}