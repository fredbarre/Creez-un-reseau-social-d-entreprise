const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchpost() {
  //const response = await fetch("/api/post");
  //const body = await response.json();
  await timeout(300);
  const body = {
    id: 1,
    user: "joe",
    title: "Titre1",
    post: "azeazeazeazezajeaozjee az eakzelazkeazkezaùezaazeaz zaeazeeaze eakzelazkeazkezaùezaazeaz eakzelazkeazkezaùeza",
    link: "./src/assets/imagesposts/nuages.jpg",
  };
  return body;
}

async function fetchnewpost(params, token) {
  const response = await fetch(`http://localhost:5173/api/newPost`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const responseData = await response.json();
  //console.log(responseData);
  return responseData;
}

export async function fetchposts(token) {
  const response = await fetch(`http://localhost:5173/api/posts`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    //body: JSON.stringify(params),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const responseData = await response.json();
  //console.log(responseData);
  return responseData;
}

export { fetchnewpost };
