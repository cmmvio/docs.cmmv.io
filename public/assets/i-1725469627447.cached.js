
function toggle(id) {
    const rootElement = document.getElementById(id);
    const isOpened = rootElement.getAttribute('opened') === 'true';
    rootElement.setAttribute('opened', !isOpened);

    const contentElement = document.getElementById(`$_contents`);
    const openIcon = document.getElementById(`$_open`);
    const closeIcon = document.getElementById(`$_close`);

    if (!isOpened) {
        contentElement.style.display = 'block';
        openIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    } else {
        contentElement.style.display = 'none';
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }

    saveState();
}

function saveState() {
    const state = {};
    const items = document.querySelectorAll('.itemRoot');

    items.forEach(item => {
        const id = item.getAttribute('id');
        state[id] = item.getAttribute('opened');
    });

    localStorage.setItem('navbar', JSON.stringify(state));
}

function loadState() {
    const state = JSON.parse(localStorage.getItem('navbar'));

    if (state) {
        for (const key in state) {
            const rootElement = document.getElementById(key);
            const contentElement = document.getElementById(`$_contents`);
            const openIcon = document.getElementById(`$_open`);
            const closeIcon = document.getElementById(`$_close`);

            const isOpened = state[key] === 'true';
            rootElement.setAttribute('opened', isOpened);

            if (isOpened) {
                contentElement.style.display = 'block';
                openIcon.style.display = 'none';
                closeIcon.style.display = 'block';
            } else {
                contentElement.style.display = 'none';
                openIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        }
    }
}

loadState();
