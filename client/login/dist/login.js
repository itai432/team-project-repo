var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
                var _a = data.userDB, password_1 = _a.password, currentUser = __rest(_a, ["password"]);
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
                window.location.href = "http://localhost:3000/homePage/index.html";
            }
            console.log(data);
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
    }
}
