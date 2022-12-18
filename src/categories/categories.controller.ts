import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from 'src/models/category.model';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService){}

    @Get()
    getCategories(): Promise<Category[]>{
        return this.categoriesService.getCategories()
    }

    // Upgrade in the future
    // @Post()
    // addCategory(@Body() category : any): Promise<string>{
    //     return this.categoriesService.addCategories(category);
    // }

}
