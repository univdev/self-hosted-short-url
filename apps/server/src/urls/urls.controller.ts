import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IInsertURIPayload, IUpdateURIPayload } from './urls.types';
import { UrlsService } from './urls.service';
import { ICreateUrlDTO, IGetAllUrlsDTO } from './urls.dto/urls.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Get()
  async getAll(@Query() query: IGetAllUrlsDTO) {
    const payload: IGetAllUrlsDTO = {
      page: Number(query.page),
      perPage: query.perPage ? Number(query.perPage) : undefined,
    };
    const items = await this.urlsService.getAll(payload);

    return items;
  }

  @Get('/:shortCode')
  async getItem(@Param() params: ICreateUrlDTO) {
    return (await this.urlsService.findByShortCode(params.shortCode)).data;
  }

  @Post()
  async insert(@Body() payload: IInsertURIPayload) {
    return await this.urlsService.createUrl(payload);
  }
  
  @Patch('/:shortCode')
  async updateItem(
    @Param('shortCode') shortCode: string,
    @Body() body: IUpdateURIPayload
  ) {
    return (await this.urlsService.updateItem(shortCode, body));
  }
}
