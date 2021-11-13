import longText from "../../cmps/long-text-cmp.js"
import emailExpand from "../cmps/email-expand.cmp.js"
import emailLongText from "../cmps/email-long-text.cmp.js"



export default {
    props: ['email'],
    components: {
        longText,
        emailExpand,
        emailLongText
    },
    template: `
        <div class="email-preview" @click="emailClicked">
            <div :class="isEmailReadImg" class="email-preview-data">
            <div class="star-area area-in-preview">
                <span class="fa fa-star star-img" :class="{'checked-star':isStar, 'unChecked-star':!isStar}" @click.stop="changeColor(email.id)"></span>
            </div>
            <div class="from-area area-in-preview">
                <p>{{email.from.fullname}}</p>            
            </div>
            <div class="subject-area area-in-preview">
                <p>{{email.subject}}</p>
            </div>
            <div class="body-area area-in-preview">
                <email-long-text :txt="email.body"></email-long-text>
            </div>
            <!-- <p>Is read: {{email.isRead}}</p>            -->
            <!-- <p>Is starred: {{email.isStarred}}</p>   -->
            <div class="time-area area-in-preview">
                <p>{{convertToTimeShort}}</p>
            </div>
            <!-- <img class="email-img" v-if="!email.isRead"  src="../../../img/email/mail.png"> -->
            <!-- <img  class="email-img"  v-else src="../../../img/email/open-envelope.png"> -->
            <!-- <div :class="isEmailReadImg" class="actions-email-preview"> -->
                    <!-- <button @click="removeEmail(email.id)" >Delete</button> -->
                    <!-- <button @click="select(email)" >Details</button> -->
            <!-- </div> -->
            </div>
           <email-expand :email="email" v-if="isExpand" @removeEmail="removeEmail"></email-expand>
        </div>
    `,
    data() {
        return {
            isStar: this.email.isStarred,
            isExpand: false,
        }
    },

    methods: {
        removeEmail(emailId) {
            this.$emit('removeEmail', emailId);
        },
        select(email) {
            this.$emit('selectedEmail', email);
        },
        scrollToTop() {
            window.scrollTo(0, 0);


        },
        emailClicked(ev) {
            ev.stopPropagation();
            this.isExpand = !this.isExpand
            console.log(this.isExpand);
            console.log(this.email);
        },
        changeColor(emailId) {
            this.isStar = !this.isStar
            this.$emit('changeStar', this.isStar, emailId);

        }
    },
    computed: {
        convertToTime() {
            const event = new Date(this.email.sentAt).toLocaleString('he', {
                hour12: false,
            })
            return event
        },
        isEmailReadImg() {
            return (this.email.isRead) ? 'email-is-read' : ''
        },
        convertToTimeShort() {
            var date = new Date(parseInt(this.email.sentAt));
            return date.toLocaleTimeString(navigator.language, {
                hour: '2-digit',
                minute: '2-digit',
            });
        }

    }
}