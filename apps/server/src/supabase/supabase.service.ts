import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Database } from 'src/shared/types/database.dto';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient<Database>;

  constructor(private readonly config: ConfigService) {
    this.client = createClient<Database>(
      config.get<string>('SUPABASE_URL'),
      config.get<string>('SUPABASE_API_KEY'),
    );
  }
}
