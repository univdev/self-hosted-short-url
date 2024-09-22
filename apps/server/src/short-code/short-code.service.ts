import { Injectable } from '@nestjs/common';
import * as randomatic from 'randomatic';

@Injectable()
export class ShortCodeService {
  generate(maxLen = 7, pattern = 'Aa0') {
    return randomatic(pattern, maxLen);
  }
}
