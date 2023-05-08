function renderPost(post) {
    try {
        var html = "\n        <div id=\"post\" class=\"mainPagePost\">\n        <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n        <h1>" + post.header + "</h1>\n        <p>" + post.date + "</p>\n        <div>\n          <input type=\"text\" id=\"\"> \n          <button ('" + post._id + "')\">Add Comment</button>\n        </div>\n        </div>\n      ";
        var postRoot = document.querySelector("#postRoot");
        if (!postRoot)
            throw new Error("postRoot not found");
        postRoot.innerHTML += html;
        console.log(post);
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
        createPostBtn.style.display = "none";
        createPostRoot.innerHTML += html;
    }
    catch (error) {
        console.error(error);
    }
}
function closeCreatePostPopup() {
    var createPostRoot = document.querySelector("#createPostRoot");
    if (createPostRoot) {
        createPostRoot.innerHTML = "";
        var addPostBtn = document.querySelector("#createPostRoot");
        if (addPostBtn)
            addPostBtn.style.display = "block";
    }
}
;
function handleCreatePost(ev) {
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        var header = ev.target.elements.header.value;
        var content = ev.target.elements.content.value;
        var date = new Date();
        console.log(date);
        if (!header)
            throw new Error("No header");
        if (!content)
            throw new Error("No content");
        if (!date)
            throw new Error("No date");
        var newPost = { content: content, header: header, date: date.toString() };
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
        })["catch"](function (error) {
            console.error(error);
        });
    }
    catch (error) {
        console.error(error);
    }
}
