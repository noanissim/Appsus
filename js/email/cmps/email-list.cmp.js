import emailPreview from "./email-preview.cmp.js";

export default {
    props: ['emails'],
    components: {
        emailPreview
    },
    template: `
    <section class="email-list">
        <ul class="email-list-ul">
            <li v-for="email in emails" :key="email.id" class="email-preview-container" >
                <email-preview :email="email" @removeEmail="removeEmail" />
                
            </li>
        </ul>
    </section>
    `,

    destroyed() {
        console.log('destroyed')
    },
    methods: {

        log(emailId) {
            console.log('Logging.....', emailId);
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        removeEmail(emailId) {
            console.log(emailId, 'i remove this');
            this.$emit('removeEmail', emailId);
        },
    },

};