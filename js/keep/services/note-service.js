import { storageService } from '../../services/async-storage-service.js'
export const notesService = {
  query,
  remove,
  save,
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
          url: 'http://some-img/me',
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
          url: 'http://some-img/me',
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
  return notes
}

function query() {
  return storageService.query(NOTES_KEY)
}

function remove(id) {
  return storageService.remove(NOTES_KEY, id)
}

function getById(bookId) {
  return storageService.get(NOTES_KEY, notesId).then(notes => notes)
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
