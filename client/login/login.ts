interface User {
  userName: string;
  password: string;
  email: string;
  birthDay: string;
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
            //add herf to the main page//
            window.location.href= ""

          }
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    
    

  } catch (error) {

  }
}


