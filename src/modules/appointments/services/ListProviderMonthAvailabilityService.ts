import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter, endOfDay } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProvidersMonthAvailabilityServices {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        });

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const eachDayArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1);
        const availability = eachDayArray.map((day) => {
            const compareDate = endOfDay(new Date(year, month - 1, day));

            const appointmentsInDay = appointments.filter((appointment) => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProvidersMonthAvailabilityServices;
