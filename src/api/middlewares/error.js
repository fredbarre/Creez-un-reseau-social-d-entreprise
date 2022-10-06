function error(error, req, res, next) {
  console.log(error);
  res.status(500).json({ error });
}
export default error;
