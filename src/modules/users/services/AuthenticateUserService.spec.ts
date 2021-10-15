import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHaskProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    });

    it('should be able to authenticate', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        const response = await authenticateUser.execute({
            email: 'teste@gmail.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'teste@gmail.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'teste@gmail.com',
                password: '1234567',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
