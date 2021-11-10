export default {
    template: `
        <div class="email-filter">
            <label>Search: </label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search">
            <!-- <input @input="filter" v-model.number="filterBy.fromPrice" type="number" placeholder="Min price"> -->
            <!-- <input @input="filter" v-model.number="filterBy.toPrice" type="number" placeholder="Max price"> -->
        </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
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