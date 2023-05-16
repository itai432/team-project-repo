interface User{
    username: string,
    password: string,
    email: string,
    birthday: string,
    _id: string,
}
interface Post {
    _id: string,
    header:string,
    content:string,
    date: Date,
}
function handleGetProfileInfo() {
    fetch("/api/users/get-user-by-id", {
      method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        renderProfileInfo(data.user);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
  
  function renderProfileInfo(user:User) {
    try {
      const html = `
        <div class="profileInfo">
          <h3>${user.username}</h3>
          <p>Email: ${user.email}</p>
          <p>Birthday: ${user.birthday}</p>
        </div>
        <div class="main__container__updateUser" id="updateUserRoot">
        <button onclick="reanderPopUpUpdateUser('${user._id}')">Edit Profile</button>
      </div>
      `;
      const profileInfoRoot = document.querySelector("#profileInfoRoot");
      if (!profileInfoRoot) throw new Error("profileInfoRoot not found");
      profileInfoRoot.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }
  function reanderPopUpUpdateUser(userId:string) {
    try {
      const updateUserRoot = document.querySelector("#updateUserRoot");
      if (!updateUserRoot) throw new Error("updateUserRoot not found");
      const html = `
        <form onsubmit="handleupdateUser(event)" class="updateUserContainer">
        <button type="button" class="updateUserContainer__CloseBtn" onclick="closeupdateUserPopup()">&times;</button>
        <div class="updateUserContainer__updateUserHeader"></div>
        <div>
          <label for="username">username:</label>
          <input type="text" id="username" name="username" class="updateUserContainer__HeaderInput" >
        </div>
        <div>
          <label for="email">email:</label>
          <input type="email" id="email" name="email" class="updateUserContainer__ContentInput" >
        </div>
        <div>
          <button type="submit" class="updateUserContainer__SubmitBtn" onclick="handleUpdateUserName(event,'${userId}')">update</button>
        </div>
      </form>
        `;
      const updateUserBtn = updateUserRoot.querySelector("button");
      if (!updateUserBtn) throw new Error("updateUserBtn not found");
      updateUserRoot.innerHTML += html;
      updateUserBtn.style.display = "block";
    } catch (error) {
      console.error(error);
    }
  }
  function closeupdateUserPopup() {
    const updateUserRoot = document.querySelector("#updateUserRoot");
  
    if (updateUserRoot) {
      updateUserRoot.innerHTML = "";
      const addPostBtn = document.querySelector(
        "#updateUserBtn"
      ) as HTMLButtonElement;
      if (addPostBtn) addPostBtn.style.display = "block";
    }
  }


  function handleUpdateUserName(ev: any, userId: string) {
    try {
      ev.preventDefault();
      const usernameInput = document.querySelector("#username") as HTMLInputElement;
      const emailInput = document.querySelector("#email") as HTMLInputElement;
      const username = usernameInput.value;
      const email = emailInput.value;
  
      const newUser: any = { username, email, userId };
  
      fetch(`/api/users/update-user-name?userId=${userId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then(({ user }) => {
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }

  function handleGetUserPosts() {
    try {
      fetch("/api/posts/get-posts-of-user", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(({ posts }) => {
          if (!posts) throw new Error("Posts not found");
          posts.forEach((post) => renderUserPosts(post));
        });
    } catch (error) {
      console.error(error);
    }
  }
  
  function renderUserPosts(post: Post) {
    try {
      const html = `
        <div class="mainPagePost">
          <img src="${post.content}" alt="${post.header}">
          <h3>${post.header}</h3>
          <div class="main__container__updatePost" id="updatePostRoot_${post._id}">
            <button onclick="reanderPopUpUpdatePost('${post._id}')">Edit Post</button>
          </div>
        </div>
      `;
      const postsUserRoot = document.querySelector("#postsUserRoot");
      if (!postsUserRoot) throw new Error("postsUserRoot not found");
      postsUserRoot.innerHTML += html;
    } catch (error) {
      console.error(error);
    }
  }




  function reanderPopUpUpdatePost(postId:string) {
    try {
      const updatePostRoot = document.querySelector(`#updatePostRoot_${postId}`);
      if (!updatePostRoot) throw new Error("updatePostRoot not found");
      const html = `
        <form onsubmit="handleUpdateUserPost(event)" class="updatePostContainer">
          <button type="button" class="updatePostContainer__CloseBtn" onclick="closeupdatePostPopup('${postId}')">&times;</button>
          <div class="updatePostContainer__updatePostHeader"></div>
          <div>
            <label for="header">header:</label>
            <input type="text" id="header" name="header" class="updatePostContainer__HeaderInput" >
          </div>
          <div>
            <label for="content">content:</label>
            <input type="content" id="content" name="content" class="updatePostContainer__ContentInput" >
          </div>
          <div>
            <button type="submit" class="updatePostContainer__SubmitBtn" onclick="handleUpdateUserPost(event,'${postId}')">update</button>
          </div>
        </form>
      `;
      const updatePostBtn = updatePostRoot.querySelector("button");
      if (!updatePostBtn) throw new Error("updatePostBtn not found");
      updatePostRoot.innerHTML += html;
      updatePostBtn.style.display = "none";
    } catch (error) {
      console.error(error);
    }
  }
  function closeupdatePostPopup(postId:string) {
    const updatePostRoot = document.querySelector(`#updatePostRoot_${postId}`);
  
    if (updatePostRoot) {
      updatePostRoot.innerHTML = "";
      const updatePostBtn = updatePostRoot.querySelector(
        "button"
      ) as HTMLButtonElement;
      if (updatePostBtn) updatePostBtn.style.display = "block";
    }
  }

  function handleUpdateUserPost(ev: any, postId: string) {
    try {
      ev.preventDefault();
      const headerInput = document.querySelector("#header") as HTMLInputElement;
      const contentInput = document.querySelector("#content") as HTMLInputElement;
      const header = headerInput.value;
      const content = contentInput.value;
  
      const newPost: any = { header, content, postId };
  
      fetch(`/api/posts/update-post?postId=${postId}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((res) => res.json())
        .then(({ post }) => {
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
  