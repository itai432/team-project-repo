
interface User{
    username: string,
    password: string,
    email: string,
    birthday: string,
}
interface Post {
    _id: string,
    header:string,
    content:string,
    date: Date,
}


function renderPost(post: Post) {
  try {
    const postDate = new Date(post.date);
    const formattedDate = postDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });

    const html = `
      <div id="post_${post._id}" class="mainPagePost">
        <img src="${post.content}" alt="${post.header}">
        <h1>${post.header}</h1>
        <p>${formattedDate}</p>
        <div>
          <input placeholder="Add Comment" type="text" id="commentInput_${post._id}"> 
          <button onclick="handleCreateComment('${post._id}')" >Add Comment</button>
        </div>
      </div>
    `;
    const postRoot = document.querySelector("#postRoot");
    if (!postRoot) throw new Error("postRoot not found");
    postRoot.innerHTML += html;
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
    } catch (error) {
      console.error(error);
    }
  }
  function closeCreatePostPopup() {
    const createPostRoot = document.querySelector("#createPostRoot");
  
    if (createPostRoot) {
      createPostRoot.innerHTML = "";
      const addPostBtn = document.querySelector("#createPostRoot") as HTMLButtonElement;
      if (addPostBtn) addPostBtn.style.display = "block";
    }
  };
  
  
  
  function handleCreatePost(ev:any){
    try {
      const header = ev.target.elements.header.value;
      const content = ev.target.elements.content.value;
      const date = new Date();

      if (!header) throw new Error("No header");
      if (!content) throw new Error("No content");
      if (!date) throw new Error("No date");


      const newPost: any = {content,header,date: date.toString()};
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
//comments not working still
// function handleCreateComment(postId: string) {
//   try {
//     const commentInput = document.querySelector(
//       `#commentInput_${postId}`
//     ) as HTMLInputElement;
//     if (!commentInput) {
//       throw new Error("Comment input not found");
//     }

//     const comment = commentInput.value;
//     if (!comment) {
//       throw new Error("No comment");
//     }

//     const newComment = { postId, content: comment };
//     fetch("/api/comments/create-comment", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer <user>`,
//       },
//       body: JSON.stringify(newComment),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } catch (error) {
//     console.error(error);
//   }
// }