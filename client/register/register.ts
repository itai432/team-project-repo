interface User {
    userName: string;
    password: string;
    email: string;
    birthDay: string;
  }

  function handleCreateUser(ev:any){
    try {
        ev.preventDefault();
        console.log(ev.target.elements);
        const userName = ev.target.elements.userName.value;
        const password = ev.target.elements.password.value;
        const email = ev.target.elements.email.value;
        const birthDay= ev.target.elements.birthDay.value;

        if (!userName) throw new Error("No name");
        if (!password) throw new Error("No Password");
        if (!email) throw new Error("No email");
        if (!birthDay) throw new Error("No birthDay");

        const newUser: any = { userName, password, email,birthDay };
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
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });

    } catch (error) {
        console.error(error)
    }
  }