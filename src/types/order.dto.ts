export interface CartItemInput {
  produto_id: string;
  produto_id_2?: string;
  tamanho_id?: string;
  borda_id?: string;
  quantidade: number;
  observacoes?: string;
}

export interface EnderecoInput {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  referencia?: string;
}

export interface CreateOrderInput {
  user_id: string;
  pizzaria_id: string;
  forma_pagamento: string;
  observacoes?: string;
  endereco: EnderecoInput;
  troco_para?: number;
  itens: CartItemInput[];
}