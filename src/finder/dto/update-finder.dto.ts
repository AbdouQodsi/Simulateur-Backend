import { PartialType } from '@nestjs/mapped-types';
import { CreateFinderDto } from './create-finder.dto';

export class UpdateFinderDto extends PartialType(CreateFinderDto) {}
