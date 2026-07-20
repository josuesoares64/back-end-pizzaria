export interface EnderecoDTO {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  referencia?: string;
}