// import Joi from 'joi';

// const workshopSchema = Joi.object({
//     city: Joi.string().required(),
//     workshopName: Joi.string().max(255).required(),
//     services: Joi.array().items(Joi.string().max(255)).required(),
//     address: Joi.string().max(500).required(),
//     mobile: Joi.string().min(10).max(12).pattern(/^\d+$/).required(),
//     image: Joi.string().required(),
//     workshopDescription: Joi.string().max(1000).required(),
//     timeSlots: Joi.array().items(Joi.object({
//         day: Joi.string().required(),
//         startingTime: Joi.string().required(),
//         endingTime: Joi.string().required()
//     })).required()
// });

// const validateWorkshopCreation = (data) => {
//     return workshopSchema.validate(data, { abortEarly: false });
// };

// export default validateWorkshopCreation;
