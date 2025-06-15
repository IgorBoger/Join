/**
 * Adjusts the sidebar layout based on the logged-in user's role.
 */
function adjustSideBar() {
  const onlyViewer = document.querySelector('.only-viewer');
  const footer = document.getElementById('sidebarFooter');
  const user = getLoggedInUser();
  determineSidebarLayout(user, onlyViewer, footer);
}


/**
 * Determines the sidebar layout based on the user's name.
 * @param {Object} user - The logged-in user object.
 * @param {HTMLElement} onlyViewer - Element visible only to viewers.
 * @param {HTMLElement} footer - The sidebar footer element.
 */
function determineSidebarLayout(user, onlyViewer, footer) {
    switch (user.name) {
    case "Viewer":
      setViewerSideBar(onlyViewer, footer);
      break;
    default: setUserSideBar(footer);
      break;
  }
}


/**
 * Sets sidebar for regular users and shows footer on wide screens.
 * @param {HTMLElement} footer - The sidebar footer element.
 */
function setUserSideBar(footer) {
  showAllUserButtons();
  if (!footer) return;
  if (window.innerWidth > 1000) {
    footer.classList.remove("d-none");
  } else {
    footer.classList.add("d-none");
  }
}


/**
 * Sets sidebar for viewers and shows viewer-specific elements.
 * @param {HTMLElement} onlyViewer - Element visible only to viewers.
 * @param {HTMLElement} footer - The sidebar footer element.
 */
function setViewerSideBar(onlyViewer, footer) {
  footer.classList.remove("d-none");
  onlyViewer.classList.remove("d-none");
}


/**
 * Displays all elements meant for logged-in users.
 */
function showAllUserButtons() {
  const loggedInButtons = document.querySelectorAll('.only-logged-in');
  loggedInButtons.forEach(btn => {
    btn.classList.remove("d-none");
  });
}


/**
 * Retrieves the current user from localStorage.
 * @returns {{ name: string } | null} The user object or null if unavailable.
 */
function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem('user'));
  } catch {
    return null;
  }
}