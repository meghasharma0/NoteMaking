const notesContainer = document.querySelector(".notes-container");
const save = document.querySelector(".saveBtn");
const title = document.querySelector(".title");
const desc = document.querySelector(".description");

const displaySavedData = () => {
    notesContainer.innerHTML = "";
    
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let data = JSON.parse(localStorage.getItem(key));
        let elem = document.createElement("div");
        elem.classList.add("someClass");
        elem.innerHTML = `
            <p>${data.title}</p>
            <p>${data.description}</p>
            <span class="material-symbols-outlined">delete</span>
            <span class="material-symbols-outlined">edit_square</span>
        `
        notesContainer.appendChild(elem);

        const del = elem.getElementsByTagName("span")[0];
        del.addEventListener("click", () => {
            notesContainer.removeChild(elem);
            localStorage.removeItem(key);
        })

        const edt = elem.getElementsByTagName("span")[1];
        edt.addEventListener("click", () => {
            title.value = data.title;
            desc.value = data.description
            elem.innerHTML = "";
            localStorage.removeItem(key);
        })
    }
}

displaySavedData();

save.addEventListener("click", () => {
    const obj = {
        title: title.value,
        description: desc.value
    }
    const key = `note-${Date.now()}`;
    localStorage.setItem(key, JSON.stringify(obj));

    displaySavedData();

    title.value = "";
    desc.value = "";
})