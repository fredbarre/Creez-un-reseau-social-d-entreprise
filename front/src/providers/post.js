const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchpost = async function () {
  //const response = await fetch("/api/post");
  //const body = await response.json();
  await timeout(300);
  const body = [
    {
      user: "",
      subjet: "",
      post: "",
    },
  ];
  return body;
};
