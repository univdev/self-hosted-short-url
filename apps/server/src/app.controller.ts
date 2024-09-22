import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { UrlsService } from './urls/urls.service';
import { HttpError } from './http-error/http-error';

@Controller()
export class AppController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get('/:shortCode')
  @Redirect('/', 404)
  async redirectByShortCode(@Param('shortCode') shortCode: string) {
    try {
    const item = (await this.urlsService.findByShortCode(shortCode)).data;

    return { url: item.destination_url, statusCode: 302 };
    } catch (err) {
      if (err instanceof HttpError) {
        return { url: '/', statusCode: 404 };
      }
    }
  }
}
