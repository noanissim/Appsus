import {
    emailService
} from '../services/email-service.js';

export default {
    template: `
        <section class="email-edit app-main">
            <h3>Add a new email</h3>
            <form v-if="emailToEdit" @submit.prevent="save" >
                <input v-model="emailToEdit.to.fullname" type="text" placeholder="to">
                <input v-model="emailToEdit.subject" type="text" placeholder="subject">
                <input v-model="emailToEdit.body" type="text" placeholder="body">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            emailToEdit: null
        };
    },
    created() {
        const {
            emailId
        } = this.$route.params;
        if (emailId) {
            emailService.getById(emailId)
                .then(email => this.emailToEdit = email);
            //to the drafts
        } else {
            this.emailToEdit = emailService.getEmptyEmail();
        }
    },
    methods: {
        save() {
            emailService.saveSentEmails(this.emailToEdit)
                .then(email => this.$router.push('/email'));
        }
    }
};