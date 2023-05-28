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

const checkIsAdmin = async () => {
  try {
    const response = await fetch("/api/users/admin", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("userType", data.decoded.userType)
      return data.decoded.userType;
    }
  } catch (error) {
    console.log("Error occurred:", error);
  }
   }

async function renderAdminPost(post: IPost) {
  const userType = localStorage.getItem("userType")
  if(userType === "admin"){
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
            <div class="postTitle">${post.header}</div>
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
 else{
  alert("unauthorized")
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
      renderUsersInfo(data.users);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

function renderUsersInfo(users) {
  const userType = localStorage.getItem("userType")
  if(userType === "admin"){
    try {
      const userElements = users.map((user) => {
        return `
              <div class="profileInfo">
                <h3>${user.username}</h3>
                <p>Email: ${user.email}</p><br></br>
                <p>Birthday: ${user.birthday}</p>
                <button onclick="deleteUser('${user._id}')">Delete</button>
              </div>
            `;
      });
  
      const html = userElements.join("");
      const profileInfoRoot = document.querySelector("#profileInfoRoot");
      if (!profileInfoRoot) throw new Error("profileInfoRoot not found");
      profileInfoRoot.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }
  else{
    console.log("not admin")
  }
}

function handleDeletePost(postId) {
  fetch(`/api/posts/delete-post?id=${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: postId }),
  })
    .then((response) => response.json())
    .then((data) => {
      getPostsAfterDelete();
    })
    .catch((error) => {
      console.error(error);
    });
}

const getPostsAfterDelete = async () => {
  const res = await fetch("/api/posts/get-posts");
  const { posts } = await res.json();
  const html = ``;
  const postRoot = document.querySelector("#postRoot");
  if (!postRoot) throw new Error("postRoot not found");
  postRoot.innerHTML = html;
  if (posts)
    posts.map((post) => {
      renderPostsAfterDelete(post);
    });
};

const renderPostsAfterDelete = (post: IPost) => {
  const postDate = new Date(post.date);
  const formattedDate = postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const html = `
      <div id="post_${post._id}" class="mainPagePost post">
        <img src="${post.content}" alt="${post.header}">
        <div class="postTitle">${post.header}</div>
        <div>Posted on ${formattedDate}</div>
        <button onclick="handleDeletePost('${post._id}')">Delete</button>
      </div>
    `;
  const postRoot = document.querySelector("#postRoot");
  if (!postRoot) throw new Error("postRoot not found");
  postRoot.innerHTML += html;
};


const deleteUser = async (userId) => {
  const html = ``;
  const profileInfoRoot = document.querySelector("#profileInfoRoot");
  if (!profileInfoRoot) throw new Error("profileInfoRoot not found");
  profileInfoRoot.innerHTML = html;
  fetch(`/api/users/delete-user?id=${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: userId }),
  })
    .then((response) =>( response.json()))
    .then(({ users }) => {
      if (users) {
        users.map((user) => {
          renderUsersAfetrDelete(user);
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const renderUsersAfetrDelete = (user) => {
  const html = `<div class="profileInfo">
 <h3>${user.username}</h3>
 <p>Email: ${user.email}</p><br></br>
 <p>Birthday: ${user.birthday}</p>
 <button onclick="deleteUser('${user._id}')">Delete</button>
</div>`;
  const profileInfoRoot = document.querySelector("#profileInfoRoot");
  if (!profileInfoRoot) throw new Error("profileInfoRoot not found");
  profileInfoRoot.innerHTML += html;
};
function logout(){
  fetch('/api/users/logout', {
    method: 'GET',
    credentials: 'same-origin'
  })
    .then(response => {
      if (response.ok) {
        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        window.location.href = 'http://localhost:3000/login/index.html';
      } else {
        throw new Error('Logout request failed');
      }
    })
    .catch(error => {
      console.error(error);
    });
}
