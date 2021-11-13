export default {
    template: `
        <div class="email-filter ">
           
            <input @input="filter" v-model="filterBy.subject" type="text" placeholder="Search" class="search-input">
            
            <select class="select-dropdown" @change="filter" v-model="filterBy.selectOption">
                <option class="option" value="all">All</option>
                <option class="option" value="read">Read</option>
                <option class="option" value="unread">Unread</option>
                <option class="option" value="sortNew">From new to old</option>
                <option class="option" value="sortOld">From old to new</option>
            </select>
            
        </div>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                selectOption: 'all',
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', {
                ...this.filterBy
            });

            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        },

    }
}