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
function renderAdminPost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var user, postDate, formattedDate, html, postRoot, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetchAdminUserById(post.user)];
                case 1:
                    user = _a.sent();
                    postDate = new Date(post.date);
                    formattedDate = postDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    });
                    html = "\n        <div id=\"post_" + post._id + "\" class=\"mainPagePost post\">\n          <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n          <h1>" + post.header + "</h1>\n          <p>Posted by " + user.username + " on " + formattedDate + "</p>\n          <button onclick=\"handleDeletePost('" + post._id + "')\">Delete</button>\n        </div>\n      ";
                    postRoot = document.querySelector("#postRoot");
                    if (!postRoot)
                        throw new Error("postRoot not found");
                    postRoot.innerHTML += html;
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleAdminGetPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var res, posts, _i, posts_1, post, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, fetch("/api/posts/get-posts")];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    posts = (_a.sent()).posts;
                    if (!posts)
                        throw new Error("didnt find Posts");
                    _i = 0, posts_1 = posts;
                    _a.label = 3;
                case 3:
                    if (!(_i < posts_1.length)) return [3 /*break*/, 6];
                    post = posts_1[_i];
                    return [4 /*yield*/, fetchAdminUserById(post.userId)];
                case 4:
                    user = _a.sent();
                    renderAdminPost(post);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function fetchAdminUserById(userId) {
    return __awaiter(this, void 0, Promise, function () {
        var res, user, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/users/get-user-by-id?id=" + userId)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    user = (_a.sent()).user;
                    if (!user)
                        throw new Error("User not found");
                    return [2 /*return*/, user];
                case 3:
                    error_3 = _a.sent();
                    console.error(error_3);
                    throw error_3;
                case 4: return [2 /*return*/];
            }
        });
    });
}
//user
function handleGetUsersInfo() {
    fetch("/api/users/get-users", {
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
        renderUsersInfo(data.users); // Access the `users` array from `data`
    })["catch"](function (error) {
        console.error("Error fetching user data:", error);
    });
}
function renderUsersInfo(users) {
    try {
        // Loop through each user object in the `users` array
        var userElements = users.map(function (user) {
            return "\n            <div class=\"profileInfo\">\n              <h3>" + user.username + "</h3>\n              <p>Email: " + user.email + "</p><br></br>\n              <p>Birthday: " + user.birthday + "</p>\n            </div>\n          ";
        });
        var html = userElements.join(""); // Join the user elements into a single string
        var profileInfoRoot = document.querySelector("#profileInfoRoot");
        if (!profileInfoRoot)
            throw new Error("profileInfoRoot not found");
        profileInfoRoot.innerHTML = html;
    }
    catch (error) {
        console.error(error);
    }
}
function handleDeletePost(postId) {
    // Perform an HTTP request to delete the post on the server
    fetch("/api/posts/delete-post?id=" + postId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ _id: postId })
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.ok) {
            fetchPostsAndRender();
        }
        else {
            console.error(data.error);
        }
    })["catch"](function (error) {
        console.error(error);
    });
}
function fetchPostsAndRender() {
    fetch("/api/posts/get-posts", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (posts) {
        if (posts) {
            renderAdminPost(posts);
        }
        else {
            console.error("error");
        }
    })["catch"](function (error) {
        console.error(error);
    });
}
