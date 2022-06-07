// Elementleri seçeceğiz.
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {

    let username = nameInput.value.trim();

    if (username === "") {
        alert("Lütfen kullanıcı adı giriniz.")
    } else {
        github.getGithubData(username)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showError("Kullanıcı Bulunamadı.");
                } else {
                    ui.addSearcheduserToUI(username);
                    Storage.addSearchedUserToStorage(username);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));
    }

    ui.clearInput(); // Input temizleme.
    e.preventDefault();
}

function clearAllSearched() {
    // Tüm arananları temizleme.
    if (confirm("Emin misiniz?")) {
        Storage.clearAllSearchedUsersFromStorage(); // Storageden temizleme
        ui.clearAllSearchedFromIU();
    }
}

function getAllSearched() {
    // Aranan bilgileri Storage'dan UI a ekleme.
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";
    users.forEach(user => {
        // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
        result +=
            `
              <li class="list-group-item">${user}</li>
        `;
    });

    lastUsers.innerHTML = result;
}