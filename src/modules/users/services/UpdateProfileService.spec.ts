import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHaskProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should not be able to update the profile from non-existing user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existing-user-id',
                name: 'Test',
                email: 'teste@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
        });

        await expect(
            updateProfile.execute({ user_id: user.id, name: 'John Doe', email: 'johndoe@example.com' }),
        ).rejects.toBeInstanceOf(AppError);
        expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should be able to update password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update password with wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'Teste',
            email: 'teste@gmail.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
