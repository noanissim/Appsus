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
                <email-preview :email="email" @removeEmail="removeEmail" @changeStar="changeStar" />
                
            </li>
        </ul>
    </section>
    `,


    methods: {


        scrollToTop() {
            window.scrollTo(0, 0);
        },
        removeEmail(emailId) {
            this.$emit('removeEmail', emailId);
        },
        changeStar(isStar, id) {
            this.$emit('changeStar', isStar, id);
        }
    },

};