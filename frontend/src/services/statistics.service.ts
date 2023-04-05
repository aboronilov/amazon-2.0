import { instance } from "@/api/api.interceptor";
import { IStatistics } from '../types/statistics.interface';

const STATISTICS = "statistics"

export const StatisticsService = {
   async getMain() {
      return await instance<IStatistics[]>({
         url: `${STATISTICS}`,
         method: "GET"
      })
   },
}

