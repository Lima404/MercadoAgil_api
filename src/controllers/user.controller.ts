import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export const UserController = {
  async findByEmail(req: Request, res: Response) {
    const fromQuery = req.query as Record<string, string | undefined>;
    const fromBody = req.body && typeof req.body === 'object' ? req.body : {};
    const params = { ...fromQuery, ...fromBody };
    const email = typeof params.email === 'string' ? params.email.trim() : '';

    if (!email) {
      return res.status(400).json({
        error: 'Email é obrigatório para buscar usuários',
      });
    }

    try {
      const user = await UserService.findByEmail(email);

      if (!user) {
        return res.status(404).json({
          error: `Não foi possível encontrar nenhum usuário com o email ${email}`,
        });
      }

      return res.json(user);
    } catch (error) {
      console.error('UserController.findByEmail error:', error);
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  async create(req: Request, res: Response) {
    const { nome, email, telefone, senha_hash, role } = req.body;

    if (!nome || !email || !telefone || !senha_hash) {
      return res.status(400).json({
        error: 'Campos obrigatórios ausentes',
        obrigatorios: ['nome', 'email', 'telefone', 'senha_hash'],
      });
    }

    try {
      const user = await UserService.create({ nome, email, telefone, senha_hash, role });
      return res.status(201).json(user);
    } catch (error) {
      console.error('UserController.create error:', error);
      const message = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: 'Erro ao criar usuário', details: message });
    }
  },
};
