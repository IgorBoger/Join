/**
 * Toggles the visibility of the user initials dropdown.
 * Handles separate behavior for mobile and desktop views.
 * Adds a document-level click listener to close the dropdown when clicking outside.
 */ 
function toggleInitialDropdown() {
  const dropdown = document.getElementById("userDropdown");
  const isMobile = window.innerWidth <= 1000;
  if (isMobile) {
    toggleMobileDropdown(dropdown);
  } else {
    dropdown.classList.toggle("d-none");
  }
  document.addEventListener("click", closeDropdownOnClickOutside);
}


/**
 * Toggles the mobile version of the user initials dropdown.
 * Applies a slide-in animation when showing and hides it after animation when closing.
 *
 * @param {HTMLElement} dropdown - The dropdown element to toggle.
 */
function toggleMobileDropdown(dropdown) {
  if (dropdown.classList.contains("d-none")) {
    dropdown.classList.remove("d-none");
    requestAnimationFrame(() => dropdown.classList.add("slide-in"));
  } else {
    dropdown.classList.remove("slide-in");
    setTimeout(() => dropdown.classList.add("d-none"), 300);
  }
}


/**
 * Closes the user dropdown menu if a click occurs outside of it and the trigger element.
 * Handles both desktop and mobile dropdowns.
 *
 * @param {MouseEvent} e - The click event.
 */
function closeDropdownOnClickOutside(e) {
  const dropdown = document.getElementById("userDropdown");
  const trigger = document.getElementById("userInitial");
  const isMobile = window.innerWidth <= 1000;
  if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
    isMobile ? closeMobileDropdown(dropdown) : dropdown.classList.add("d-none");
    document.removeEventListener("click", closeDropdownOnClickOutside);
  }
}


/**
 * Closes the mobile user dropdown menu with a slide-out animation.
 *
 * @param {HTMLElement} dropdown - The dropdown element to be closed.
 */
function closeMobileDropdown(dropdown) {
  dropdown.classList.remove("slide-in");
  setTimeout(() => dropdown.classList.add("d-none"), 300);
}


/**
 * Logs the user out by removing user data from localStorage
 * and redirecting to the login (index) page.
 */
function logout() {
  localStorage.removeItem("user");
  window.location.href = "../index.html";
}


/**
 * Displays the dropdown help button if the current user is a "Guest".
 * Retrieves user data from localStorage and checks the user's name.
 * If the name matches, it makes the help button visible.
 */
function ifGuestShowDropdownHelp() {
  const user = JSON.parse(localStorage.getItem("user"));
  const btn = document.querySelector(".dropdown-help");
  if (user?.name === "Guest") {
    btn.classList.remove("d-none");
  }
}


/**
 * Adjusts the header layout based on the logged-in user stored in localStorage.
 * If no user is found, it exits early.
 */
function adjustHeaderForUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  determineHeaderLayout(user);
}


/**
 * Determines the header layout based on the user's name.
 * Handles different behavior for "Viewer", "Guest", and other users.
 *
 * @param {Object} user - The user object retrieved from localStorage.
 */
function determineHeaderLayout(user) {
  switch (user.name) {
    case "Viewer":
      break;
    case "Guest":
      setGuestInitial();
      canShowHeaderHelpAndInitial();
      break;
    default: 
      setUserInitial(user.id);
      canShowHeaderHelpAndInitial();
      break;
  }
}


/**
 * Toggles visibility of the help icon and user initial
 * based on the current window width.
 * Shows both if width > 1000px, otherwise hides the help icon.
 */
function canShowHeaderHelpAndInitial() {
  const helpIcon = document.getElementById('helpIcon');
  const initial = document.getElementById('userInitial');
  if (!helpIcon || !initial) return;
  if (window.innerWidth > 1000) {
    helpIcon.classList.remove('d-none');
    initial.classList.remove('d-none');
  } else {
    helpIcon.classList.add('d-none');
    initial.classList.remove("d-none");
  }
}


/**
 * Sets the initial "G" for Guest users.
 */
function setGuestInitial() {
  const container = document.getElementById("userInitial");
  if (!container) return;
  container.innerText = "G";
  container.onclick = toggleInitialDropdown;
}


/**
 * Retrieves and displays the initial for regular users.
 * @param {string|number} userId - The ID of the logged-in user.
 */
async function setUserInitial(userId) {
  const container = document.getElementById("userInitial");
  const initial = await searchForContactInitial(userId);
  container.innerText = initial || "U";
  container.onclick = toggleInitialDropdown;
}


/**
 * Searches for a user's contact initial by their ID.
 *
 * @param {string|number} id - The ID of the user to search for.
 * @returns {Promise<string|undefined>} The initial from the user's icon if found; otherwise undefined.
 */
async function searchForContactInitial(id) {
  const rawContacts = await getData("ourUsers/");
  const contacts = Object.values(rawContacts);
  const match = contacts.find((contact) => contact.id === id);
  return match?.icon?.initial;
}


/**
 * Hides the help icon if the current page is the help page.
 */
function ifHelpPageNoHelpIcon() {
  const icon = document.querySelector(".help-icon");
  if (window.location.pathname.includes("help")) {
    icon.classList.add("d-none");
  }
}