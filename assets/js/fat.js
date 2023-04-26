function loadUsers() {
    let table = new DataTable('#users', {
        ajax: function (d, cb) {
            ldap_get_all_users().then(data => cb({
                data: Object.values(data).map((e) => {
                    e["active"] = e.hasOwnProperty("memberof") && e["memberof"].includes(LDAP_GROUP_DN.replaceAll("%g", "fsinfo")) ? "&check;" : "";
                    e["actions"] = "<button class='btn btn-secondary m-1' onclick='reset_password(\"" + e["uid"] + "\");'><i class='bi bi-key-fill'></i></button><button class='btn btn-primary m-1'><i class='bi bi-people-fill'></i></button>";
                    if (e["active"])
                        e["actions"] += "<button class='btn btn-danger m-1' onclick='lock_user(\"" + e["uid"] + "\");'><i class='bi bi-lock-fill'></i></button>";
                    else
                        e["actions"] += "<button class='btn btn-success m-1' onclick='unlock_user(\"" + e["uid"] + "\");'><i class='bi bi-unlock-fill'></i></button>";
                    return e;
                })
            }));
        },
        columns: [
            {data: "uid"},
            {data: "displayname"},
            {data: "givenname"},
            {data: "sn"},
            {data: "email"},
            {data: "active"},
            {data: "actions"}
        ]
    });
}

function reset_password(uid, email, name) {
    Swal.fire({
        title: "Reset password",
        html: "Are you sure you want to reset " + uid + "'s password?<br>A new random password will be generated and sent to " + uid + "'s email.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Reset password"
    }).then(confirm => {
        if (confirm) {
            let password = "";
            for (let i = 0; i < PASSWORD_LENGTH; i++) {
                let randomNumber = Math.floor(Math.random() * PASSWORD_CHARS.length);
                password += PASSWORD_CHARS.substring(randomNumber, randomNumber + 1);
            }
            //ldap_set_password(LDAP_USER_DN.replaceAll("%u", uid), password);
            mail(email, "password", {name: name, password: password});
            Swal.fire({
                title: "Success",
                text: "Password for " + uid + " has sucessfully been updated.",
                icon: "success"
            });
        }
    });
}

function lock_user(uid, email, name) {
    Swal.fire({
        title: "Lock user",
        html: "Are you sure you want to lock " + uid + "'s account?<br>" + uid + " wont be able to use our services any more.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Lock user"
    }).then(confirm => {
        if (confirm) {
            //ldap_set_password(LDAP_USER_DN.replaceAll("%u", uid), password);
            mail(email, "lock", {name: name});
            Swal.fire({
                title: "Success",
                text: "Password for " + uid + " has sucessfully been updated.",
                icon: "success"
            });
        }
    });
}

function unlock_user(uid, email, name) {
    Swal.fire({
        title: "Unlock user",
        html: "Are you sure you want to unlock " + uid + "'s account?<br>" + uid + " will regain access but has to be added to groups manually again.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Unlock user"
    }).then(confirm => {
        if (confirm) {
            //ldap_set_password(LDAP_USER_DN.replaceAll("%u", uid), password);
            mail(email, "unlock", {name: name});
            Swal.fire({
                title: "Success",
                text: "Password for " + uid + " has sucessfully been updated.",
                icon: "success"
            });
        }
    });
}