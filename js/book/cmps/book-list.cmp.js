import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    components: {
        bookPreview
    },
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book"  />
                <div class="actions">
                    <button  class="book-button" @click="remove(book.id)" >X</button>
                    <router-link class="router-link-btn" @click.native="scrollToTop" :to="'/book/'+book.id" >Details</router-link>
                </div>
            </li>
        </ul>
    `,


    methods: {
        remove(bookId) {
            this.$emit('remove', bookId);
        },
        select(book) {
            this.$emit('selected', book);
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },

};