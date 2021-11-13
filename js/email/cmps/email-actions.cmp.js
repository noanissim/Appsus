import {
    eventBus
} from '../../services/event-bus-service.js';
// import {
//     eventBus
// } from '../../../img/email/send-message.png';


export default {
    props: ['emails'],
    components: {

    },
    template: `
    <section class="email-actions">
        <div class=" email-actions-container">

                <router-link class="btn btn-action btn-compose" to="/email/add">
                <img src="./img/email/plus.png" class="action-img">    
                Compose</router-link>

                <button class="btn btn-action" :class="{clicked:state.isAll}"  @click="setFilterAll">
                <div class="btn-info">
                    <img src="./img/email/mail (2).png" class="action-img">    
                    All
                    {{countAll}}
                </div>
                </button>

                <button class="btn btn-action" :class="{clicked:state.isInbox}" @click="setFilterInbox">
                <div class="btn-info">
                    <img src="./img/email/inbox.png" class="action-img">    
                    Inbox
                    {{countInbox}}
                </div>
                </button>

                <button class="btn btn-action" :class="{clicked:state.isStar}" @click="setFilterStarred">
                <div class="btn-info">
                    <img src="./img/email/star.png" class="action-img">    
                    Starred
                    {{countStarred}}
                </div>
                </button>

                <button class="btn btn-action" :class="{clicked:state.isSent}" @click="setFilterSent">
                <div class="btn-info">
                    <img src="./img/email/mail (1).png" class="action-img">    
                    Sent
                    {{countSent}}
                </div>
                </button>

                <button class="btn btn-action" :class="{clicked:state.isDraft}" @click="setFilterDrafts">
                <div class="btn-info">
                    <img src="./img/email/draft.png" class="action-img">    
                    Drafts
                    {{countDrafts}}
                </div>
                </button>

                <div class="progress-p">{{unreadCountFunc}}% unread emails</div>
                <div id="myProgress">
                    <div id="myBar" :style="calcStyle"></div>
                </div>
            
        </div>

       
    </section>
    `,
    data() {
        return {
            count: null,
            styleBar: 100,
            state: {
                isInbox: false,
                isAll: false,
                isStar: false,
                isSent: false,
                isDraft: false

            }
        }
    },
    created() {
        // this.count = this.unreadCount
        // console.log(this.count);

    },
    methods: {
        setFilterAll() {
            this.state.isAll = true
            this.state.isInbox = false
            this.state.isStar = false
            this.state.isSent = false
            this.state.isDraft = false
            // console.log(this.state.isInbox);
            this.$emit('stateClicked', 'isAll')

        },
        setFilterInbox() {
            this.state.isInbox = true
            this.state.isStar = false
            this.state.isSent = false
            this.state.isDraft = false
            this.state.isAll = false
            // console.log(this.state.isInbox);
            this.$emit('stateClicked', 'isInbox')

        },
        setFilterStarred() {
            this.state.isStar = true
            this.state.isInbox = false
            this.state.isSent = false
            this.state.isDraft = false
            this.state.isAll = false
            // console.log(this.state.isStar);
            this.$emit('stateClicked', 'isStar')

        },
        setFilterSent() {
            this.state.isSent = true
            this.state.isStar = false
            this.state.isInbox = false
            this.state.isDraft = false
            this.state.isAll = false
            // console.log(this.state.isSent);
            this.$emit('stateClicked', 'isSent')

        },
        setFilterDrafts() {
            this.state.isDraft = true
            this.state.isInbox = false
            this.state.isStar = false
            this.state.isSent = false
            this.state.isAll = false
            // console.log(this.state.isDraft);
            this.$emit('stateClicked', 'isDraft')

        },


    },
    computed: {

        showCount() {
            return this.unreadCount
        },
        unreadCountFunc() {
            let count = 0
            let countAll = 0
            this.emails.forEach(email => {

                if (!email.isRead) count++
                countAll++
            })

            this.count = ((count / countAll) * 100).toFixed(2)
            // console.log(count);
            return this.count
        },
        calcStyle() {
            return `width:${this.count}%;`
        },
        countAll() {
            return this.emails.length
        },
        countInbox() {
            let count = 0
            this.emails.forEach(email => {
                if (email.to.fullname === 'Appsus Admin') count++
            })
            return count
        },
        countStarred() {
            let count = 0
            this.emails.forEach(email => {
                if (email.isStarred) count++
            })
            return count
        },
        countSent() {
            let count = 0
            this.emails.forEach(email => {
                if (email.sentAt > 0) count++
            })
            return count
        },
        countDrafts() {
            let count = 0
            this.emails.forEach(email => {
                if (email.sentAt === 0) count++
            })
            return count
        }


    }

};