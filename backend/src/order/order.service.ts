import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async getAllOrders(userId: string) {
        return await this.prisma.order.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }
}
