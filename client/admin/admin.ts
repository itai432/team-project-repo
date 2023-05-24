interface User {
  username: string;
  password: string;
  email: string;
  birthday: string;
}
interface IPost {
  _id: string;
  header: string;
  content: string;
  date: Date;
  user: string;
}

async function renderAdminPost(post: IPost) {
  try {
    const user = await fetchAdminUserById(post.user);
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
          <button onclick="handleDeletePost('${post._id}')">Delete</button>
        </div>
      `;
    const postRoot = document.querySelector("#postRoot");
    if (!postRoot) throw new Error("postRoot not found");
    postRoot.innerHTML += html;
  } catch (error) {
    console.error(error);
  }
}

async function handleAdminGetPosts() {
  try {
    const res = await fetch("/api/posts/get-posts");
    const { posts } = await res.json();
    if (!posts) throw new Error("didnt find Posts");
    for (const post of posts) {
      const user = await fetchAdminUserById(post.userId);
      renderAdminPost(post);
    }
  } catch (error) {
    console.error(error);
  }
}
async function fetchAdminUserById(userId: string): Promise<User> {
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

//user
function handleGetUsersInfo() {
  fetch("/api/users/get-users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      renderUsersInfo(data.users); // Access the `users` array from `data`
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

function renderUsersInfo(users) {
  // Modify the function parameter name
  try {
    // Loop through each user object in the `users` array
    const userElements = users.map((user) => {
      return `
            <div class="profileInfo">
              <h3>${user.username}</h3>
              <p>Email: ${user.email}</p><br></br>
              <p>Birthday: ${user.birthday}</p>
            </div>
          `;
    });

    const html = userElements.join(""); // Join the user elements into a single string
    const profileInfoRoot = document.querySelector("#profileInfoRoot");
    if (!profileInfoRoot) throw new Error("profileInfoRoot not found");
    profileInfoRoot.innerHTML = html;
  } catch (error) {
    console.error(error);
  }
}

function handleDeletePost(postId) {
  // Perform an HTTP request to delete the post on the server
  fetch(`/api/posts/delete-post?id=${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: postId }),
  })
    .then((response) => response.json())
    .then((data) => {
      getPostsAfterDelete()
    })
    .catch((error) => {
      console.error(error);
    });
}

const getPostsAfterDelete = async () => {
  const res = await fetch("/api/posts/get-posts");
  const { posts } = await res.json();
  const html = ``
  const postRoot = document.querySelector("#postRoot");
  if (!postRoot) throw new Error("postRoot not found");
  postRoot.innerHTML = html;
  if(posts)
  posts.map((post) => {
    renderPostsAfterDelete(post)
  })
}

const renderPostsAfterDelete = (post: IPost) => {
  console.log(post)
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
        <div>Posted on ${formattedDate}</div>
        <button onclick="handleDeletePost('${post._id}')">Delete</button>
      </div>
    `;
  const postRoot = document.querySelector("#postRoot");
  if (!postRoot) throw new Error("postRoot not found");
  postRoot.innerHTML += html;
}

