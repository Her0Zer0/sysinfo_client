const settingsSaveBtn = document.querySelector('#appSettingsSaveBtn');

async function postData(_url, _data){
    const response = await fetch(_url,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type":"application/json"
            },
            redirect: "follow",
            body: JSON.stringify(_data)
        })
    return response
}

const settingsAlert = document.querySelector('#settingsAlert');

settingsSaveBtn.addEventListener('click',  (event)=> {
    event.preventDefault()
    const settingsForm = document.querySelector('#appSettingsForm');
    const formData = new FormData(settingsForm)
    let data = {};
    for (let [key, val] of formData) data[key] = val

    postData('/si/settings/save', data)
        .then(response => {
            if(response.ok) return response.json()
            throw response
        })
        .then(x => {
            if(x.status === "success") {

                settingsAlert.textContent = x.message
                settingsAlert.classList.remove('visually-hidden')
                setTimeout(()=> {
                    settingsAlert.classList.add('visually-hidden')
                }, 5000)
                return true;
            }
        })
        .catch(console.error)

})

