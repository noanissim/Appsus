export default {
    props: ['txt'],
    template: `
        <div class="long-text">
            <p>
                <span>{{showText}} 
                    <span 
                        v-if="isTextLong" 
                       >...
                    </span>
                    
                </span>
            </p>
           
            
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        showText() {
            let strLength = this.txt.length
            if (strLength < 10 || this.isFull) return this.txt

            let strShort = this.txt.slice(0, 10)
            return strShort
        },
        isTextLong() {
            return (!this.isFull && this.txt.length > 10)
        },

    },
}