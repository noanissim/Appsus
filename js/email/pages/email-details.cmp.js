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
            <!-- <p :isRead="isEmailRead">Is read: {{email.isRead}}</p> -->
            <p>Sent at: {{convertToTime}}</p>
            <!-- <p>Id: {{email.id}}</p> -->
            <!-- <p>Star?{{email.isStarred}} </p> -->
            <!-- <p>Star?{{isStar}} {{checkIfIsStarred}}</p> -->
            <span class="fa fa-star star-img" :class="{'checked-star':email.isStarred, 'unChecked-star':!email.isStarred}" @click="changeColor"></span>

            <div class="actions-email-preview">
                    <button title="Delete" class="clean-btn btn-delete-email" @click="removeEmail(email.id)" >
                        <img class="action-img" src="./img/email/delete.png">
                    </button>
                    <button class="clean-btn" title="Note">
                        <img class="action-img" src="./img/email/edit.png">
                    </button>
                    <router-link title="Go back"  class="btn btn-close-email" @click.native="scrollToTop" to="/email">
                        <img class="action-img" src="./img/email/return.png">
                    </router-link>

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
                email.isRead = true
                this.email = email
                emailService.save(email)
                // if (email.isRead === true)
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
        changeColor() {
            // this.review.rate = num;

            // this.email.isStarred = true
            // console.log('hello', this.email)
        }
    },
    computed: {
        convertToTime() {
            const event = new Date(this.email.sentAt).toLocaleString('he', {
                hour12: false,
            })
            return event
        },
        isEmailRead() {
            // console.log(this.email.isRead);
        },
        checkIfIsStarred() {
            return emailService.getById(this.email.id)
                .then(res => {
                    console.log(res);
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