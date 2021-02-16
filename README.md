# Recuperação de senha

**Requisitos funcionais**

- O usuário deve poder recuperar sua senha informando o e-mail.
- O usuário deve receber um e-mail com instruções de recuperação de senha.
- O usuário deve poder resetar sua senha.

**Requisitos não funcionais**

- Utilizar mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar o Amazon SES para envios em produção.
- O envio de e-mails deve acontecer em segundo plano (background job).

**Regras de negócio**

- O link enviado por e-mail para resetar senha, deve expirar em 2h.
- O usuário precisa confirmar a nova senha ao reseta-la.

# Atualização do perfil

**Requisitos funcionais**

- O usuário deve poder atualizar seu perfil nome, email e senha.

**Regras de negócio**

- O usuário não pode alterar seu email para um email já utilizado.
- Para atualizar sua senha, o usuário deve informar a senha antiga.
- Para atualizar sua senha o usuário precisa confirmar a nova senha.

# Painel do prestador

**Requisitos funcionais**

- O prestador deve poder listar os seus agendamentos de um dia específico.
- O prestador deve receber uma notificação sempre que houver um novo agendamento.
- O prestador deve poder visualizar as notificação não lidas.

**Requisitos não funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache.
- As notificações do prestador devem ser armazenadas no MongoDB.
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io.

**Regras de negócio**

- A notificação deve ter um status de lida/não-lida para que o prestador possa controlar.

# Agendamento de serviços

**Requisitos funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados.
- O usuário deve poder listar os dias de um mês de um prestador.
- O usuário deve poder listar os horários disponíveis de um dia de um prestador.
- O usuário deve poder realizar um novo agendamento com um prestador.

**Requisitos não funcionais**

- A listagem de prestadores deve ser armazenada em cache.

**Regras de negócio**

- Cada agendamento deve durar 1 hora.
- Os agendamentos devem estar disponíveis entre as 8h às 18h.
- O usuário não pode agendar um horário já ocupado.
- O usuário não pode agendar em um horário que já passou.
- O usuário não pode agendar serviços com ele mesmo (caso o usuário seja também um prestador de serviço).
