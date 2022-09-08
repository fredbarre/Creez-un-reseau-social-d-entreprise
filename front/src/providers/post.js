const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchpost = async function () {
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
};

export default fetchpost;
