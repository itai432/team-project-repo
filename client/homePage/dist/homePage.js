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
function renderPost(post) {
    return __awaiter(this, void 0, void 0, function () {
        var postDate, formattedDate, res, user, html, postRoot, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    postDate = new Date(post.date);
                    formattedDate = postDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                    });
                    return [4 /*yield*/, fetch("/api/users/getUser?user=" + post.user)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    user = (_a.sent()).user;
                    html = "\n      <div id=\"post_" + post._id + "\" class=\"mainPagePost post\">\n        <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n        <h1>" + post.header + "</h1>\n        <p>Posted by " + user.username + " on " + formattedDate + "</p>\n        <div class=\"addCommentContainer\">\n          <input placeholder=\"Add Comment\" type=\"text\" id=\"commentInput_" + post._id + "\">\n          <br></br>\n          <button onclick=\"handleCreateComment('" + post._id + "')\">Add Comment</button>\n          <br></br> \n        </div>\n        <div class=\"containerClass\" id=\"commentContainer_" + post._id + "\"></div>\n      </div>\n    ";
                    postRoot = document.querySelector("#postRoot");
                    if (!postRoot)
                        throw new Error("postRoot not found");
                    postRoot.innerHTML = html + postRoot.innerHTML;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function handleGetPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var res, posts, reversedPosts, _i, reversedPosts_1, post, error_2;
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
                    reversedPosts = posts.reverse();
                    _i = 0, reversedPosts_1 = reversedPosts;
                    _a.label = 3;
                case 3:
                    if (!(_i < reversedPosts_1.length)) return [3 /*break*/, 6];
                    post = reversedPosts_1[_i];
                    return [4 /*yield*/, renderPost(post)];
                case 4:
                    _a.sent();
                    fetchCommentsForPost(post._id);
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
function reanderPopUpCreatePost() {
    try {
        var createPostRoot = document.querySelector("#createPostRoot");
        if (!createPostRoot)
            throw new Error("createPostRoot not found");
        var html = "\n      <form onsubmit=\"handleCreatePost(event)\" class=\"CreatePostContainer\">\n      <button type=\"button\" class=\"CreatePostContainer__CloseBtn\" onclick=\"closeCreatePostPopup()\">&times;</button>\n      <div class=\"CreatePostContainer__CreatePostHeader\"></div>\n      <div>\n        <label for=\"header\">Header:</label>\n        <input type=\"text\" id=\"header\" name=\"header\" class=\"CreatePostContainer__HeaderInput\" required>\n      </div>\n      <div>\n        <label for=\"content\">Content:</label>\n        <input type=\"url\" id=\"content\" name=\"content\" class=\"CreatePostContainer__ContentInput\" required>\n      </div>\n      <div>\n        <button type=\"submit\" class=\"CreatePostContainer__SubmitBtn\">Post</button>\n      </div>\n    </form>\n      ";
        var createPostBtn = createPostRoot.querySelector("button");
        if (!createPostBtn)
            throw new Error("createPostBtn not found");
        createPostRoot.innerHTML += html, "<button onclick=\"reanderPopUpCreatePost()\" id=\"\">ADD POST</button>";
        createPostBtn.style.display = "block";
    }
    catch (error) {
        console.error(error);
    }
}
function closeCreatePostPopup() {
    var createPostRoot = document.querySelector("#createPostRoot");
    if (createPostRoot) {
        createPostRoot.innerHTML = "<button onclick=\"reanderPopUpCreatePost()\" id=\"\">ADD POST</button>";
        var addPostBtn = document.querySelector("#createPostBtn");
        if (addPostBtn)
            addPostBtn.style.display = "block";
    }
}
function handleCreatePost(ev) {
    return __awaiter(this, void 0, void 0, function () {
        var header_1, content_1, date_1, newPost;
        return __generator(this, function (_a) {
            try {
                ev.preventDefault();
                header_1 = ev.target.elements.header.value;
                content_1 = ev.target.elements.content.value;
                date_1 = new Date();
                if (!header_1)
                    throw new Error("No header");
                if (!content_1)
                    throw new Error("No content");
                if (!date_1)
                    throw new Error("No date");
                newPost = { content: content_1, header: header_1, date: date_1 };
                fetch("/api/posts/create-post", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newPost)
                })
                    .then(function (res) { return res.json(); })
                    .then(function (data) {
                    var post = data.post;
                    renderPost({
                        _id: post._id,
                        header: header_1,
                        content: content_1,
                        date: date_1,
                        user: post.user
                    });
                    ev.target.reset();
                    closeCreatePostPopup();
                    var addPostBtn = document.querySelector("#createPostBtn");
                    if (addPostBtn)
                        addPostBtn.style.display = "block";
                })["catch"](function (error) {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
            return [2 /*return*/];
        });
    });
}
function handleCreateComment(postId) {
    try {
        var commentInput_1 = document.querySelector("#commentInput_" + postId);
        if (!commentInput_1) {
            throw new Error("Comment input not found");
        }
        var comment = commentInput_1.value;
        if (!comment) {
            throw new Error("No comment");
        }
        var currentDate_1 = new Date();
        var newComment = { postId: postId, content: comment, currentDate: currentDate_1 };
        fetch("/api/comments/create-comment", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer <user>"
            },
            body: JSON.stringify(newComment)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var comment = data.comment, username = data.username;
            renderComment(comment, postId, currentDate_1.toString(), username);
            commentInput_1.value = "";
            fetchCommentsForPost(postId);
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
function fetchCommentsForPost(postId) {
    var _this = this;
    fetch("/api/comments/get-comments?postId=" + postId)
        .then(function (res) { return res.json(); })
        .then(function (_a) {
        var comments = _a.comments;
        if (!comments)
            throw new Error("No comments found");
        var commentPromises = comments.map(function (comment) { return __awaiter(_this, void 0, void 0, function () {
            var res, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("/api/users/getUser?user=" + comment.user)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        user = (_a.sent()).user;
                        return [2 /*return*/, renderComment(comment, postId, comment.currentDate, user.username)];
                }
            });
        }); });
        Promise.all(commentPromises)
            .then(function (commentsHtml) {
            var postElement = document.querySelector("#post_" + postId);
            if (!postElement)
                throw new Error("Post element with id " + postId + " not found");
            var commentContainers = postElement.querySelectorAll("#commentContainer_" + postId);
            if (!commentContainers || commentContainers.length === 0)
                throw new Error("Comments container for post " + postId + " not found");
            commentContainers.forEach(function (commentContainer) {
                commentContainer.innerHTML = commentsHtml.join("");
            });
        })["catch"](function (error) {
            console.error(error);
        });
    })["catch"](function (error) {
        console.error(error);
    });
}
function renderComment(comment, postId, date, username) {
    var commentDate = new Date(date);
    var formattedDate = commentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    var commentHtml = "\n    <div class=\"comment\">\n    <h3>" + username + "<p>" + comment.content + "</p></h3>\n    <span>" + formattedDate + "</span>\n    </div>\n  ";
    return commentHtml;
}
function fetchUserById(userId) {
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
