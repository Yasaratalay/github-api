class Storage {
    static getSearchedUsersFromStorage() {
        // Tüm kullanıcıları al.
        let users;

        if (localStorage.getItem("searched") === null) { // localstorage de her hangi bir veri yoksa yani boş ise.
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem("searched"));
        }

        return users;
    }
    static addSearchedUserToStorage(username) {
        // Kullanıcı ekle.
        let users = this.getSearchedUsersFromStorage();

        // IndexOf
        if (users.indexOf(username) === -1) {
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage() {
        // Tüm kullanıcıları temizle
        localStorage.removeItem("searched");
    }
}