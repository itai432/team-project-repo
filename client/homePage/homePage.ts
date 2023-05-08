
interface User{
    userName: string,
    password: string,
    email: string,
    birthDay: Date,

}
interface Post {
    _id: string,
    header:string,
    content:string,
    date: Date,
}


function renderPost(post: Post) {
    try {
        const html = `
        <div id="post" class="mainPagePost">
        <img src="${post.content}" alt="${post.header}">
        <h1>${post.header}</h1>
        <p>$${post.date}</p>
        <div>
          <input type="number" id="quantityInput" value="1" min="1"> thtrthbdf
          <button ('${post._id}')">Add Comment</button>
        </div>
        </div>
      `;
      const postRoot = document.querySelector("#postRoot");
      if (!postRoot) throw new Error("postRoot not found");
      postRoot.innerHTML += html;
      console.log(post)
      
    } catch (error) {
      console.error(error);
    }
  }

  function handleGetPosts() {
    try {
      
      fetch("/api/posts/get-posts")
        .then((res) => res.json())
        .then(({ posts }) => {
          if (!posts) throw new Error("didnt find Posts");
          const html = posts
          .map((posts) => {
            return   renderPost(posts);
          })
        
        });
    } catch (error) {
      console.error(error);
    }
  }

  function reanderPopUpCreatePost() {
    try {
        const html = `
        <form onsubmit="handleCreatePost(event)" class="CreatePostContainer">
        <div class="CreatePostContainer__CreatePostHeader"></div>
        <div>
            <label for="header">header:</label>
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
      const createPostRoot = document.querySelector("#createPostRoot");
      if (!createPostRoot) throw new Error("createPostRoot not found");
      createPostRoot.innerHTML += html;
      
    } catch (error) {
      console.error(error);
    }
  }

  function handleCreatePost(ev:any){
    try {
      ev.preventDefault();
      console.log(ev.target.elements);
      const header = ev.target.elements.header.value;
      const content = ev.target.elements.content.value;
      const date = Date.now;

      if (!header) throw new Error("No header");
      if (!content) throw new Error("No content");
      if (!date) throw new Error("No date");


      const newPost: any = {  content,header,date};
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
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });

  } catch (error) {
      console.error(error)
  }
  }