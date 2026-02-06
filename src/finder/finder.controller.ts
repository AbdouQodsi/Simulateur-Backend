import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinderService } from './finder.service';
import { CreateFinderDto } from './dto/create-finder.dto';
import { UpdateFinderDto } from './dto/update-finder.dto';

@Controller('finder')
export class FinderController {
  constructor(private readonly finderService: FinderService) {}

  @Post()
  create(@Body() createFinderDto: CreateFinderDto) {
    return this.finderService.create(createFinderDto);
  }

  @Get()
  findAll() {
    return this.finderService.findAll();
  }
}