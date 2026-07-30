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

export type Role = 'cliente' | 'dono' | 'funcionario' | 'superadmin';

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
