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
        fetch("/api/posts/get-posts")
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var posts = _a.posts;
            if (!posts)
                throw new Error("didnt find Posts");
            var html = posts
                .map(function (posts) {
                return renderUserPosts(posts);
            });
        });
    }
    catch (error) {
        console.error(error);
    }
}
function renderUserPosts(posts) {
    try {
        var html = "\n        <div class=\"mainPagePost\">\n          <h3>" + posts.header + "</h3>\n          <img src=\"" + posts.content + "\" alt=\"" + posts.header + "\">\n          </div>\n      ";
        var postsUserRoot = document.querySelector("#postsUserRoot");
        if (!postsUserRoot)
            throw new Error("postsUserRoot not found");
        postsUserRoot.innerHTML += html;
    }
    catch (error) {
        console.error(error);
    }
}
