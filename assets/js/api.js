function ldap(action, parameters, authorization) {
    return new Promise((resolve, reject) => fetch(LDAP_API + action, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + authorization,
            "Content-Type": "application/json",
            "X-LDAP-URI": LDAP_URI
        },
        body: JSON.stringify(parameters)
    }).then(r => r.json()).then(json => {
        if(json.result === "error")
            reject(json.message);
        else if(json.result === "success")
            if(json.data)
                resolve(json.data);
            else
                resolve();
    }));
}

function ldap_get_all_users() {
    if(!isLoggedIn())
        return login().then(ldap_get_all_users);
    else
        return ldap("search", {"base": LDAP_USER_BASE, "scope": "one", "filter": "(objectClass=fsinfoPerson)", "attributes": ["uid", "displayName", "givenName", "sn", "email", "memberOf"]}, getAuthorization());
}

function ldap_set_password(uid, password) {
    if(!isLoggedIn())
        return login().then(() => ldap_set_password(uid, password));
    else
        return ldap("passwd", {"user": uid, "password": password}, getAuthorization());
}