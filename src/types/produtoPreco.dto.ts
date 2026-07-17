export interface VincularTamanhosDTO {
    tamanho_ids: string[];
}

export interface AtualizarPrecosDTO {
    precos: {
        tamanho_id: string;
        preco: number;
    }[];
}