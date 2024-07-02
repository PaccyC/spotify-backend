import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDto } from './dto/search.dto';
import { JwtGuard } from '../auth/guard';

@Controller('search')
export class SearchController {

    constructor(private searchService:SearchService){}

    @Get()
    @UseGuards(JwtGuard)
    search(@Query() dto:SearchDto){
       return this.searchService.search(dto)
    }

}
