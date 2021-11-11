import { storageService } from '../../services/async-storage-service.js'
export const notesService = {
  query,
  remove,
  save,
  addNewNote,
  updateNote,
  getById,
  changeBgcColor,
}

const NOTES_KEY = 'notesDB'

const notes = _createNotes()

function _createNotes() {
  let notes = loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = [
      {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Fullstack Me Baby!',
        },
      },
      {
        id: 'n102',
        type: 'note-img',
        info: {
          url: 'img/notes/user2.png',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n103',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 },
          ],
        },
      },
      {
        id: 'n104',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Do Somemthing!',
        },
      },
      {
        id: 'n105',
        type: 'note-img',
        info: {
          url: 'img/notes/user2.png',
          title: 'Bobi and Me',
        },
        style: {
          backgroundColor: '#00d',
        },
      },
      {
        id: 'n106',
        type: 'note-todos',
        info: {
          label: 'Get my stuff together',
          todos: [
            { txt: 'Driving liscence', doneAt: null },
            { txt: 'Coding power', doneAt: 18712432 },
          ],
        },
      },
    ]
    saveToStorage(NOTES_KEY, notes)
  }
  console.log(notes)
  return notes
}

function getImgNote(url) {
  return {
    type: 'note-img',
    info: {
      url,
    },
    style: {
      backgroundColor: '#00d',
    },
    isPinned: true,
  }
}

function getTxtNote(txt) {
  return {
    type: 'note-txt',
    isPinned: true,
    info: {
      txt,
    },
  }
}
function getTodosNote(label) {
  return {
    type: 'note-todos',
    info: {
      label,
      todos: [{ txt: 'Change me', doneAt: Date.now() }],
    },
  }
}

function addNewNote(type, value) {
  let note = null
  if (type === 'txt') note = getTxtNote(value)
  if (type === 'img') note = getImgNote(value)
  if (type === 'todo') note = getTodosNote(value)
  return storageService.post(NOTES_KEY, note)
}

function changeBgcColor(noteId, color) {
  return getById(noteId).then(note => {
    note.style.backgroundColor = color
    storageService.put(NOTES_KEY, note)
  })
}

function query() {
  return storageService.query(NOTES_KEY)
}

function remove(id) {
  return storageService.remove(NOTES_KEY, id)
}
function updateNote(id) {
  return storageService.put(NOTES_KEY, id)
}

function getById(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value) || null)
}

function loadFromStorage(key) {
  let data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

function save(note) {
  if (note.id) return storageService.put(NOTES_KEY, note)
  else return storageService.post(NOTES_KEY, note)
}
