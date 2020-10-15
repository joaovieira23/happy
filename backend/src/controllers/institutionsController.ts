import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Institution from '../models/Institution';

export default {
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