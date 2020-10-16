import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import institutionView from '../views/institution_view';
import * as Yup from 'yup';

import Institution from '../models/Institution';

export default {
  async index(req: Request, res: Response) {
    const institutionRepository = getRepository(Institution);

    const institutions = await institutionRepository.find({
      relations: ['images']
    });

    return res.json(institutionView.renderMany(institutions));
  },

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const institutionRepository = getRepository(Institution);

    const institution = await institutionRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return res.json(institutionView.render(institution));
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

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false,
    })

    const institution = institutionRepository.create(data);

    await institutionRepository.save(institution);

    return res.status(201).json(institution);
  }
}