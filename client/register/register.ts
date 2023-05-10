interface User {
    username: string;
    password: string;
    email: string;
    birthday: string;
  }

  function handleCreateUser(ev:any){
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        const username = ev.target.elements.username.value;
        const password = ev.target.elements.password.value;
        const email = ev.target.elements.email.value;
        const birthday= ev.target.elements.birthday.value;

        if (!username) throw new Error("No name");
        if (!password) throw new Error("No Password");
        if (!email) throw new Error("No email");
        if (!birthday) throw new Error("No birthDay");

        const newUser: any = { username, password, email,birthday };
        fetch("/api/users/create-user", {
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
            window.location.href= "http://localhost:3000/homePage/index.html"
          }
            })
            .catch((error) => {
              console.error(error);
            });

    } catch (error) {
        console.error(error)
    }
  }