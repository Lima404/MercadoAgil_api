import { prisma } from '../config/database';

export interface CreateUserDTO {
  nome: string;
  email: string;
  telefone: string;
  senha_hash: string;
  role?: 'ADMIN' | 'CLIENT';
}

export const UserService = {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        role: true,
        created_at: true,
      },
    });

    return user;
  },

  async create(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        senha_hash: data.senha_hash,
        ...(data.role && { role: data.role }),
      },
    });

    return user;
  },
};
