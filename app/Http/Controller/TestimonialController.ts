import TestimonialsService from "../Service/TestimonialsService.js";
import HttpResponse from "../Utils/HttpResponse.js";
import express from 'express'

class TestimonialController {
    private response = new HttpResponse();
    private _testimonialsService = new TestimonialsService()
    
    constructor(TestimonialsService: TestimonialsService) {
        this._testimonialsService = TestimonialsService
    }

    async getTestimonials(req: express.Request, res:express.Response){
        try {
            const testimonials = await this._testimonialsService.getTestimonials();
            return this.response.success(res, testimonials.rows)
        } catch (error) {
            console.error(error)
            return this.response.error(res, "Something went wrong")
        }
    }

    async getTestimonialById(req: express.Request, res: express.Response) {
        try {
            const { id } = req.params
            const testimonial = await this._testimonialsService.getTestimonialById(id);

            if(!testimonial.rows.length){
                return this.response.notFound(res, "No testimonial found")
            }

            return this.response.success(res, testimonial.rows)
        } catch (error) {
            console.error(error.message)
            return this.response.error(res, "Something went wrong")
        }
    }

    async addTestimonial(req: express.Request, res: express.Response) {
        try {
            const response = await this._testimonialsService.addTestimonial(req.body)

            return this.response.success(
                res,
                `Testimonial ID ${response.rows[0].id} successfully added`
            )
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }

    async editTestimonial(req: express.Request, res: express.Response) {
        try {
            const response = await this._testimonialsService.editTestimonial({...req.params, ...req.body})

            if(!response.rows.length) {
                return this.response.notFound(res, "No testimonial found");
            }

            return this.response.success(
                res,
                `Testimonial ID ${response.rows[0].id} successfully updated`
            )
        } catch (error) {
            console.error(error);
            return this.response.error(res, `Something went wrong`)
        }
    }

    async deleteTestimonial(req: express.Request, res: express.Response) {
        try {
            const testimonial = await this._testimonialsService.deleteTestimonial(req.params.id)

            if(!testimonial.rows.length){
                return this.response.notFound(res,
                    `Testimonial failed to be deleted, ${req.params.id} is not found`
                )
            }

            return this.response.success(res, `Testimonial successfully deleted`)
        } catch (error) {
            console.error(error)
            return this.response.error(res, `Something went wrong`)
        }
    }
}

export default TestimonialController