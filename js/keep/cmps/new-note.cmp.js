import { notesService } from '../services/note-service.js'
export default {
  template: `
            <div class="note-filter">
                <input class="search-notes-input" v-model="value" @keyup.enter="addNote" @input="newNote" type="text" :placeholder="placeHolder">
                <div class="add-buttons-container">
                    <button @click="onChangeType($event,'txt')" ><img src="../img/notes/txt.png"/></button>
                    <button @click="onChangeType($event,'img')"><img src="../img/notes/gallery.png"/></button>
                    <button @click="onChangeType($event,'video')"><img src="../img/notes/video.png"/></button>
                    <button @click="onChangeType($event,'todo')"><img src="img/notes/list.png"/></button>
                    

                </div>
            </div>
        `,
  data() {
    return {
      type: 'txt',
      value: '',
      placeHolder: 'Whats on your mind?',
    }
  },
  methods: {
    newNote() {
      this.$emit('newNote', { ...this.type })
    },
    onChangeType(ev, type) {
      this.type = type
      if (type === 'img') this.placeHolder = 'Please enter URL...'
      else if (type === 'video') this.placeHolder = 'Please enter video URL...'
      else if (type === 'todo') this.placeHolder = 'Make yourself a list!'
      else this.placeHolder = 'Whats on your mind?'
      console.log(this.type)
    },
    addNote() {
      let val = this.value
      if (this.type === 'video') {
        val = val.replace('watch?v=', 'embed/')
        console.log('VAL: ', typeof val)
      }
      notesService.addNewNote(this.type, val).then(res => {
        this.$emit('noteAdded')
      })
      this.value = ''
    },
  },
}
