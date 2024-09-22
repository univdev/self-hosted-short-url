import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class ICreateUrlDTO {
  @IsString()
  @Length(7, 7, { message: 'shortCode muse have 7 length' })
  shortCode: string;
}

export class IGetAllUrlsDTO {
  @IsNumber()
  page: number;

  @IsNumber()
  @IsOptional()
  perPage?: number;
}
