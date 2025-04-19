const BASE_URL = 'https://join-fce4c-default-rtdb.europe-west1.firebasedatabase.app/';

async function putContacts(path='', data={}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function postContacts(path='', data={}) {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

async function deleteContacts(path='') {
    let response = await fetch(BASE_URL + path + '.json', {
        method: 'DELETE'
    });
    return await response.json();
}

function sanitizeEmail(email) {
    return email.replace(/[@.]/g, "_");
}

async function isDuplicateEmail(path='') {
    const response = await fetch(BASE_URL + path + ".json");
    const data = await response.json();
    return data !== null;
}

async function saveBasicContacts() {
    for (let i = 0; i < contactsArray.length; i++) {
        const contact = contactsArray[i];
        const safeKey = sanitizeEmail(contact.email);
        const path = 'contacts/' + safeKey;

        const exists = await isDuplicateEmail(path);
        if (!exists) {
            await putContacts(path, contact);
        } else {
            continue;
        }
    }
}


async function getNewContactData() {
    const nameInput = document.getElementById('contactName');
    const nameValue = nameInput.value;
    const emailInput = document.getElementById('contactEmail');
    const emailValue = emailInput.value;
    const phoneInput = document.getElementById('contactPhone');
    const phoneValue = phoneInput.value;

    return {nameValue, emailValue, phoneValue};
}

async function saveNewContactToDataBase() {
    const {nameValue, emailValue, phoneValue} = await getNewContactData();
    const filled = inputsFilledOut({nameValue, emailValue, phoneValue});
    const safeKey = sanitizeEmail(emailValue);
    const path = 'contacts/' + safeKey;
    if (!filled) return;

    const exists = await doesContactExists({emailValue});
    if (exists) {
        return;
    } else {
    putContacts(path, {nameValue, emailValue, phoneValue});
    }
}

function inputsFilledOut({nameValue, emailValue, phoneValue}) {
    if (nameValue == "" || emailValue == "" || phoneValue == "") {
        return false;
    } else {
        return true;
    }
}

async function doesContactExists({emailValue}) {
    const response = await fetch(BASE_URL + 'contacts/' + '.json');
    const data = await response.json();

    for (const key in data) {
        if (data[key].email === emailValue) {
            return true;
        }
    }
    return false;
    }

    async function deleteContactInDataBase(email) {
        const sanitizedEmail = await sanitizeEmail(email);
        deleteContacts(`contacts/${sanitizedEmail}`)
    }


    async function changeContactData() {
        const {nameValue, emailValue, phoneValue} = await getEditedContactData();
        if (areEditContactFieldsEmpty({nameValue, emailValue, phoneValue})) return;
        const currentContactKey = await determineCurrentContact();
        
        
        putContacts(`contacts/${currentContactKey}`, {nameValue, emailValue, phoneValue});
    }

    async function getEditedContactData() {
        const nameInput = document.getElementById('editName');
        const emailInput = document.getElementById('editEmail');
        const phoneInput = document.getElementById('editPhone');
        const nameValue = nameInput.value;
        const emailValue = emailInput.value;
        const phoneValue = phoneInput.value;

        return {nameValue, emailValue, phoneValue};
    }

    function areEditContactFieldsEmpty({nameValue, emailValue, phoneValue}) {
        return (nameValue !== '' && emailValue !== '' && phoneValue !== '');
    }

    async function determineCurrentContact(email) {
        const sanitizedEmail = sanitizeEmail(email);
        const response = await fetch(BASE_URL + 'contacts.json');
        const keys = await response.json();
        for (const key of Object.keys(keys)) {
            console.log('Key is ', key);
            console.log('Email is ', sanitizedEmail);
            
            if (sanitizedEmail === key) {
                return key;
            }
        }
    }
    //1: Find clicked contact
    //2: onclick "save" get inputs values
    //3: replace clicked contact with new contact object
