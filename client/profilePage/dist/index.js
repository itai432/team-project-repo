var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
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
        var html = "\n        <div class=\"profileInfo\">\n          <h3>" + user.username + "</h3>\n          <p>Email: " + user.email + "</p>\n          <p>Birthday: " + user.birthday + "</p>\n          \n        </div>\n        <div class=\"main__container__updateUser\" id=\"updateUserRoot\">\n        <button onclick=\"reanderPopUpUpdateUser('" + user._id + "')\">Edit Profile</button>\n      </div>\n      ";
        var profileInfoRoot = document.querySelector("#profileInfoRoot");
        if (!profileInfoRoot)
            throw new Error("profileInfoRoot not found");
        profileInfoRoot.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function reanderPopUpUpdateUser(userId) {
    try {
        var updateUserRoot = document.querySelector("#updateUserRoot");
        if (!updateUserRoot)
            throw new Error("updateUserRoot not found");
        var html = "\n      <div>If you don't want on of the fields to be changed, copy the exsiting value of the field</div>\n        <form onsubmit=\"handleupdateUser(event)\" class=\"updateUserContainer\">\n        <button type=\"button\" class=\"updateUserContainer__CloseBtn\" onclick=\"closeupdateUserPopup()\">&times;</button>\n        <div class=\"updateUserContainer__updateUserHeader\"></div>\n        <div>\n          <label for=\"username\">username:</label>\n          <input type=\"text\" id=\"username\" name=\"username\" class=\"updateUserContainer__HeaderInput\" required>\n        </div>\n        <div>\n          <label for=\"email\">email:</label>\n          <input type=\"email\" id=\"email\" name=\"email\" class=\"updateUserContainer__ContentInput\" required>\n        </div>\n        <div>\n          <button type=\"submit\" class=\"updateUserContainer__SubmitBtn\" onclick=\"handleUpdateUserName(event,'" + userId + "')\">update</button>\n        </div>\n      </form>\n        ";
        var updateUserBtn = updateUserRoot.querySelector("button");
        if (!updateUserBtn)
            throw new Error("updateUserBtn not found");
        updateUserRoot.innerHTML = html;
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
function handleUpdateUserName(ev, userId) {
    try {
        ev.preventDefault();
        var usernameInput = document.querySelector("#username");
        var emailInput = document.querySelector("#email");
        var username = usernameInput.value.trim();
        var email = emailInput.value.trim();
        var newUser = { userId: userId };
        if (username !== "") {
            newUser.username = username;
        }
        if (email !== "") {
            newUser.email = email;
        }
        fetch("/api/users/update-user-name?userId=" + userId, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var user = _a.user;
            console.log(user);
            renderProfileInfo(user);
        })["catch"](function (error) {
            console.error(error);
        });
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
        var html = "\n        <div class=\"mainPagePost\" id=\"post_" + post._id + "\">\n          <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n          <h3>" + post.header + "</h3>\n          <div class=\"main__container__updatePost\" id=\"updatePostRoot_" + post._id + "\">\n            <button class=\"editPostIcon\" onclick=\"reanderPopUpUpdatePost('" + post._id + "')\"></button>\n          </div>\n          <div class=\"main__container__deletePost\" id=\"deletePostRoot_" + post._id + "\">\n          <button class=\"deletePostIcon\" onclick=\"handleDeletePost('" + post._id + "')\"></button>\n        </div>\n        </div>\n      ";
        var postsUserRoot = document.querySelector("#postsUserRoot");
        if (!postsUserRoot)
            throw new Error("postsUserRoot not found");
        postsUserRoot.innerHTML += html;
    }
    catch (error) {
        console.error(error);
    }
}
function renderUserPostsAfterUpdate(post) {
    try {
        var postElement = document.getElementById("post_" + post._id);
        if (!postElement)
            throw new Error("postElement not found");
        var imageElement = postElement.querySelector("img");
        if (!imageElement)
            throw new Error("imageElement not found");
        imageElement.src = post.content;
        var headerElement = postElement.querySelector("h3");
        if (!headerElement)
            throw new Error("headerElement not found");
        headerElement.textContent = post.header;
    }
    catch (error) {
        console.error(error);
    }
}
function reanderPopUpUpdatePost(postId) {
    try {
        var updatePostRoot = document.querySelector("#updatePostRoot_" + postId);
        if (!updatePostRoot)
            throw new Error("updatePostRoot not found");
        var html = "\n        <form onsubmit=\"handleUpdateUserPost(event)\" class=\"updatePostContainer\">\n          <button type=\"button\" class=\"updatePostContainer__CloseBtn\" onclick=\"closeupdatePostPopup('" + postId + "')\">&times;</button>\n          <div class=\"updatePostContainer__updatePostHeader\"></div>\n          <div>\n            <label for=\"header\">header:</label>\n            <input type=\"text\" id=\"header\" name=\"header\" class=\"updatePostContainer__HeaderInput\" required>\n          </div>\n          <div>\n            <label for=\"content\">content:</label>\n            <input type=\"content\" id=\"content\" name=\"content\" class=\"updatePostContainer__ContentInput\" required>\n          </div>\n          <div>\n            <button type=\"submit\" class=\"updatePostContainer__SubmitBtn\" onclick=\"handleUpdateUserPost(event,'" + postId + "')\">update</button>\n          </div>\n        </form>\n      ";
        var updatePostBtn = updatePostRoot.querySelector("button");
        if (!updatePostBtn)
            throw new Error("updatePostBtn not found");
        updatePostRoot.innerHTML += html;
        updatePostBtn.style.display = "none";
    }
    catch (error) {
        console.error(error);
    }
}
function closeupdatePostPopup(postId) {
    var updatePostRoot = document.querySelector("#updatePostRoot_" + postId);
    if (updatePostRoot) {
        updatePostRoot.innerHTML = "<button class=\"editPostIcon\" onclick=\"reanderPopUpUpdatePost('" + postId + "')\"></button>";
        var updatePostBtn = updatePostRoot.querySelector("button");
        if (updatePostBtn)
            updatePostBtn.style.display = "block";
    }
}
function handleUpdateUserPost(ev, postId) {
    try {
        ev.preventDefault();
        var headerInput = document.querySelector("#header");
        var contentInput = document.querySelector("#content");
        var header = headerInput.value.trim();
        var content = contentInput.value.trim();
        if (header === "" && content === "") {
            console.error("Both header and content fields cannot be empty");
            return;
        }
        var newPost = { postId: postId };
        if (header !== "") {
            newPost.header = header;
        }
        if (content !== "") {
            newPost.content = content;
        }
        fetch("/api/posts/update-post?postId=" + postId, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var post = _a.post;
            renderUserPostsAfterUpdate(post);
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
function handleDeletePost(postId) {
    var confirmation = confirm("Are you sure you want to delete this post?");
    if (confirmation) {
        fetch("/api/posts/delete-post?id=" + postId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: postId })
        })
            .then(function (response) { return response.json(); })
            .then(function (data) {
            getPostsAfterDelete();
        })["catch"](function (error) {
            console.error(error);
        });
    }
}
var getPostsAfterDelete = function () { return __awaiter(_this, void 0, void 0, function () {
    var res, posts, html, postRoot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api/posts/get-posts-of-user")];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                posts = (_a.sent()).posts;
                html = "";
                postRoot = document.querySelector("#postsUserRoot");
                if (!postRoot)
                    throw new Error("postRoot not found");
                postRoot.innerHTML = html;
                if (posts)
                    posts.map(function (post) {
                        renderPostsAfterDelete(post);
                    });
                return [2 /*return*/];
        }
    });
}); };
var renderPostsAfterDelete = function (post) {
    var postDate = new Date(post.date);
    var formattedDate = postDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    var html = "\n  <div class=\"mainPagePost\" id=\"post_" + post._id + "\">\n  <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n  <h3>" + post.header + "</h3>\n  <div class=\"main__container__updatePost\" id=\"updatePostRoot_" + post._id + "\">\n    <button class=\"editPostIcon\" onclick=\"reanderPopUpUpdatePost('" + post._id + "')\"></button>\n  </div>\n  <div class=\"main__container__deletePost\" id=\"deletePostRoot_" + post._id + "\">\n  <button class=\"deletePostIcon\" onclick=\"handleDeletePost('" + post._id + "')\"></button>\n</div>\n</div>\n    ";
    var postRoot = document.querySelector("#postsUserRoot");
    if (!postRoot)
        throw new Error("postRoot not found");
    postRoot.innerHTML += html;
};
function logout() {
    fetch('/api/users/logout', {
        method: 'GET',
        credentials: 'same-origin'
    })
        .then(function (response) {
        if (response.ok) {
            document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            window.location.href = 'http://localhost:3000/login/index.html';
        }
        else {
            throw new Error('Logout request failed');
        }
    })["catch"](function (error) {
        console.error(error);
    });
}
