import {
    eventBus
} from '../services/event-bus-service.js';

export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
            <router-link :to="msg.link" @click.native="scrollToTop">Go back to all books list</router-link>
        </div>
        <div v-if="msgAdd" class="user-msg" :class="msgAdd.type" >
            <p>{{msgAdd.txt}}</p>
            <router-link :to="msgAdd.link" @click.native="scrollToTop">Click here to open the book details</router-link>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null,
            msgAdd: null
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
        eventBus.$on('showMsgOnAddBook', this.showMsgOnAddUser);
        this.scrollToTop()
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
        showMsgOnAddUser(msg) {
            this.msgAdd = msg;
            setTimeout(() => {
                this.msgAdd = null;
            }, 3000);
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
        eventBus.$off('showMsgOnAddBook', this.showMsgOnAddUser);
    }

};