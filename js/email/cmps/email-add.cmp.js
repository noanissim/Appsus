import {
  emailService
} from '../services/email-service.js'
import {
  eventBus
} from '../../services/event-bus-service.js'

export default {
  template: `
        <section class="email-edit app-main">
            <div class="email-edit-container">
                <div class="compose-message-header">
                    <h3>New Message</h3>
                    <router-link title="Cancel(saved as draft)"  class="btn btn-cancel-email" @click.native="scrollToTop" to="/email">
                        <img class="action-img" src="./img/email/cancel (1).png">
                    </router-link>
                </div>
           
            <form v-if="emailToEdit" @submit.prevent="save" >
                <input v-model="emailToEdit.to.fullname" type="text" placeholder="To">
                <input v-model="emailToEdit.subject" type="text" placeholder="Subject">
                <textarea class="body-input" v-model="emailToEdit.body" type="text" placeholder="Your Message"></textarea>
                <button class="btn-send">Send</button>
                <router-link title="Delete"  class="btn btn-close-email" @click.native="scrollToTop" to="/email">
                        <img class="action-img" src="./img/email/delete.png">
                </router-link>
            </form>
            </div>
            
        </section>
    `,
  data() {
    return {
      emailToEdit: null,
    }
  },

  created() {
    const {
      emailId
    } = this.$route.params
    if (emailId) {
      emailService.getById(emailId).then(email => (this.emailToEdit = email))
      //to the drafts
    } else {
      this.emailToEdit = emailService.getEmptyEmail()


      const {
        body
      } = this.$route.params;
      if (body) {
        this.emailToEdit = emailService.getEmptyEmail()
        this.emailToEdit.body = 'Sent from notes: ' + body
      }

    }
  },

  methods: {
    save() {
      emailService
        .saveSentEmails(this.emailToEdit)
        .then(email => this.$router.push('/email'))
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
  },
}