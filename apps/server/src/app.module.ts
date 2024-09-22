import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UrlsController } from './urls/urls.controller';
import { SupabaseService } from './supabase/supabase.service';
import { ShortCodeService } from './short-code/short-code.service';
import { UrlsService } from './urls/urls.service';
import { CsrfTokenController } from './csrf-token/csrf-token.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['src/.env']
  })],
  controllers: [AppController, UrlsController, CsrfTokenController],
  providers: [SupabaseService, ShortCodeService, UrlsService],
})
export class AppModule {}
