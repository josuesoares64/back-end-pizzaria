import { createClient, SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";

const BUCKET = "fornohub-assets";

interface UploadFile {
  originalname: string;
  buffer: Buffer;
  mimetype: string;
}

class StorageService {
  private _client: SupabaseClient | null = null;

  get client(): SupabaseClient {
    if (!this._client) {
      this._client = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
      );
    }
    return this._client;
  }

  async uploadImagem(file: UploadFile, pizzariaId: string, nomeArquivo: string): Promise<string> {
    const buffer = await sharp(file.buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const partes = nomeArquivo.split("/");
    const nomeBase = partes.pop()!;
    const subpasta = partes.length ? `/${partes.join("/")}` : "";
    const pasta = `${pizzariaId}${subpasta}`;

    const timestamp = Date.now();
    const path = `${pasta}/${nomeBase}-${timestamp}.webp`;

    const { data: existentes } = await this.client.storage.from(BUCKET).list(pasta);
    const antigos = (existentes ?? [])
      .filter(
        (arquivo) =>
          arquivo.name.startsWith(`${nomeBase}-`) || arquivo.name === `${nomeBase}.webp`,
      )
      .map((arquivo) => `${pasta}/${arquivo.name}`);
    if (antigos.length > 0) {
      await this.client.storage.from(BUCKET).remove(antigos);
    }

    const { error } = await this.client.storage
      .from(BUCKET)
      .upload(path, buffer, {
        contentType: "image/webp",
        upsert: true,
      });

    if (error) throw new Error(`Erro no upload: ${error.message}`);

    const { data } = this.client.storage.from(BUCKET).getPublicUrl(path);

    return data.publicUrl;
  }
}

export default new StorageService();