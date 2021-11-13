import emailList from '../email/cmps/email-list.cmp.js'
import emailFilter from '../email/cmps/email-filter.cmp.js'
import emailAdd from '../email/cmps/email-add.cmp.js'
import emailActions from '../email/cmps/email-actions.cmp.js'
import {
    eventBus
} from '../services/event-bus-service.js'
import {
    emailService
} from '../email/services/email-service.js'

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
           <div class="top-mobile-container">
           <button @click="toggleActions" class="email-menu-btn"><img src="./img/menu.png" class="email-menu"></button>
           <email-filter  @filtered="setFilter"/>
           </div>
          
           <section class="main-email-page">
                <email-actions  :class="{ emailMenuOpen:isMobileAction}"  v-if="emails" :emails="emailsToShow" @stateClicked="stateClicked"/>
                <email-list v-if="emails" :emails="emailsToShow" @selected="selectEmail" @removeEmail="removeEmail" @changeStar="changeStar"/>
           </section>
          

       </section>
    `,
    data() {
        return {
            emails: null,
            selectedEmail: null,
            filterBy: null,
            stateBy: null,
            isInbox: null,
            isSent: null,
            isStar: null,
            isDraft: null,
            isMobileAction: false
        }
    },
    created() {
        this.loadEmails()

    },



    methods: {
        toggleActions() {
            this.isMobileAction = !this.isMobileAction
        },
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                })
        },
        addEmail() {
            this.loadEmails()
        },
        changeStar(isStar, id) {

            emailService.getById(id)
                .then(res => {
                    res.isStarred = isStar
                    emailService.save(res)
                })
            this.loadEmails()
        },
        removeEmail(id) {
            emailService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted succesfully',
                        type: 'success',
                        link: ''
                    };
                    eventBus.$emit('showMsg', msg);
                    this.loadEmails();
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
        selectEmail(email) {
            this.selectedEmail = email;
        },
        closeDetails() {
            this.selectedEmail = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        stateClicked(state) {
            this.isMobileAction = !this.isMobileAction
            if (state === 'isAll') this.stateBy = null
            else {
                this[state] = true
                this.stateBy = state

            }

        }
    },
    computed: {
        emailsToShow() {
            // returns emails based on the current filter
            if (!this.filterBy ||
                (!this.filterBy.subject &&
                    this.filterBy.selectOption === 'all' &&
                    !this.stateBy)
            )
                return this.emails

            const {
                subject,
            } = this.filterBy
            const searchStr = subject.toLowerCase()
            let emailsToShow

            emailsToShow = this.emails.filter((email) => {

                let ans1 = ((email.subject.toLowerCase().includes(searchStr) ||
                    email.body.toLowerCase().includes(searchStr)) || email.from.fullname.toLowerCase().includes(searchStr))
                let ans2 = (email.isRead === true && 'read' === this.filterBy.selectOption) ||
                    (email.isRead === false && 'unread' === this.filterBy.selectOption) ||
                    ('all' === this.filterBy.selectOption)
                let ans3 = ((!this.stateBy) ||
                    (this.stateBy === 'isInbox' && email.to.email === 'user@appsus.com') ||
                    (this.stateBy === 'isStar' && email.isStarred == true) ||
                    (this.stateBy === 'isSent' && email.from.email === 'user@appsus.com') ||
                    (this.stateBy === 'isDraft' && email.sentAt === 0))

                return ans1 && ans2 && ans3
            });
            if (this.filterBy.selectOption === 'sortNew' || this.filterBy.selectOption === 'sortOld') {
                emailsToShow = []
                emailsToShow = this.emails.sort((email1, email2) => {
                    if (this.filterBy.selectOption === 'sortNew') return email2.sentAt - email1.sentAt
                    if (this.filterBy.selectOption === 'sortOld') return email1.sentAt - email2.sentAt
                })

            }
            return emailsToShow;
        },


        sortEmailsForDisplay() {
            let res = this.emails
            res.sort((email1, email2) => {
                return email1.sentAt - email2.sentAt
            })

        }

    },

}