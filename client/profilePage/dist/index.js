function handleGetProfileInfo() {
    fetch("/api/users/get-user-by-id", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
        .then(function (data) {
        renderProfileInfo(data.user);
    })["catch"](function (error) {
        console.error("Error fetching user data:", error);
    });
}
function renderProfileInfo(user) {
    try {
        var html = "\n        <div class=\"profileInfo\">\n          <h3>" + user.username + "</h3>\n          <p>Email: " + user.email + "</p>\n          <p>Birthday: " + user.birthday + "</p>\n        </div>\n      ";
        var profileInfoRoot = document.querySelector("#profileInfoRoot");
        if (!profileInfoRoot)
            throw new Error("profileInfoRoot not found");
        profileInfoRoot.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function handleGetUserPosts() {
    try {
        fetch("/api/posts/get-posts-of-user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var posts = _a.posts;
            if (!posts)
                throw new Error("Posts not found");
            posts.forEach(function (post) { return renderUserPosts(post); });
        });
    }
    catch (error) {
        console.error(error);
    }
}
function renderUserPosts(post) {
    try {
        var html = "\n        <div class=\"mainPagePost\">\n          <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n          <h3>" + post.header + "</h3>\n        </div>\n      ";
        var postsUserRoot = document.querySelector("#postsUserRoot");
        if (!postsUserRoot)
            throw new Error("postsUserRoot not found");
        postsUserRoot.innerHTML += html;
    }
    catch (error) {
        console.error(error);
    }
}
function reanderPopUpUpdateUser() {
    try {
        var updateUserRoot = document.querySelector("#updateUserRoot");
        if (!updateUserRoot)
            throw new Error("updateUserRoot not found");
        var html = "\n        <form onsubmit=\"handleupdateUser(event)\" class=\"updateUserContainer\">\n        <button type=\"button\" class=\"updateUserContainer__CloseBtn\" onclick=\"closeupdateUserPopup()\">&times;</button>\n        <div class=\"updateUserContainer__updateUserHeader\"></div>\n        <div>\n          <label for=\"username\">username:</label>\n          <input type=\"text\" id=\"username\" name=\"username\" class=\"updateUserContainer__HeaderInput\" required>\n        </div>\n        <div>\n          <label for=\"email\">email:</label>\n          <input type=\"email\" id=\"email\" name=\"email\" class=\"updateUserContainer__ContentInput\" required>\n        </div>\n        <div>\n          <button type=\"submit\" class=\"updateUserContainer__SubmitBtn\" onclick=\"handleUpdateUserName(event)\">update</button>\n        </div>\n      </form>\n        ";
        var updateUserBtn = updateUserRoot.querySelector("button");
        if (!updateUserBtn)
            throw new Error("updateUserBtn not found");
        updateUserRoot.innerHTML += html;
        updateUserBtn.style.display = "block";
    }
    catch (error) {
        console.error(error);
    }
}
function closeupdateUserPopup() {
    var updateUserRoot = document.querySelector("#updateUserRoot");
    if (updateUserRoot) {
        updateUserRoot.innerHTML = "";
        var addPostBtn = document.querySelector("#updateUserBtn");
        if (addPostBtn)
            addPostBtn.style.display = "block";
    }
}
function handleUpdateUserName(ev) {
    try {
        ev.preventDefault();
        var username = ev.target.elements.username.value;
        var email = ev.target.elements.email.value;
        console.log(username, email);
        var newUser = { username: username, email: email };
        fetch('/api/users/update-user-name', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newUser: newUser })
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var date = _a.date;
            console.log(date);
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
