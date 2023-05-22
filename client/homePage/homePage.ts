interface User {
  username: string;
  password: string;
  email: string;
  birthday: string;
}
interface Post {
  _id: string;
  header: string;
  content: string;
  date: Date;
}

interface IComment {
  _id?: string;
  postId: string;
  content: string;
  date?: string;
}

function renderPost(post: Post, user: User) {
  try {
    const postDate = new Date(post.date);
    const formattedDate = postDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const html = `
      <div id="post_${post._id}" class="mainPagePost post">
        <img src="${post.content}" alt="${post.header}">
        <h1>${post.header}</h1>
        <p>Posted by ${user.username} on ${formattedDate}</p>
        <div class="addCommentContainer">
          <input placeholder="Add Comment" type="text" id="commentInput_${post._id}">
          <button onclick="handleCreateComment('${post._id}')">Add Comment</button>
        </div>
        <div  class="containerClass" id="commentContainer_${post._id}"></div>
      </div>
    `;
    const postRoot = document.querySelector("#postRoot");
    if (!postRoot) throw new Error("postRoot not found");
    postRoot.innerHTML += html;
  } catch (error) {
    console.error(error);
  }
}

async function handleGetPosts() {
  try {
    const res = await fetch("/api/posts/get-posts");
    const { posts } = await res.json();

    if (!posts) throw new Error("didnt find Posts");
    for (const post of posts) {
      const user = await fetchUserById(post.userId);
      renderPost(post, user);
      fetchCommentsForPost(post._id);
    }
  } catch (error) {
    console.error(error);
  }
}


function reanderPopUpCreatePost() {
  try {
    const createPostRoot = document.querySelector("#createPostRoot");
    if (!createPostRoot) throw new Error("createPostRoot not found");
    const html = `
      <form onsubmit="handleCreatePost(event)" class="CreatePostContainer">
      <button type="button" class="CreatePostContainer__CloseBtn" onclick="closeCreatePostPopup()">&times;</button>
      <div class="CreatePostContainer__CreatePostHeader"></div>
      <div>
        <label for="header">Header:</label>
        <input type="text" id="header" name="header" class="CreatePostContainer__HeaderInput" required>
      </div>
      <div>
        <label for="content">Content:</label>
        <input type="url" id="content" name="content" class="CreatePostContainer__ContentInput" required>
      </div>
      <div>
        <button type="submit" class="CreatePostContainer__SubmitBtn">Post</button>
      </div>
    </form>
      `;
    const createPostBtn = createPostRoot.querySelector("button");
    if (!createPostBtn) throw new Error("createPostBtn not found");
    createPostRoot.innerHTML += html;
    createPostBtn.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}
function closeCreatePostPopup() {
  const createPostRoot = document.querySelector("#createPostRoot");

  if (createPostRoot) {
    createPostRoot.innerHTML = "";
    const addPostBtn = document.querySelector(
      "#createPostBtn"
    ) as HTMLButtonElement;
    if (addPostBtn) addPostBtn.style.display = "block";
  }
}

function handleCreatePost(ev: any) {
  try {
    ev.preventDefault()
    const header = ev.target.elements.header.value;
    const content = ev.target.elements.content.value;
    const date = new Date();
  

    if (!header) throw new Error("No header");
    if (!content) throw new Error("No content");
    if (!date) throw new Error("No date");

    const newPost: any = { content, header, date: date };
    fetch("/api/posts/create-post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        renderPost({
          _id: data.post._id,
          header: header,
          content: content,
          date: date,
        },);
        ev.target.reset();
        closeCreatePostPopup();
        const addPostBtn = document.querySelector(
          "#createPostBtn"
        ) as HTMLButtonElement;
        if (addPostBtn) addPostBtn.style.display = "block";
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

function handleCreateComment(postId: string) {
  try {
    const commentInput = document.querySelector(
      `#commentInput_${postId}`
    ) as HTMLInputElement;
    if (!commentInput) {
      throw new Error("Comment input not found");
    }

    const comment = commentInput.value;
    if (!comment) {
      throw new Error("No comment");
    }

    const currentDate = new Date();

    const newComment = { postId, content: comment, currentDate};
    fetch("/api/comments/create-comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer <user>`,
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        renderComment(newComment, postId, currentDate.toString());
        commentInput.value = "";
        fetchCommentsForPost(postId);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

function fetchCommentsForPost(postId: string) {

  fetch(`/api/comments/get-comments?postId=${postId}`)
    .then((res) => res.json() )
    .then(({ comments }) => {
      if (!comments) throw new Error("No comments found");
      const commentsHtml = comments
        .map((comment) => {
          return renderComment(comment, postId, comment.currentDate);
        })
        .join("");

      const postElement = document.querySelector(`#post_${postId}`);
      if (!postElement)
        throw new Error(`Post element with id ${postId} not found`);

      const commentContainers = postElement.querySelectorAll(`#commentContainer_${postId}`);
      if (!commentContainers || commentContainers.length === 0)
        throw new Error(`Comments container for post ${postId} not found`);

      commentContainers.forEach((commentContainer) => {
        commentContainer.innerHTML = commentsHtml;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderComment(comment: IComment, postId: string, date: string) {
  const commentDate = new Date(date);
  const formattedDate = commentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const commentHtml = `
    <div class="comment">
      <p>${comment.content}</p>
      <span>${formattedDate}</span>
    </div>
  `;

  return commentHtml;
}

async function fetchUserById(userId: string): Promise<User> {
  try {
    const res = await fetch(`/api/users/get-user-by-id?id=${userId}`);
    const { user } = await res.json();

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
