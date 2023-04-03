import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class StatisticService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) { }

    async getMain(userId: string) {
        const user = await this.userService.getUserById(userId, {
            orders: {
                select: {
                    items: true
                }
            },
            reviews: true
        })

        // for (let order in user.orders) {
        //     let total = 0

        //     for (let o)
        // }

        // const totalAmount = await this.prisma.order.aggregate({
        //     where: {
        //         userId
        //     },
        //     _sum: {
        //         items: true
        //     }
        // })

        return [
            {
                name: "Orders",
                value: user.orders.length
            },
            {
                name: "Reviews",
                value: user.reviews.length
            },
            {
                name: "Favorites",
                value: user.favorites.length
            },
        ]
    }
}
