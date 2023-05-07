function handleLogin(ev) {
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        var email = ev.target.elements.email.value;
        var password = ev.target.elements.password.value;
        if (!email)
            throw new Error("no email");
        if (!password)
            throw new Error("no password");
        var newUser = { email: email, password: password };
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var ok = data.ok;
            if (ok) {
                //add herf to the main page//
                window.location.href = "";
            }
            console.log(data);
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
    }
}
