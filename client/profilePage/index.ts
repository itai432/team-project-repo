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
      `;
      const profileInfoRoot = document.querySelector("#profileInfoRoot");
      if (!profileInfoRoot) throw new Error("profileInfoRoot not found");
      profileInfoRoot.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }

  function handleGetUserPosts() {
    try {
      
      fetch("/api/posts/get-posts")
        .then((res) => res.json())
        .then(({ posts }) => {
          if (!posts) throw new Error("didnt find Posts");
          const html = posts
          .map((posts) => {
            return   renderUserPosts(posts);
          })
        
        });
    } catch (error) {
      console.error(error);
    }
  }
  
  function renderUserPosts(posts:Post) {
    try {
      const html = `
        <div class="mainPagePost">
        <img src="${posts.content}" alt="${posts.header}">
        <h3>${posts.header}</h3>
          </div>
      `;
      const postsUserRoot = document.querySelector("#postsUserRoot");
      if (!postsUserRoot) throw new Error("postsUserRoot not found");
      postsUserRoot.innerHTML += html;
    } catch (error) {
      console.error(error);
    }
  }

