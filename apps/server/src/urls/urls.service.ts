import { HttpStatus, Injectable } from '@nestjs/common';
import { ShortCodeService } from 'src/short-code/short-code.service';
import { IInsertURIPayload, IUpdateURIPayload } from './urls.types';
import { SupabaseService } from 'src/supabase/supabase.service';
import { IGetAllUrlsDTO } from './urls.dto/urls.dto';
import { HttpError } from 'src/http-error/http-error';

@Injectable()
export class UrlsService {
  constructor(
    private readonly shortCodeService: ShortCodeService,
    private readonly supabaseService: SupabaseService
  ) {
    
  }

  async getAll(payload: IGetAllUrlsDTO) {
    const { page, perPage } = payload;
    const startIndex = perPage * (page - 1);
    const endIndex = startIndex + perPage;
    const items = await this.supabaseService.client
      .from('urls')
      .select('*')
      .range(startIndex, endIndex);

    return items;
  }

  async createUrl(payload: IInsertURIPayload) {
    const { destination_url: destinationUrl } = payload;
    const shortCode = this.shortCodeService.generate();

    const insertedItem = await this.supabaseService.client
      .from('urls')
      .insert({
        short_code: shortCode,
        destination_url: destinationUrl,
      })
      .select()
      .single();

    if (insertedItem.error)
      throw new HttpError(insertedItem.error.message, 500);
    
    return insertedItem.data;
  }

  async findByShortCode(shortCode: string) {
    const tableName = 'urls';
    const item = await this.supabaseService.client
      .from(tableName)
      .select('*')
      .eq('short_code', shortCode)
      .single();

    if (item.error)
      throw new HttpError(item.error.message, 500);

    return item;
  }

  async updateItem(shortCode: string, payload: IUpdateURIPayload) {
    const item = await this.findByShortCode(shortCode);
    
    if (item.error)
      throw new HttpError(item.error.message, HttpStatus.NOT_FOUND);

    const updatedItem = await this.supabaseService.client
      .from('urls')
      .update({ destination_url: payload.destination_url })
      .eq('short_code', shortCode)
      .select()
      .single();

    return updatedItem;
  }
}
