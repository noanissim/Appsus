const noteTxt = {
  props: ['note'],
  template: `
        <div v-if="localNote" class="text-cmp">
          
          <textarea class="text-area" v-model="localNote.info.txt"><span>{{localNote.info.txt}}</span></textarea>
        </div>
    `,
  data() {
    return {
      localNote: null,
    }
  },
  created() {
    this.localNote = this.note
  },
  methods: {
    reportVal(newNote) {
      this.$emit('setInput', newNote)
    },
  },
  watch: {
    localNote: {
      deep: true,
      handler(newValue) {
        if (newValue) this.reportVal(newValue)
      },
    },
  },
}
const noteImg = {
  props: ['note'],
  template: `
        <section class="img-cmp-container">
          <div  class="img-cmp">
            <img class="note-img" :src="note.info.url"/>
          </div>
        </section>
    `,
  data() {
    return {}
  },
  methods: {
    reportVal() {
      this.$emit('setInput', this.selectedOpt)
    },
  },
}
const noteTodos = {
  props: ['note'],
  template: `
        <div class="todos-preview">
          <h4><span>{{note.info.label}}</span></h4><br>
          <button @click="toggleNewTodo">+</button>

          <ul >  
            <!-- <p>{{todoCmp.info.todos[0].txt}}</p> -->
              <li v-for="(todo,idx) in todoCmp.info.todos">
                <div class="todo-checkbox">
                  <input @change="setIsDone($event,idx)" :checked ="todo.isChecked" type="checkbox"/>
                  <input v-if="idx===currEditTodo" @blur="reportVal(idx)"  v-model="todo.txt" placeholder="What you wanna do?" type="text"/>
                  <p @click="setTodoEdit(idx)"  v-bind:class="{ checked: todo.isChecked }" v-else>{{todo.txt}}</p>
                </div>
              </li>
              <li v-if="isNewTodo">
                <input @blur="addNewTodo" v-model="todoVal.txt" type="text"/>
              </li>
            </ul>
            </label>
        </div>
    `,
  data() {
    return {
      todoCmp: null,
      todoVal: {
        txt: [],
        doneAt: Date.now(),
      },
      currEditTodo: null,
      isNewTodo: false,
    }
  },
  created() {
    this.todoCmp = JSON.parse(JSON.stringify(this.note))
  },
  methods: {
    setTodoEdit(idx) {
      this.currEditTodo = idx
      console.log(idx)
    },
    addNewTodo() {
      this.todoCmp.info.todos.push({ ...this.todoVal })
    },
    setIsDone(ev, idx) {
      this.todoCmp.info.todos[idx].isChecked = ev.target.checked
      console.log('ev', ev.target.checked)
      this.reportVal(idx)
    },
    reportVal(idx) {
      console.log('THIS ONE', this.todoCmp.info)
      for (var i = 0; i < this.todoVal.txt.length; i++) {
        this.todoCmp.info.todos[0] = this.todoVal
      }
      console.log('todoCMP', this.todoCmp)
      this.$emit('setInput', this.todoCmp)
    },
    toggleNewTodo() {
      this.isNewTodo = !this.isNewTodo
    },
  },
}

export default {
  props: ['note'],
  template: `
    <section  class="note-preview">
            <component
                        :is="note.type" 
                        :note="note" 
                        @setInput="setInput">
            </component>
    </section> 
    `,
  data() {
    return {}
  },
  methods: {
    setInput(noteId) {
      this.$emit('setInput', noteId)
    },
    save() {
      console.log('Survey Answers', this.answers)
    },
  },
  created() {},
  computed: {},
  components: {
    noteTxt,
    noteImg,
    noteTodos,
  },
}