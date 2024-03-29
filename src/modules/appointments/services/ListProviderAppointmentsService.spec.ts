import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakesCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointments = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider);
    });

    it('should be able to list the appointments on specific day', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2021, 11, 14, 14),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider-id',
            user_id: 'user-id',
            date: new Date(2021, 11, 14, 15),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider-id',
            year: 2021,
            month: 11,
            day: 14,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
