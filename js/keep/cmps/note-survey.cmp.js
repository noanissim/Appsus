const noteTxt = {
  props: ['note'],
  template: `
        <div class="text-cmp">
            <p>{{note.info.txt}}</p>
        </div>
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
const noteImg = {
  props: ['note'],
  template: `
        <section class="">
            <img class="note-img" :src="note.info.url"/>
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
          <li><span>{{note.info.label}}</span></li><br>
            <ul v-for="todo in note.info.todos">
                    <li>🔹{{todo.txt}}</li>
                </ul>
            </label>
        </div>
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

export default {
  props: ['note'],
  template: `
    <section class="note-preview">
            <component v-for="(currCmp, idx) in cmps"
                        :key="idx"
                        :is="currCmp.type" 
                        :note="note" 
                        @setInput="setInput($event, idx)">
            </component>
    </section> 
    `,
  data() {
    return {
      cmps: [
        {
          type: 'noteTxt',
          data: {
            type: 'noteTxt',
          },
        },
        {
          type: 'noteImg',
          data: {},
        },
        {
          type: 'noteTodos',
          data: {
            opts: [],
          },
        },
      ],
      answers: [],
    }
  },
  methods: {
    setInput(ev, inputIdx) {
      //   this.answers[inputIdx] = ev
      //   console.log('Survey Got ev', ev)
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
