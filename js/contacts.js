

let contactsArray = [
    { name: "Anja Schulz", email: "schulz@hotmail.com", phone: "+49 170 1234567" },
    { name: "Anton Greber", email: "greber@hotmail.com", phone: "+49 171 2345678" },
    { name: "Stafanie Weimer", email: "stefanie@gmail.com", phone: "+49 172 3456789" },
    { name: "Benedikt Ziegler", email: "benedikt@gmail.com", phone: "+49 173 4567890" },
    { name: "Igor Boger", email: "igor@gmail.com", phone: "+49 174 5678901" },
    { name: "Alex Müller", email: "alex@gmail.com", phone: "+49 175 6789012" },
    { name: "Gerd Fischter", email: "gerd@gmail.com", phone: "+49 176 7890123" },
    { name: "Eva Fischer", email: "fischer@gmail.com", phone: "+49 177 8901234" },
    { name: "Margrid Sieger", email: "margrid@gmail.com", phone: "+49 178 9012345" }
];



const bgImages = [
    '/img/variante1.png',
    '/img/variante2.png',
    '/img/variante3.png',

    '/img/variante4.png',
    '/img/variante5.png',
    '/img/variante6.png',

    '/img/variante7.png',
    '/img/variante8.png',
    '/img/variante9.png',

    '/img/variante10.png',
    '/img/variante11.png',
    '/img/variante12.png',

    '/img/variante13.png',
    '/img/variante14.png',
    '/img/variante15.png',
];


// Globaler Speicher für den aktuell bearbeiteten Kontakt
let currentContact = null;


function renderContacts() {
    loadFromLocalStorage();
    contactsArray.sort((a, b) => a.name.localeCompare(b.name));
    const container = document.querySelector('.contacts-list');
    if (!container) return;

    const groups = {};
    contactsArray.forEach(c => {
        const letter = c.name[0].toUpperCase();
        (groups[letter] = groups[letter] || []).push(c);
    });

    container.innerHTML = Object.keys(groups).sort().map(letter => {
        let html = `<h2>${letter}</h2>`;
        groups[letter].forEach(c => {
            const vars = getContactVars(c);
            html += generateContactHTML(c, vars);
        });
        return html;
    }).join("");
}


function getInitials(name) {
    const parts = name.split(" ").filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}


function getContactVars(c) {
    return {
        initials: getInitials(c.name),
        bg: getBackgroundForName(c.name)
    };
}


function generateContactHTML(c, vars) {
    return `<div class="contact-item" onclick="openContactItem('${c.name}', '${c.email}', '${c.phone}'); contactItemClicked(this)">
    <div class="contact-initials" style="background-image:url('${vars.bg}'); background-size:cover; background-position:center;">
            ${vars.initials}
        </div>
        <div class="contact-details">
            <p class="contact-name">${c.name}</p>
            <p class="contact-email">${c.email}</p>
        </div>
    </div>`;
}


function getBackgroundForName(name) {
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    const index = sum % bgImages.length;
    return bgImages[index];
}


function openContactItem(name, email, phone) {
    const initials = getInitials(name);
    const bg = getBackgroundForName(name);
    let contactDetailView = document.getElementById("contactDetailView");
    contactDetailView.classList.remove("d-none");
    contactDetailView.innerHTML = '';
    contactDetailView.innerHTML = generateContactDetails(bg, initials, name, email, phone);
    slideEfekt();
}


function slideEfekt() {
    let contactDetailView = document.getElementById("contactDetailView");
    contactDetailView.classList.remove("slide-in");
    contactDetailView.classList.remove("d-none");
    setTimeout(() => {
        contactDetailView.classList.add("slide-in");
    }, 10);
}


function generateContactDetails(bg, initials, name, email, phone) {
    return `
      <div class="detail-avatar-name">
        <div class="contact-detail-avatar" id="detailAvatar" style="background-image: url('${bg}'); background-size: cover; background-position: center;">
          ${initials}
        </div>
        <div class="edit-delete">
          <h2 id="detailName">${name}</h2>
          <img src="/img/edit_contacts.png" alt="" onclick="editContact('${name}', '${email}', '${phone}', '${initials}', '${bg}')">
          <img src="/img/delete-contact.png" alt="" onclick="deleteContact('${email}')">
        </div>
      </div>
      <div class="email-phone">
        <p>Contact Information</p>
        <b>Email</b>
        <p class="email" id="detailEmail">${email}</p>
        <b>Phone</b>
        <p class="phone" id="detailPhone">${phone}</p>
      </div>
    `;
}


function contactItemClicked(itemElement) {
    document.querySelectorAll(".contact-item").forEach(item =>
        item.classList.remove("clicked-color")
    );
    itemElement.classList.add("clicked-color");

    document.querySelectorAll(".contact-name").forEach(name =>
        name.classList.remove("color-white")
    );
    const nameElement = itemElement.querySelector(".contact-name");
    if (nameElement) {
        nameElement.classList.add("color-white");
    }
}


function openAddContactOverlay() {
    const addContactOverlay = document.getElementById('addContactOverlay');
    addContactOverlay.classList.remove("d-none");
    setTimeout(() => addContactOverlay.classList.add("show"), 10);
    const overlayAddContent = addContactOverlay.querySelector(".overlay-add-content");
    setTimeout(() => overlayAddContent.classList.add("slide-in"), 10);
}


function closeAddContactOverlay() {
    const addContactOverlay = document.getElementById('addContactOverlay');
    const overlayAddContent = addContactOverlay.querySelector(".overlay-add-content");
    overlayAddContent.classList.remove("slide-in");
    addContactOverlay.classList.remove("show");
    setTimeout(() => addContactOverlay.classList.add("d-none"), 300);
}


document.addEventListener("DOMContentLoaded", function () {
    const addContactOverlay = document.getElementById("addContactOverlay");
    if (addContactOverlay) {
        addContactOverlay.addEventListener("click", function (e) {
            if (e.target === this) {
                closeAddContactOverlay();
            }
        });
    }
});


function saveNewContact() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    if (!validateContactInput(name, email, phone)) return;
    if (contactExists(email)) return;
    newContactPushToArray(name, email, phone);
    saveToLocalStorage();
    renderContacts();
    closeAddContactOverlay();
    deleteValue();
    overlayForContactSuccesfullyCreated();
}


// function overlayForContactSuccesfullyCreated() {
//     const contactSuccesfullyCreated = document.getElementById('contactSuccesfullyCreated');
//     contactSuccesfullyCreated.classList.remove("d-none");
//     setTimeout(() => contactSuccesfullyCreated.classList.add("show"), 10);
//     const overlaySuccesfullyCreated = contactSuccesfullyCreated.querySelector(".overlay-add-content");
//     setTimeout(() => overlaySuccesfullyCreated.classList.add("slide-in"), 10);


//     // const addContactOverlay = document.getElementById('addContactOverlay');
//     // const overlayAddContent = addContactOverlay.querySelector(".overlay-add-content");
//     // overlayAddContent.classList.remove("slide-in");
//     // addContactOverlay.classList.remove("show");
//     setTimeout(() => contactSuccesfullyCreated.classList.add("d-none"), 300);

// }


// function overlayForContactSuccesfullyCreated() {
//     const overlay = document.getElementById("contactSuccesfullyCreated");
//     // Overlay sichtbar machen
//     overlay.classList.remove("d-none");
//     // Kurz warten, damit der Browser den Startzustand erkennt
//     setTimeout(() => overlay.classList.add("show"), 10);
//     // Nach ca. 2 Sekunden Overlay wieder schließen
//     setTimeout(() => {
//         overlay.classList.remove("show");
//         // Nach der Übergangszeit wieder ausblenden
//         setTimeout(() => overlay.classList.add("d-none"), 500);
//     }, 2000);
// }


function overlayForContactSuccesfullyCreated() {
    const overlay = document.getElementById("contactSuccesfullyCreated");
    const detailContainer = document.getElementById("contactDetailContainer");

    const containerRect = detailContainer.getBoundingClientRect();
    const computedStyle = getComputedStyle(detailContainer);
    // Den linken Padding-Wert ermitteln (z. B. "48px" -> 48)
    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    
    // Setze den linken Offset des Overlays so, dass er den Padding berücksichtigt
    overlay.style.left = (containerRect.left + paddingLeft) + "px";
    
    overlay.classList.remove("d-none");
    setTimeout(() => overlay.classList.add("show"), 10);
    setTimeout(() => {
        overlay.classList.remove("show");
        setTimeout(() => overlay.classList.add("d-none"), 500);
    }, 2000);
}


function validateContactInput(name, email, phone) {
    if (!name || !email || !phone) {
        alert("Bitte Name, E-Mail und Telefonnummer angeben!");
        return false;
    }
    return true;
}


function contactExists(email) {
    const exists = contactsArray.some(contact => contact.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        alert("Kontakt existiert bereits!");
        return true;
    }
    return false;
}


function newContactPushToArray(name, email, phone) {
    const newContact = { name, email, phone };
    contactsArray.push(newContact);
}



function deleteValue() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
}


function deleteContact(email) {
    // Optional: Bestätigung vom Nutzer einholen
    // if (!confirm("Möchten Sie diesen Kontakt wirklich löschen?")) return;

    // Entferne den Kontakt aus dem Array
    contactsArray = contactsArray.filter(contact =>
        contact.email.toLowerCase() !== email.toLowerCase()
    );

    // Aktualisiere den Local Storage
    saveToLocalStorage();

    // Neu rendern der Kontaktliste
    renderContacts();

    // Falls die Detailansicht den gelöschten Kontakt zeigt, ausblenden
    let detailView = document.getElementById("contactDetailView");
    if (detailView) {
        detailView.classList.add("d-none");
        detailView.innerHTML = "";
    }
}


function editContact(name, email, phone, initials, bg) {
    // Speichere den aktuellen Kontakt (als Kopie) in einer globalen Variable
    currentContact = { name, email, phone };

    // Öffne das Edit-Overlay
    let editContactOverlay = document.getElementById("editContactOverlay");
    editContactOverlay.classList.remove("d-none");
    setTimeout(() => editContactOverlay.classList.add("show"), 10);
    const overlayEditContactOverlay = editContactOverlay.querySelector(".overlay-edit-content");
    setTimeout(() => overlayEditContactOverlay.classList.add("slide-in"), 10);

    // Fülle die Eingabefelder
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;
    document.getElementById("editPhone").value = phone;
    let editAvatar = document.getElementById("editAvatar");
    // editAvatar.style.backgroundColor = bg;
    // editAvatar.style.backgroundImage = url(${bg});
    editAvatar.style.backgroundImage = `url(${bg})`;

    editAvatar.innerHTML = `
        ${initials}
    `;
}


function saveEditedContact() {
    if (!currentContact) return;

    // Neue Werte aus den Edit-Feldern auslesen
    const newName = document.getElementById("editName").value.trim();
    const newEmail = document.getElementById("editEmail").value.trim();
    const newPhone = document.getElementById("editPhone").value.trim();

    if (!validateContactInput(newName, newEmail, newPhone)) return;

    updateContact(newName, newEmail, newPhone);

    // Kontakte im Local Storage speichern und Liste neu rendern
    saveToLocalStorage();
    renderContacts();

    updateDetailView(newName, newEmail, newPhone);

    closeEditContactOverlay();
    currentContact = null;
}


function updateContact(newName, newEmail, newPhone) {
    // Kontakt im Array anhand der ursprünglichen Email aktualisieren
    contactsArray = contactsArray.map(contact => {
        if (contact.email.toLowerCase() === currentContact.email.toLowerCase()) {
            return { name: newName, email: newEmail, phone: newPhone };
        }
        return contact;
    });
}


function updateDetailView(newName, newEmail, newPhone) {
    // Aktualisiere die Detailansicht, wenn sie sichtbar ist
    let detailView = document.getElementById("contactDetailView");
    if (!detailView.classList.contains("d-none")) {
        const vars = getContactVars({ name: newName });
        detailView.innerHTML = generateContactDetails(vars.bg, vars.initials, newName, newEmail, newPhone);
        // Optional: erneuter Slide-Effekt
        slideEfekt();
    }
}


function deleteContactForEdit() {
    if (!currentContact) return;
    if (!confirm("Möchten Sie diesen Kontakt wirklich löschen?")) return;

    // Entferne den Kontakt aus dem Array
    contactsArray = contactsArray.filter(contact =>
        contact.email.toLowerCase() !== currentContact.email.toLowerCase()
    );

    saveToLocalStorage();
    renderContacts();
    closeEditContactOverlay();
    currentContact = null;
}


function closeEditContactOverlay(email) {
    const editContactOverlay = document.getElementById('editContactOverlay');
    const overlayEditContent = editContactOverlay.querySelector(".overlay-edit-content");
    overlayEditContent.classList.remove("slide-in");
    editContactOverlay.classList.remove("show");
    setTimeout(() => editContactOverlay.classList.add("d-none"), 300);
}


function saveToLocalStorage() {
    localStorage.setItem("contacts", JSON.stringify(contactsArray));
}


function loadFromLocalStorage() {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
        contactsArray = JSON.parse(savedContacts);
    }
}