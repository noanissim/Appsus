export default {
    template: `
        <div class="email-filter">
            <label>Search: </label>
            <input @input="filter" v-model="filterBy.subject" type="text" placeholder="Search">
        </div>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                // fromPrice: 0,
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
            console.log(JSON.parse(JSON.stringify(this.filterBy)));
            this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
}