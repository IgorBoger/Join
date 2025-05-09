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

  function generateContactDetails(bg, initials, name, email, phone) {
    return `<div class="detail-avatar-name">
              <div class="contact-detail-avatar" id="detailAvatar" style="background-image: url('${bg}'); background-size: cover; background-position: center;">
                ${initials}
              </div>
              <div class="edit-delete">
                <h2 id="detailName">${name}</h2>
                <img src="/img/edit_contacts.png" alt="" onclick="editContact('${name}', '${email}', '${phone}', '${initials}', '${bg}') ">
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