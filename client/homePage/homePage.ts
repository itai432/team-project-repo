import UserModel from "../../API/users/usersModel";
import { UserSchema } from "../../API/users/usersModel";

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
          <button ('${post._id}')">Add to Cart</button>
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

  function handleGetProduct() {
    try {
      
      fetch("/api/posts/get-posts")
        .then((res) => res.json())
        .then(({ posts }) => {
          if (!posts) throw new Error("didnt find product");
          const html = posts
          .map((posts) => {
            return   renderPost(posts);
          })
        
        });
    } catch (error) {
      console.error(error);
    }
  }