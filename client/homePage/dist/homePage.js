function renderPost(post) {
    try {
        var postDate = new Date(post.date);
        var formattedDate = postDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        var html = "\n      <div id=\"post_" + post._id + "\" class=\"mainPagePost\">\n        <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n        <h1>" + post.header + "</h1>\n        <p>" + formattedDate + "</p>\n        <div>\n          <input placeholder=\"Add Comment\" type=\"text\" id=\"commentInput_" + post._id + "\">\n          <button onclick=\"handleCreateComment('" + post._id + "')\">Add Comment</button>\n        </div>\n        <div class=\"commentsContainer_" + post._id + "\"></div>\n      </div>\n    ";
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
    try {
        fetch("/api/posts/get-posts")
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var posts = _a.posts;
            if (!posts)
                throw new Error("didnt find Posts");
            var html = posts
                .map(function (posts) {
                return renderPost(posts);
            });
        });
    }
    catch (error) {
        console.error(error);
    }
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
            renderComment({ postId: postId, content: comment_1, date: new Date().toString() });
            commentInput_1.value = "";
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
function fetchCommentsForPost(postId) {
    fetch("/api/comments/get-comments-by-postid")
        .then(function (res) { return res.json(); })
        .then(function (_a) {
        var comments = _a.comments;
        if (!comments)
            throw new Error("No comments found");
        var commentsHtml = comments
            .map(function (comment) {
            return renderComment(comment);
        })
            .join('');
        var postElement = document.querySelector("#post_" + postId);
        if (!postElement)
            throw new Error("Post element with id " + postId + " not found");
        var commentsContainer = postElement.querySelector(".commentsContainer_" + postId);
        if (!commentsContainer)
            throw new Error("Comments container for post " + postId + " not found");
        commentsContainer.innerHTML = commentsHtml;
    })["catch"](function (error) {
        console.error(error);
    });
}
function renderComment(comment) {
    var commentDate = new Date(comment.date);
    var formattedDate = commentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    var commentHtml = "\n      <div class=\"comment\">\n        <p>" + comment.content + "</p>\n        <span>" + formattedDate + "</span>\n      </div>\n    ";
    var commentsContainer = document.querySelector(".commentsContainer_" + comment.postId);
    if (!commentsContainer)
        throw new Error("Comments container for post " + comment.postId + " not found");
    commentsContainer.innerHTML += commentHtml;
}
