import {
    emailService
} from '../services/email-service.js';

export default {
    props: ['email'],
    template: `
        <div class="email-expand" @click.stop="expandClick">
            <h3>{{email.subject}}</h3>
            <div class="user-details">
            <div class="contact-user" :style="{'background-color':getColor}">{{showFirstLetter}}</div>
            <p > 
                <strong>{{email.from.fullname}}</strong> 
                <{{email.from.email}}>
            </p>
            </div>
           
            <!-- <p>To: {{email.to.fullname}}, {{email.to.email}}</p> -->
            <p>{{email.body}}</p>
            <!-- <p>Is read: {{email.isRead}}</p> -->
            <!-- <p>Sent at: {{convertToTime}}</p> -->
            <!-- <p>Id: {{email.id}}</p> -->
            <!-- <p>Star?{{email.isStarred}} </p> -->
           <!-- <p>Star?{{isStar}} {{checkIfIsStarred}}</p> -->
           <!-- <span class="fa fa-star star-img" :class="{'checked-star':email.isStarred, 'unChecked-star':!email.isStarred}"></span> -->
            <div class="actions-email-expand">
                    <button title="Delete" class="clean-btn btn-delete-email" @click="removeEmail2(email.id)" >
                        <img class="action-img" src="./img/email/delete.png">
                    </button>
                    <!-- <button @click="select(email)" >Details</button> -->
                    <router-link title="Expand"  class="btn btn-open-email" @click.native="scrollToTop" :to="'/email/'+email.id">
                        <img class="action-img" src="./img/email/expand.png">
                    </router-link>

            </div>
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        expandClick() {
            console.log('expand click');
        },
        closeDetails() {
            this.$router.push('/email') //move to another pagebu

        },
        removeEmail(emailId) {
            emailService.remove(emailId)
                .then(res => {
                    this.$router.push('/email')
                })

        },
        removeEmail2(emailId) {
            this.$emit('removeEmail', emailId);
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