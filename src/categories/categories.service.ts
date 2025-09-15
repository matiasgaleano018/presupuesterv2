import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
    ){}

    private opTypes = {
        'income': 10,
        'expense': 20,
        'transfer': 30,
        'ajust': 40
    }

    async getCategoriesByTypeId(typeId: number) {
        return await this.categoriesRepository.find({
            where: {
                type_id: typeId,
                user_id: 1
            }
        });
    }

    async getCategoriesByType(type: string) {
        return await this.categoriesRepository.find({
            where: {
                type_id: this.opTypes[type],
                user_id: 1
            }
        });
    }

    async getCategoryById(id: number) {
        return await this.categoriesRepository.findOne({
            where: {
                id: id,
                user_id: 1
            }
        });
    }

    createCategory(category: CreateCategoryDto): Promise<Category> {
        if(!this.opTypes[category.type_slug]) {
            throw new NotFoundException(`Tipo de operación ${category.type_slug} no encontrado`);
        }
        const categoryFields = {
            label: category.label,
            slug: category.slug.toLowerCase(),
            user_id: category.user_id,
            type_id: this.opTypes[category.type_slug]
        };

        return this.categoriesRepository.save(categoryFields);
    }

    async updateCategory(id: number, category: UpdateCategoryDto) {
        let categoryStatus: number;
        if(category.isActive) {
            categoryStatus = 100;
        }else{
            categoryStatus = 1;
        }
        const categoryFields = {
            label: category.label,
            slug: category.slug.toLowerCase(),
            status: categoryStatus
        }
        return await this.categoriesRepository.update(id, categoryFields);
    }

    async isValidOrFail(id: number, type: string){
        if(!this.opTypes[type]) {
            throw new NotFoundException(`Tipo de operación ${type} no encontrado`);
        }
        const category = await this.categoriesRepository.findOne({
            where: {
                id: id,
                user_id: 1
            }
        })

        const typeId = this.opTypes[type]
        if( !category || !category.type_id || typeId !== category.type_id){
            throw new NotFoundException('Categoria no encontrada o no valida')
        }

        return category;
    }

    async insertDefaultValues(user_id: number) {
        const defaultCategories = [
            //ingresos
            {slug: 'salario', label: 'Salario', type_id: this.opTypes.income, user_id: user_id},
            {slug: 'inversion', label: 'Inversión', type_id: this.opTypes.income, user_id: user_id},
            //egresos
            {slug: 'comida', label: 'Comida', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'transporte', label: 'Transporte', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'compras', label: 'Compras', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'salud', label: 'Salud', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'educacion', label: 'Educación', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'ocio', label: 'Ocio', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'deuda', label: 'Pago de deudas', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'ropa', label: 'Ropa', type_id: this.opTypes.expense, user_id: user_id},
            //transferencias
            {slug: 'extraccion-cajero', label: 'Extracción en cajero automatico', type_id: this.opTypes.expense, user_id: user_id},
            {slug: 'transferencia', label: 'Transferencia entre cuentas', type_id: this.opTypes.expense, user_id: user_id},
            //Ajustes
            {slug: 'ajuste', label: 'Ajuste', type_id: this.opTypes.ajust, user_id: user_id},
        ];


        return await this.categoriesRepository.save(defaultCategories);
    }
}
