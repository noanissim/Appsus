import { notesService } from '../services/note-service.js'
export default {
  template: `
            <div class="note-filter">
                <input class="search-input" v-model="value" @keyup.enter="addNote" @input="newNote" type="text" :placeholder="placeHolder">
                <div>
                    <button @click="onChangeType($event,'txt')" ><img src="../img/notes/txt.png"/></button>
                    <button @click="onChangeType($event,'img')"><img src="../img/notes/gallery.png"/></button>
                    <button @click="onChangeType($event,'video')"><img src="../img/notes/video.png"/></button>
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
      if (type === 'img' || type === 'video') this.placeHolder = 'Pls enter URL'
      else this.placeHolder = 'Whats on your mind?'
      console.log(this.type)
    },
    addNote() {
      console.log(this.value)
      notesService.addNewNote(this.type, this.value).then(res => {
        this.$emit('noteAdded')
      })
    },
  },
}
