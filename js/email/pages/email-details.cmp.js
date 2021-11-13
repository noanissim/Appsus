import {
    emailService
} from '../services/email-service.js';
// import {
//     eventBus
// } from "../services/event-bus-service.js";


export default {
    props: ['isStar'],
    components: {

    },
    template: `
        <section v-if="email" class="email-details app-main">
           <div class="email-details-box">
           <h3>{{email.subject}}</h3>
            <div class="user-details">
            <div class="contact-user" :style="{'background-color':getColor}">{{showFirstLetter}}</div>
            <p > 
                <strong>{{email.from.fullname}}</strong> 
                <{{email.from.email}}>
            </p>
            </div>
            <p>To: {{email.to.fullname}}, {{email.to.email}}</p>
            <p>{{email.body}}</p>
           
            <p>Sent at: {{convertToTime}}</p>
           
           
            
            <span class="fa fa-star star-img" :class="{'checked-star':email.isStarred, 'unChecked-star':!email.isStarred}"></span>

            <div class="actions-email-preview">
                    <button title="Delete" class="clean-btn btn-delete-email" @click="removeEmail(email.id)" >
                        <img class="action-img" src="./img/email/delete.png">
                    </button>
                    <router-link class="clean-btn" title="Note"  @click.native="scrollToTop" :to="'/keep/'+email.id+'/'+email.subject+'/'+email.from.fullname+'/'+email.body">
                        <img class="action-img" src="./img/email/edit.png">
                    </router-link>
                    <router-link title="Go back"  class="btn btn-close-email" @click.native="scrollToTop" to="/email">
                        <img class="action-img" src="./img/email/return.png">
                    </router-link>

            </div>
            </div>
          
        </section>
        <section v-else class="loader app-main">
            <h2>Loading...</h2>
        </section>
    `,
    data() {
        return {
            email: null,

        }
    },
    watch: {
        '$route.params.emailId': {
            handler() {
                const {
                    emailId
                } = this.$route.params;

                emailService.getById(emailId)
                    .then(email => this.email = email);

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
                email.isRead = true
                this.email = email
                emailService.save(email)

            })

    },
    methods: {
        closeDetails() {
            this.$router.push('/email') //move to another pagebu

        },
        removeEmail(emailId) {

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
        },

        checkIfIsStarred() {
            return emailService.getById(this.email.id)
                .then(res => {
                    return res.isStarred
                })
        },
        showFirstLetter() {
            let name = this.email.from.fullname
            return name.substring(0, 1)
        },
        getColor() {
            let randomColor = Math.floor(Math.random() * 16777215).toString(16);
            return '#' + randomColor
        }
    }
}