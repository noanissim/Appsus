import emailList from '../email/cmps/email-list.cmp.js'
import emailFilter from '../email/cmps/email-filter.cmp.js'
import emailAdd from '../email/cmps/email-add.cmp.js'
import emailActions from '../email/cmps/email-actions.cmp.js'
import { eventBus } from '../services/event-bus-service.js'
import { emailService } from '../email/services/email-service.js'

export default {
  props: [''],
  components: {
    emailList,
    emailFilter,
    emailAdd,
    emailActions,
  },
  template: `
       <section class="app-main app-email">
           <h1>app-email</h1>
           <email-filter @filtered="setFilter"/>
           <section class="main-email-page">
                <email-actions  v-if="emails" :emails="emailsToShow"/>
                <email-list v-if="emails" :emails="emailsToShow" @selected="selectEmail" @removeEmail="removeEmail"/>
           </section>
           <!-- actions  any item is a new route -(stars-filter) -->
           <!-- emails list  preview  details -->

       </section>
    `,
  data() {
    return {
      emails: null,
      selectedEmail: null,
      filterBy: null,
    }
  },
  created() {
    this.loadEmails()
    // this.emails = emailservice.query()
  },

  methods: {
    loadEmails() {
      emailService.query().then(emails => {
        console.log(emails)
        this.emails = emails
      })
    },
    addEmail() {
      this.loadEmails()
    },
    removeEmail(id) {
      console.log(id, 'hereeeee')
      emailService
        .remove(id)
        .then(() => {
          const msg = {
            txt: 'Deleted succesfully',
            type: 'success',
            link: '/email',
          }
          eventBus.$emit('showMsg', msg)
          this.loadEmails()
        })
        .catch(err => {
          console.log('err', err)
          const msg = {
            txt: 'Error. Please try later',
            type: 'error',
          }
          eventBus.$emit('showMsg', msg)
        })
    },
    selectEmail(email) {
      this.selectedEmail = email
    },
    closeDetails() {
      this.selectedEmail = null
    },
    setFilter(filterBy) {
      this.filterBy = filterBy
    },
  },
  computed: {
    emailsToShow() {
      // returns emails based on the current filter
      if (!this.filterBy) return this.emails
      const { subject } = this.filterBy
      const searchStr = subject.toLowerCase()
      const emailsToShow = this.emails.filter(email => {
        return (
          email.subject.toLowerCase().includes(searchStr) ||
          email.body.toLowerCase().includes(searchStr)
        )
      })
      return emailsToShow
    },
    emailsCount() {
      console.log(this.emails.length)
    },
  },
}
