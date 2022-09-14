import Joi from "joi";

const joischema = Joi.object({
  email: Joi.string().pattern(
    new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    )
  ),
  password: Joi.string().max(512),

  name: Joi.string().pattern(
    new RegExp(
      "^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ0123456789\"''`'-]+$"
    )
  ),
  title: Joi.string().pattern(
    new RegExp(
      "^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ0123456789\"''`'-]+$"
    )
  ),
  post: Joi.string().pattern(
    new RegExp(
      "^[ a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ0123456789\"''`'-]+$"
    )
  ),
});

export default joischema;
