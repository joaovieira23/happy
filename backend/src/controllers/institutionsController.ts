import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Institution from '../models/Institution';

export default {
  async index(req: Request, res: Response) {
    const institutionRepository = getRepository(Institution);

    const institutions = await institutionRepository.find();

    return res.json(institutions);
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const institutionRepository = getRepository(Institution);

    const institution = await institutionRepository.findOneOrFail(id);

    return res.json(institution);
  },

  async create(req: Request, res: Response) {
    console.log(req.files);

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = req.body;

    const institutionRepository = getRepository(Institution);

    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const institution = institutionRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    });

    await institutionRepository.save(institution);

    return res.status(201).json(institution);
  }
}