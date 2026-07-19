
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function bindShowMoreButtons() {
    const toggleButtons = document.querySelectorAll('.experience__toggle-btn');

    toggleButtons.forEach(button => {
        // Prevent multiple bindings
        if (button.dataset.bound) return;
        button.dataset.bound = "true";

        button.addEventListener('click', () => {
            const contentDivs = button.closest('.experience__box').querySelectorAll('.experience__content');

            contentDivs.forEach(div => {
                div.classList.toggle('visible');
            });

            if (button.textContent.trim() === 'Show More') {
                button.textContent = 'Show Less';
            }
            else {
                button.textContent = 'Show More';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    bindShowMoreButtons();
});

const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

const activateTab = (targetId) => {
    // Prevent hash jumping by looking for #tab-<id> instead of <id>
    const realTargetId = targetId.replace('#', '#tab-');
    const target = document.querySelector(realTargetId);
    if (!target) return;

    tabContents.forEach(tc => tc.classList.remove('filters__active'));
    target.classList.add('filters__active');

    tabs.forEach(t => {
        if (t.dataset.target === targetId) {
            t.classList.add('filter-tab-active');
        } else {
            t.classList.remove('filter-tab-active');
        }
    });
};

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update URL hash without jumping the page
        history.replaceState(null, null, tab.dataset.target);
        activateTab(tab.dataset.target);
    });
});

// Load the correct tab based on hash on initial load
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash && document.querySelector(hash.replace('#', '#tab-'))) {
        activateTab(hash);
    } else {
        activateTab('#education'); // Default
    }
});

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

const blogButton = document.querySelector('.ri-user-smile-line.blog');
const mainContent = document.querySelector('.main');

const profileInfoDescription = document.querySelector('.profile__info-description');
const profileButtons = document.querySelector('.profile__buttons');
const profileSocial = document.querySelector('.profile__social');

function toggleBlogView(forceBlog = null) {
    const blogButtonText = document.querySelector('.blog small');

    let isCurrentlyPortfolio = !document.body.classList.contains('blog-view-active');
    let willBeBlog = forceBlog !== null ? forceBlog : isCurrentlyPortfolio;

    if (willBeBlog) {
        document.body.classList.add('blog-view-active');
        blogButtonText.textContent = 'My Portfolio';
        localStorage.setItem('selected-view', 'blog');
    } else {
        document.body.classList.remove('blog-view-active');
        blogButtonText.textContent = 'My Blog';
        localStorage.setItem('selected-view', 'portfolio');

        // Reset ScrollReveal inline styles that might be stuck when elements were hidden
        const elementsToReset = document.querySelectorAll('.profile__social, .profile__info-group, .profile__buttons, .filters__content, .filters');
        elementsToReset.forEach(el => {
            el.removeAttribute('style');
        });

        // Re-trigger animations to show them properly
        if (typeof sr !== 'undefined') {
            sr.reveal(`.profile__social`, { delay: 100 });
            sr.reveal(`.profile__info-group`, { interval: 100, delay: 100 });
            sr.reveal(`.profile__buttons`, { delay: 200 });
            sr.reveal(`.filters__content`, { delay: 300 });
            sr.reveal(`.filters`, { delay: 400 });
        }
    }
}

document.querySelector('.blog').addEventListener('click', function (event) {
    event.preventDefault();
    toggleBlogView();
});

// Restore blog/portfolio view on load
document.addEventListener('DOMContentLoaded', () => {
    const savedView = localStorage.getItem('selected-view');
    if (savedView === 'blog') {
        toggleBlogView(true);
    }
});


const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.profile__border`)
sr.reveal(`.ri-moon-line change-theme`, { delay: 400 })
sr.reveal(`.profile__name`, { delay: 500 })
sr.reveal(`.profile__profession`, { delay: 600 })
sr.reveal(`.profile__social`, { delay: 700 })
sr.reveal(`.profile__info-group`, { interval: 100, delay: 700 })
sr.reveal(`.profile__buttons`, { delay: 800 })
sr.reveal(`.filters__content`, { delay: 900 })
sr.reveal(`.filters`, { delay: 1000 })
