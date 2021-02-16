import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailprovider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotEmailPassword: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailprovider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotEmailPassword = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailprovider, fakeUserTokensRepository);
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailprovider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456'
    })

    await sendForgotEmailPassword.execute({
      email: 'teste@gmail.com'
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(sendForgotEmailPassword.execute({
      email: 'teste@gmail.com'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@gmail.com',
      password: '123456'
    })

    await sendForgotEmailPassword.execute({
      email: 'teste@gmail.com'
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
})
