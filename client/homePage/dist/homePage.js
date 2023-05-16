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
function renderPost(post, user) {
    try {
        var postDate = new Date(post.date);
        var formattedDate = postDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        var html = "\n      <div id=\"post_" + post._id + "\" class=\"mainPagePost\">\n        <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n        <h1>" + post.header + "</h1>\n        <p>Posted by " + user.username + " on " + formattedDate + "</p>\n        <div>\n          <input placeholder=\"Add Comment\" type=\"text\" id=\"commentInput_" + post._id + "\">\n          <button onclick=\"handleCreateComment('" + post._id + "')\">Add Comment</button>\n        </div>\n        <div  id=\"commentContainer_" + post._id + "\"></div>\n      </div>\n    ";
        var postRoot = document.querySelector("#postRoot");
        if (!postRoot)
            throw new Error("postRoot not found");
        postRoot.innerHTML += html;
    }
    catch (error) {
        console.error(error);
    }
}
function handleGetPosts() {
    return __awaiter(this, void 0, void 0, function () {
        var res, posts, _i, posts_1, post, user, error_1;
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
                    return [4 /*yield*/, fetchUserById(post.userId)];
                case 4:
                    user = _a.sent();
                    renderPost(post, user);
                    fetchCommentsForPost(post._id);
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _a.sent();
                    console.error(error_1);
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
        createPostRoot.innerHTML += html;
        createPostBtn.style.display = "block";
    }
    catch (error) {
        console.error(error);
    }
}
function closeCreatePostPopup() {
    var createPostRoot = document.querySelector("#createPostRoot");
    if (createPostRoot) {
        createPostRoot.innerHTML = "";
        var addPostBtn = document.querySelector("#createPostBtn");
        if (addPostBtn)
            addPostBtn.style.display = "block";
    }
}
function handleCreatePost(ev) {
    try {
        ev.preventDefault();
        var header_1 = ev.target.elements.header.value;
        var content_1 = ev.target.elements.content.value;
        var date_1 = new Date();
        if (!header_1)
            throw new Error("No header");
        if (!content_1)
            throw new Error("No content");
        if (!date_1)
            throw new Error("No date");
        var newPost = { content: content_1, header: header_1, date: date_1 };
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
            console.log(data);
            renderPost({
                _id: data.post._id,
                header: header_1,
                content: content_1,
                date: date_1
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
}
function handleCreateComment(postId) {
    try {
        var commentInput_1 = document.querySelector("#commentInput_" + postId);
        if (!commentInput_1) {
            throw new Error("Comment input not found");
        }
        var comment_1 = commentInput_1.value;
        if (!comment_1) {
            throw new Error("No comment");
        }
        var newComment = { postId: postId, content: comment_1 };
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
            console.log(data);
            renderComment({
                postId: postId,
                content: comment_1,
                date: Date
            }, postId);
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
    fetch("/api/comments/get-comments?postId=" + postId)
        .then(function (res) { return res.json(); })
        .then(function (_a) {
        var comments = _a.comments;
        if (!comments)
            throw new Error("No comments found");
        console.log(comments);
        var commentsHtml = comments
            .map(function (comment) {
            return renderComment(comment, postId);
        })
            .join("");
        var postElement = document.querySelector("#post_" + postId);
        if (!postElement)
            throw new Error("Post element with id " + postId + " not found");
        var commentContainers = postElement.querySelectorAll("#commentContainer_" + postId);
        if (!commentContainers || commentContainers.length === 0)
            throw new Error("Comments container for post " + postId + " not found");
        commentContainers.forEach(function (commentContainer) {
            commentContainer.innerHTML = commentsHtml;
        });
    })["catch"](function (error) {
        console.error(error);
    });
}
function renderComment(comment, postId) {
    var commentDate = new Date(comment.date);
    var formattedDate = commentDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    var commentHtml = "\n    <div class=\"comment\">\n      <p>" + comment.content + "</p>\n      <span>" + formattedDate + "</span>\n    </div>\n  ";
    return commentHtml;
}
function fetchUserById(userId) {
    return __awaiter(this, void 0, Promise, function () {
        var res, user, error_2;
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
                    error_2 = _a.sent();
                    console.error(error_2);
                    throw error_2;
                case 4: return [2 /*return*/];
            }
        });
    });
}
