export interface LoginDTO {
    email: string;
    senha: string;
}

export interface RegisterDTO {
    nome: string;
    email: string;
    senha: string;
    role: Role;
    telefone: string;
}

export type Role = 'cliente' | 'dono' | 'funcionario' | 'superadmin' | 'admin';

export interface OwnerDTO {
    nome: string;
    email: string;
    senha: string;
    nomePizzaria: string;
    slug: string;
    telefone: string;
    endereco: string;
    role: Role;
    logo_url: string;
}

export interface RegisterFuncionarioDTO {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}