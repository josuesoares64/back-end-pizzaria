export interface ProdutoDTO {
    nome: string;
    descricao?: string;
    preco?: number;
    tipo?: 'simples' | 'pizza';
    categoria_id: string;
    imagem_url?: string;
}