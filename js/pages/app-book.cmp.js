import bookList from '../book/cmps/book-list.cmp.js';
import bookFilter from '../book/cmps/book-filter.cmp.js'
import bookAdd from '../book/cmps/book-add.cmp.js'
import {
    eventBus
} from '../services/event-bus-service.js';
import {
    bookService
} from '../book/services/book-service.js';


export default {
    props: [''],
    components: {
        bookList,
        bookFilter,
        bookAdd,


    },
    template: `
        <section class="book-app app-main">
            <book-filter @filtered="setFilter"/>
            <!-- <router-link to="/book/add">Add a new book</router-link> -->
            <book-add @bookAdded="addBook" />
            <book-list v-if="books" :books="booksToShow" @selected="selectBook" @remove="removeBook"/>
        </section>
    `,
    data() {
        return {
            books: null,
            selectedBook: null,
            filterBy: null
        };
    },
    created() {
        this.loadBooks()

    },

    methods: {
        loadBooks() {
            bookService.query()
                .then(books => {
                    this.books = books
                })
        },
        addBook() {
            this.loadBooks()
        },
        removeBook(id) {
            bookService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted succesfully',
                        type: 'success',
                        link: '/book'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.loadBooks();
                })
                .catch(err => {
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
        selectBook(book) {
            this.selectedBook = book;
        },
        closeDetails() {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            // returns books based on the current filter
            const filter = this.filterBy
            if (!filter) return this.books;
            let name = filter.name
            let fromPrice = filter.fromPrice
            let toPrice = filter.toPrice
            let isName = true
            let isMin = true
            let isMax = true
            return this.books.filter(book => {

                if (name && name.length) {
                    let searchStr = filter.name.toLowerCase();
                    isName = book.title.toLowerCase().includes(searchStr);
                }
                if (fromPrice) {
                    isMin = book.listPrice.amount >= fromPrice
                }
                if (toPrice) {
                    isMax = book.listPrice.amount <= toPrice
                }
                return isName && isMin && isMax
            });
        }
    },
};