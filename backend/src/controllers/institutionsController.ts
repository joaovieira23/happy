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

    const institution = institutionRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    });

    await institutionRepository.save(institution);

    return res.status(201).json(institution);
  }
}