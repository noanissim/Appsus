import longText from "../../cmps/long-text-cmp.js"


export default {
    props: ['email'],
    components: {
        longText
    },
    template: `
        <div class="email-preview" @click="emailClicked">
            <div class="email-preview-data">
            <img class="email-img" v-if="email.isRead" :class="" src="../../../img/email/mail.png">
            <img  class="email-img"  v-else src="../../../img/email/open-envelope.png">
            <p>From: {{email.from}}</p>            
            <p>To: {{email.to}}</p>            
            <p>Subject: {{email.subject}}</p>
            <long-text :txt="email.body"></long-text>
            <!-- <p>Is read: {{email.isRead}}</p> -->
            <p>Sent at: {{convertToTime}}</p>
            <!-- <p>Id: {{email.id}}</p> -->
           
            </div>
            <div class="actions-email-preview">
                    <button @click="removeEmail(email.id)" >Delete</button>
                    <!-- <button @click="select(email)" >Details</button> -->
                    <router-link @click.native="scrollToTop" :to="'/email/'+email.id" >Open</router-link>
            </div>
        </div>
    `,
    data() {
        return {

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
            console.log(ev);
        }
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