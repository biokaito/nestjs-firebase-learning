import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto, UpdateOrderStatusDto } from 'src/models/order.model';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard())
  getOrders(): Promise<any[]> {
    return this.orderService.getOrders();
  }

  @Get('/:id')
  getOrder(@Param('id') id: string): Promise<any> {
    return this.orderService.getOrder(id);
  }

  @Post()
  addOrder(@Body() order: OrderDto): Promise<string> {
    return this.orderService.addOrder(order);
  }

  @Patch('/:id/status')
  @UseGuards(AuthGuard())
  updateOrder(
    @Param('id') id: string,
    @Body() { status }: UpdateOrderStatusDto,
  ): Promise<string> {
    return this.orderService.updateOrder(id, status);
  }
}
