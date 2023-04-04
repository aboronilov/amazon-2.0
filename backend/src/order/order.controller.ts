import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get()
  @Auth()
  getAllOrders(
    @CurrentUser("id") userId: string
  ) {
    return this.orderService.getAllOrders(userId)
  }
}
