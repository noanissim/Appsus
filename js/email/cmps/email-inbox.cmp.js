import {
    emailService
} from '../services/email-service.js';

export default {
    template: `
        <section class="email-inbox app-main">
            <h3>inbox</h3>
          
        </section>
    `,
    data() {
        return {

        };
    },
    created() {
        // const {
        //     emailId
        // } = this.$route.params;
        // if (emailId) {
        //     emailService.getById(emailId)
        //         .then(email => this.emailToEdit = email);
        //     //to the drafts
        // } else {
        //     this.emailToEdit = emailService.getEmptyEmail();
        // }
    },
    methods: {
        // save() {
        //     emailService.saveSentEmails(this.emailToEdit)
        //         .then(email => this.$router.push('/email'));
        // }
    }
};