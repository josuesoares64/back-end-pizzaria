export interface LoginDTO {
    email: string;
    senha: string;
}

export interface RegisterDTO {
    nome: string;
    email: string;
    senha: string;
    role: Role;
    telefone?: string;
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

export interface CategoriaDTO {
    nome: string;
    pizzaria_id: string;
    ativo: boolean;
}

export interface PizzariaUpdateDTO {
    nome?: string;
    slug?: string;
    telefone?: string;
    endereco?: string;
    logo_url?: string;
}