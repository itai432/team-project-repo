interface User {
  username: string;
  password: string;
  email: string;
  birthday: string;
}

function handleLogin(ev: any) {
  try {
    ev.preventDefault();
    console.log(ev.target.elements)
    const email = ev.target.elements.email.value;
    const password= ev.target.elements.password.value;
    if(!email) throw new Error("no email");
    if(!password) throw new Error("no password");
    const newUser: any = { email, password };  
      fetch("/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const{ok}=data;
          if(ok){
            const {password, ...currentUser} = data.userDB
            localStorage.setItem("currentUser", JSON.stringify(currentUser))
            window.location.href= "http://localhost:3000/homePage/index.html"

          }
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    
    

  } catch (error) {

  }
}


