export interface ProdutoDTO {
    nome: string;
    descricao?: string;
    preco: number;
    categoria_id: string;
    imagem_url?: string;
}