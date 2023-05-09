function handleLogin(ev) {
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        var email = ev.target.elements.email.value;
        var password = ev.target.elements.password.value;
        if (!email)
            throw new Error("No email");
        if (!password)
            throw new Error("No Password");
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
                window.location.href = "http://localhost:3000/homePage/index.html";
            }
            console.log(data);
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
