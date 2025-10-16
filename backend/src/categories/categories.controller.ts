import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetUser } from '../decorators/get-user.decorator';
import { Auth } from '../auth/entities/auth.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get('/')
    async getCategories(@GetUser() req: Auth) {
        const userId = req.user_id;
        return await this.categoriesService.getCategories(userId);
    }

    @Get('typeId/:typeId')
    async getCategoriesByTypeId(@GetUser() req: Auth, @Param('typeId', ParseIntPipe) typeId: number) {
        const userId = req.user_id;
        return await this.categoriesService.getCategoriesByTypeId(userId, typeId);
    }

    @Get('id/:id')
    async getCategoryById(@GetUser() req: Auth, @Param('id', ParseIntPipe) id: number) {
        const userId = req.user_id;
        return await this.categoriesService.getCategoryById(userId, id);
    }

    @Post('/')
    async createCategory(@GetUser() req: Auth, @Body() category: CreateCategoryDto) {
        const userId = req.user_id;
        return await this.categoriesService.createCategory(userId, category);
    }

    @Put('/:id')
    async updateCategory(@Param('id', ParseIntPipe) id: number, category: UpdateCategoryDto) {
        return await this.categoriesService.updateCategory(id, category);
    }

    
}
