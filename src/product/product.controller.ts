import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetProductFilterDto } from 'src/models/get-product.dto';
import { ProductDto } from 'src/models/product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Client site and Admin site (CMS)
  @Get()
  getProducts(@Query() filterDto: GetProductFilterDto): Promise<any> {
    return this.productService.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<any> {
    return this.productService.getProductByIdCustom(id);
  }

  // Admin site (CMS)

  @Post()
  @UseGuards(AuthGuard())
  createProduct(@Body() product: ProductDto): Promise<any> {
    return this.productService.createProduct(product);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  updateProduct(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<any> {
    return this.productService.updateProduct(id, product);
  }
}
