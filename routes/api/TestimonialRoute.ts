import express from "express";
const Router = express.Router();

import TestimonialController from "app/Http/Controller/TestimonialController.js";
import TestimonialsService from "app/Http/Service/TestimonialsService.js";

const testimonialsService = new TestimonialsService()
const testimonialController = new TestimonialController(testimonialsService)

export default (): express.Router => {
    Router.get("/", testimonialController.getTestimonials);
    Router.get("/:id", testimonialController.getTestimonialById)
    Router.post("/", testimonialController.addTestimonial)
    Router.put("/:id", testimonialController.editTestimonial)
    Router.delete("/:id", testimonialController.deleteTestimonial)
    return Router
}