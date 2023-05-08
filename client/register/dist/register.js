function handleCreateUser(ev) {
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        var userName = ev.target.elements.userName.value;
        var password = ev.target.elements.password.value;
        var email = ev.target.elements.email.value;
        var birthDay = ev.target.elements.birthDay.value;
        if (!userName)
            throw new Error("No name");
        if (!password)
            throw new Error("No Password");
        if (!email)
            throw new Error("No email");
        if (!birthDay)
            throw new Error("No birthDay");
        var newUser = { userName: userName, password: password, email: email, birthDay: birthDay };
        fetch("/api/users/create-user", {
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
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
