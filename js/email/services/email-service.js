import {
    utilService
} from '../../services/util-service.js';
import {
    storageService
} from '../../services/async-storage-service.js';

const EMAILS_KEY = 'emails';

_createEmails();

export const emailService = {
    query,
    remove,
    save,
    getEmptyEmail,
    getById,
    getPrevEmailId,
    getNextEmailId

};





function query() {
    return storageService.query(EMAILS_KEY);
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
}

function save(email) {
    if (email.id) return storageService.put(EMAILS_KEY, email);
    else return storageService.post(EMAILS_KEY, email);
}

function saveEmailFromGoogle(email) {
    return storageService.post(EMAILS_KEY, email);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

// function addReviewToEmail(emailId, review) {
//     return getById(emailId)
//         .then(email => {
//             if (!email.reviews) email.reviews = []
//             email.reviews.push(review)
//             return save(email)
//         })

// }

// function deleteReviewFromEmail(emailId, reviewIdx) {
//     return getById(emailId)
//         .then(email => {
//             (email.reviews).splice(reviewIdx, 1)
//             return save(email)
//         })

// }



function getEmptyEmail() {
    return {

    };
}


function _createEmail() {
    const email = {


    };
    return email;
}




function getNextEmailId(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(emails => emails.id === emailId);
            return (idx === emails.length - 1) ? emails[0].id : emails[idx + 1].id;
        });
}

function getPrevEmailId(emailId) {
    return query()
        .then(emails => {
            const idx = emails.findIndex(email => email.id === emailId);
            return (idx === 0) ? emails[emails.length - 1].id : emails[idx - 1].id;
        });
}

function _createEmails() {
    let loggedinUser = {
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    }
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || !emails.length) {
        console.log('here');
        emails = [{
                id: utilService.makeId(),
                subject: 'Message 1',
                body: 'Would',
                isRead: false,
                sentAt: 1551133930594,
                to: 'momo@momo.com',
                from: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 2',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                from: 'popo@momo.com',
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 3',
                body: 'Would love to catch up sometimes lorem lorem lorem ',
                isRead: false,
                sentAt: 1551133930594,
                to: 'riri@momo.com',
                from: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 4',
                body: 'love',
                isRead: false,
                sentAt: 1551133930594,
                to: 'kiki@momo.com',
                from: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 5',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551133930594,
                to: 'lala@momo.com',
                from: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 6',
                body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quisquam inventore molestiae voluptatum veritatis placeat enim dolor soluta dolorum et omnis, cum necessitatibus possimus unde. Quaerat facilis repellendus reiciendis hic!',
                isRead: false,
                sentAt: 1551133930594,
                to: 'lala@momo.com',
                from: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 7',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551133930594,
                to: 'lala@momo.com',
                from: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: 'Message 5',
                body: 'Would love to catch up sometimes',
                isRead: false,
                sentAt: 1551133930594,
                to: 'lala@momo.com',
                from: loggedinUser.email
            },
        ]

        utilService.saveToStorage(EMAILS_KEY, emails);
    }
    return emails;
}