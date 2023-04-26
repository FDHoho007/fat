function isLoggedIn() {
    return getAuthorization() != null;
}

function getAuthorization() {
    return sessionStorage.getItem("authorization");
}

function login() {
    return Swal.fire({
        title: "Login",
        html: `<input type="text" id="username" class="swal2-input" placeholder="Username">
  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
        confirmButtonText: "Login",
        focusConfirm: false,
        preConfirm: async () => {
            const username = Swal.getPopup().querySelector('#username').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!username || !password)
                Swal.showValidationMessage("Please enter username and password")
            let authorization = btoa(LDAP_USER_BASE.replaceAll("%u", username) + ":" + password);
            return await ldap("whoami", {}, authorization).then(() => {
                return authorization;
            }).catch(() =>
                Swal.showValidationMessage("Invalid username or password")
            );
        }
    }).then((result) => {
        sessionStorage.setItem("authorization", result.value);
    })
}

function logout() {
    sessionStorage.removeItem("authorization");
}