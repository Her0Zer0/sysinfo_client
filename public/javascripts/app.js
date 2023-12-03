const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

const updateSubjectFrameSrc = (event) => {
    const subjectFrame = document.querySelector('iframe.subject-frame');
    subjectFrame.setAttribute('src', '/si/loader'); // set loader first in case we need time to load the next page
    setTimeout(()=>{
        subjectFrame.setAttribute('src', event.target.getAttribute('data-frame-ref'));
    },300)
}

const menuItems = document.querySelectorAll('.sidebar ul li.list-group-item')
menuItems.forEach((el)=>{
    if(el.getAttribute('listener') !== 'true'){
        el.addEventListener('click', updateSubjectFrameSrc);
    }
})


