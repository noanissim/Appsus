import longText from "../../cmps/long-text-cmp.js"


export default {
    props: ['email'],
    components: {
        longText
    },
    template: `
        <div class="email-preview" @click="emailClicked">
            <div :class="isEmailReadImg" class="email-preview-data">
            
            <span class="fa fa-star star-img" :class="{checked:isStar, unChecked:!isStar}" @click.stop="changeColor(email.id)"></span>

            <img class="email-img" v-if="!email.isRead"  src="../../../img/email/mail.png">
            <img  class="email-img"  v-else src="../../../img/email/open-envelope.png">

            <p><strong>From:</strong> {{email.from.fullname}}</p>            
            <p>{{email.subject}}</p>
            <long-text :txt="email.body"></long-text>
            <p>Is read: {{email.isRead}}</p>           
            <!-- <p>Is starred: {{email.isStarred}}</p>   -->
            <p>Sent at: {{convertToTimeShort}}</p>
           
            </div>
            <div :class="isEmailReadImg" class="actions-email-preview">
                    <button @click="removeEmail(email.id)" >Delete</button>
                    <!-- <button @click="select(email)" >Details</button> -->
                    <router-link :isStar="isStar"  class="btn btn-open-email" @click.native="scrollToTop" :to="'/email/'+email.id">Open</router-link>
            </div>
        </div>
    `,
    data() {
        return {
            isStar: this.email.isStarred
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
            // console.log(ev);
            // this.email.isRead = true
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