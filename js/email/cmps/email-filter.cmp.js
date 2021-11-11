export default {
    template: `
        <div class="email-filter">
           
            <label>Search: </label>
            <input @input="filter" v-model="filterBy.subject" type="text" placeholder="Search">
            <select @change="filter" v-model="filterBy.selectOption">
                <option value="all">All</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
            </select>
            
        </div>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                selectOption: 'all',
                // toPrice: Infinity,
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {
                ...this.filterBy
            });
            //deep copy
            console.log(this.filterBy.selectOption);
            console.log(JSON.parse(JSON.stringify(this.filterBy)));
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        },

    }
}