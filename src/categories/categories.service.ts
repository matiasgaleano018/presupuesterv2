import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ){}

    async getCategoriesByTypeId(typeId: number) {
        return await this.categoriesRepository.find({
            where: {
                type_id: typeId
            }
        });
    }

    async getCategoryById(id: number) {
        return await this.categoriesRepository.findOne({
            where: {
                id: id
            }
        });
    }

    createCategory(category: Partial<Category>): Promise<Category> {
        const categoryFields = category;

        categoryFields.status = 100;
        return this.categoriesRepository.save(category);
    }

    async updateCategory(id: number, category: Partial<Category>) {
        return await this.categoriesRepository.update(id, category);
    }
}
