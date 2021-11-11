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
        <div class="email-actions-container">

                <router-link class="btn btn-action btn-compose" to="/email/add">
                <img src="../../../img/email/plus.png" class="action-img">    
                Compose</router-link>

                <button class="btn btn-action" :class="{clicked:state.isAll}"  @click="setFilterAll">
                <img src="../../../img/email/mail (2).png" class="action-img">    
                All</button>

                <button class="btn btn-action" :class="{clicked:state.isInbox}" @click="setFilterInbox">
                <img src="../../../img/email/inbox.png" class="action-img">    
                Inbox</button>

                <button class="btn btn-action" :class="{clicked:state.isStar}" @click="setFilterStarred">
                <img src="../../../img/email/star.png" class="action-img">    
                Starred</button>

                <button class="btn btn-action" :class="{clicked:state.isSent}" @click="setFilterSent">
                <img src="../../../img/email/mail (1).png" class="action-img">    
                Sent</button>

                <button class="btn btn-action" :class="{clicked:state.isDraft}" @click="setFilterDrafts">
                <img src="../../../img/email/draft.png" class="action-img">    
                Drafts</button>

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


    }

};