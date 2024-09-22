/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Get, Req } from '@nestjs/common';

@Controller('csrf-token')
export class CsrfTokenController {
  @Get()
  generate(@Req() req: any) {
    return req.csrfToken();
  }
}
