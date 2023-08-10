import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto';

export class DeleteCardDto extends PartialType(CreateCardDto) {}
