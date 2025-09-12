import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get('typeId/:typeId')
    async getCategoriesByTypeId(typeId: number) {
        return await this.categoriesService.getCategoriesByTypeId(typeId);
    }

    @Get('id/:id')
    async getCategoryById(id: number) {
        return await this.categoriesService.getCategoryById(id);
    }

    @Post('/')
    async createCategory(@Body() category: CreateCategoryDto) {
        return await this.categoriesService.createCategory(category);
    }

    @Put('/:id')
    async updateCategory(id: number, category: UpdateCategoryDto) {
        return await this.categoriesService.updateCategory(id, category);
    }

    
}
