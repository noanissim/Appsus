export default {
    props: ['emails'],
    components: {

    },
    template: `
    <section class="email-actions">
        <router-link class="btn btn-compose" to="/email/add">+ Compose</router-link>
        <button>inbox</button>
        <button>starred</button>
        <button>sent emails</button>
        <button>drafts</button>
        
        <p>{{unreadCountFunc}}</p>

    </section>
    `,
    data() {
        return {
            // count: null
        }
    },
    created() {
        // this.count = this.unreadCount
        // console.log(this.count);

    },

    methods: {

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
            let res = ((count / countAll) * 100).toFixed(2) + '%'
            return res
        }
    }

};