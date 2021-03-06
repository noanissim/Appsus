import {
    bookService
} from '../services/book-service.js';
import {
    eventBus
} from "../../services/event-bus-service.js";
import {
    utilService
} from '../../services/util-service.js'


export default {
    template: `
        <section class=" book-add">
            <h3>Add a new book</h3>

              <input v-model="searchVal" @input="search"  type="text" placeholder="Add a new book">
              <button class="btn-search book-button">Search</button> <!--just for user experience -->

            <section v-if="books" class="books-options">
                <ul class="clean-list" v-for="(book,idx) in books">
                    <li>
                        {{book.title}} 
                        {{idx}}
                        <button class="book-button" @click="addBook(idx)">add</button>
                    </li> 
                    
                </ul>
            </section>
        
        </section>
    `,
    data() {
        return {
            books: null,
            searchVal: null,
            currBook: null
        };
    },
    created() {
        this.search = utilService.debounce(this.search, 3000)
    },

    methods: {


        search() {

            if (!this.searchVal) {
                this.books = null
                return
            }
            bookService.getGoogleBooks(this.searchVal)
                .then(books => {
                    this.books = books
                })

        },
        addBook(idx) {
            this.currBook = this.books[idx]
            bookService.saveBookFromGoogle(this.currBook)
                .then(res => {
                    this.$emit('bookAdded')
                    this.books = null
                    this.searchVal = null
                    const msg = {
                        txt: 'Added successfully',
                        type: 'success',
                        link: `/book/${this.currBook.id}`
                    }
                    eventBus.$emit('showMsgOnAddBook', msg);
                })
                .catch(err => {
                    const msg = {
                        txt: err,
                        type: 'error'
                    }
                    eventBus.$emit('showMsgOnAddBook', msg);
                })
        }
    }
};