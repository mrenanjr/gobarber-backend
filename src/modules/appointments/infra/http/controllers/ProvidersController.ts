import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

export default class AppointmentController {
    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const listProviders = container.resolve(ListProvidersService);

        let providers = await listProviders.execute({
            user_id,
        });

        providers.forEach((provider) => (provider = classToClass(provider)));

        return response.json(providers);
    }
}
