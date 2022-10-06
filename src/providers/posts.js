const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchposts = async function () {
  //const response = await fetch("/api/post");
  //const body = await response.json();
  await timeout(300);
  const body = [
    {
      id: 1,
      user: "joe",
      title: "Titre1",
      post: "azeazeazeazezajeaozjee az eakzelazkeazkezaùezaazeaz zaeazeeaze eakzelazkeazkezaùezaazeaz eakzelazkeazkezaùeza",
      link: "./src/assets/imagesposts/nuages.jpg",
    },
    {
      id: 2,
      user: "joe",
      title: "Titre2",
      post: "post coordination 2",
      link: "./src/assets/imagesposts/nuages.jpg",
    },
    {
      id: 3,
      user: "moe",
      title: "Titre3",
      post: "post environnement 3",
      link: "./src/assets/imagesposts/nuages.jpg",
    },
  ];
  return body;
};

export default fetchposts;
