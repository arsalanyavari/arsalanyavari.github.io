document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.experience__toggle-btn');

    toggleButtons.forEach(button => {
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
});

const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tc => {
            tc.classList.remove('filters__active')
        })
        target.classList.add('filters__active')

        tabs.forEach(t => {
            t.classList.remove('filter-tab-active')
        })

        tab.classList.add('filter-tab-active')
    })
})

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

document.querySelector('.blog').addEventListener('click', function (event) {
    event.preventDefault();
    const blog__content = document.querySelector('.blog__content');
    const blog__title = document.querySelector('.blog__title');
    const youtube__content = document.querySelector('.youtube__content');
    const linkedin__content = document.querySelector('.linkedin__content');
    const blogButtonText = this.querySelector('small');

    blog__content.style.display = (blog__content.style.display === 'none' || blog__content.style.display === '') ? 'block' : 'none';
    blog__title.style.display = (blog__title.style.display === 'none' || blog__title.style.display === '') ? 'block' : 'none';
    youtube__content.style.display = (youtube__content.style.display === 'none' || youtube__content.style.display === '') ? 'block' : 'none';
    linkedin__content.style.display = (linkedin__content.style.display === 'none' || linkedin__content.style.display === '') ? 'block' : 'none';
    mainContent.classList.toggle('hidden');
    profileInfoDescription.classList.toggle('hidden');
    profileButtons.classList.toggle('hidden');
    profileSocial.classList.toggle('hidden');

    if (blogButtonText.textContent.trim() === 'My Portfolio') {
        blogButtonText.textContent = 'My Blog';
    } else {
        blogButtonText.textContent = 'My Portfolio';
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
