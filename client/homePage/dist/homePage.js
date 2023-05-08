"use strict";
exports.__esModule = true;
function renderPost(post) {
    try {
        var html = "\n        <div id=\"post\" class=\"mainPagePost\">\n        <img src=\"" + post.content + "\" alt=\"" + post.header + "\">\n        <h1>" + post.header + "</h1>\n        <p>$" + post.date + "</p>\n        <div>\n          <input type=\"number\" id=\"quantityInput\" value=\"1\" min=\"1\"> thtrthbdf\n          <button ('" + post._id + "')\">Add to Cart</button>\n        </div>\n        </div>\n      ";
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
function handleGetProduct() {
    try {
        fetch("/api/posts/get-posts")
            .then(function (res) { return res.json(); })
            .then(function (_a) {
            var posts = _a.posts;
            if (!posts)
                throw new Error("didnt find product");
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
