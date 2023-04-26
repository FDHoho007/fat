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

