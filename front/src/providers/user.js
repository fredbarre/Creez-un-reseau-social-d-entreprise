async function fetchsignup(params) {
  const response = await fetch(`http://localhost:5173/api/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

export { fetchsignup };
