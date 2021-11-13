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
           <!-- actions  any item is a new route -(stars-filter) -->
           <!-- emails list  preview  details -->

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
        // this.emails = emailservice.query()
    },



    methods: {
        toggleActions() {
            console.log('toggle actions');
            this.isMobileAction = !this.isMobileAction
        },
        loadEmails() {
            emailService.query()
                .then(emails => {
                    this.emails = emails
                    console.log(emails);
                })
        },
        addEmail() {
            this.loadEmails()
        },
        changeStar(isStar, id) {
            console.log(isStar, 'thats good');
            console.log(id, 'thats good');
            emailService.getById(id)
                .then(res => {
                    console.log(res);
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
                    console.log('err', err);
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
            console.log(state);
            if (state === 'isAll') this.stateBy = null
            else {
                this[state] = true
                this.stateBy = state
                console.log('this.stateBy', this.stateBy);
                // console.log(this.isInbox);
            }

        }
    },
    computed: {
        emailsToShow() {
            // returns emails based on the current filter
            console.log(this.filterBy);
            if (!this.filterBy ||
                (!this.filterBy.subject &&
                    this.filterBy.selectOption === 'all' &&
                    !this.stateBy)
            )
                return this.emails

            const {
                subject,
            } = this.filterBy
            console.log(subject);
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
                // console.log(ans1);
                // console.log(ans2);
                return ans1 && ans2 && ans3
            });
            if (this.filterBy.selectOption === 'sortNew' || this.filterBy.selectOption === 'sortOld') {
                console.log('works');
                emailsToShow = []
                emailsToShow = this.emails.sort((email1, email2) => {
                    if (this.filterBy.selectOption === 'sortNew') return email2.sentAt - email1.sentAt
                    if (this.filterBy.selectOption === 'sortOld') return email1.sentAt - email2.sentAt
                })

            }
            console.log('emailsToShow', emailsToShow);
            return emailsToShow;
        },

        emailsCount() {
            console.log(this.emails.length);
        },

        setFilterInbox(ev, par) {
            console.log('bla');
            console.log(ev);
            console.log(par);
        },
        sortEmailsForDisplay() {
            let res = this.emails
            res.sort((email1, email2) => {
                return email1.sentAt - email2.sentAt
            })
            console.log(res);
            // return res
        }

    },

}


// let ans3
// console.log('this.stateBy', this.stateBy);
// if (!this.stateBy) {
//     console.log('no state');
//     ans3 = email
// }

// if (this.stateBy === 'isInbox' && email.to === 'user@appsus.com') {
//     ans3 = email
//     console.log('isInbox');
//     console.log(email.to);

// } else if (this.stateBy === 'isStar' && email.isStarred == true) {
//     ans3 = email
//     console.log('isStar');
//     console.log(email.isStarred);

// } else if (this.stateBy === 'isSent' && email.from === 'user@appsus.com') {
//     console.log('isSent');
//     ans3 = email
//     console.log(email.sentAt);

// } else if (this.stateBy === 'isDraft' && email.sentAt === 0) {
//     console.log('isDraft');
//     ans3 = email
//     console.log(email.sentAt);
// }