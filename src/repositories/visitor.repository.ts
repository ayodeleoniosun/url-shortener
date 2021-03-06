import { VisitorInterface } from '../interfaces/visitor/visitor.interface';
import Visitor from '../models/visitor';
import { IVisitor } from '../interfaces/visitor/visitor';
import { DateFormats } from '../utils/helpers/date-formats';

export class VisitorRepository implements VisitorInterface {
  public dates: DateFormats = new DateFormats();

  async save(visitor: IVisitor): Promise<IVisitor> {
    return await new Visitor(visitor).save();
  }

  async getVisitorsStatisticsByUrl(url_id: string): Promise<object> {
    const todayVisits = await this.filterDates(url_id, this.dates.startOfToday, this.dates.endOfToday);

    const currentWeekVisits = await this.filterDates(
      url_id,
      this.dates.startOfCurrentWeek,
      this.dates.endOfCurrentWeek
    );

    const currentMonthVisits = await this.filterDates(
      url_id,
      this.dates.startOfCurrentMonth,
      this.dates.endOfCurrentMonth
    );

    const topCountryVisits = await this.filterBy(url_id, 'country');
    const topCityVisits = await this.filterBy(url_id, 'city');

    return { todayVisits, currentWeekVisits, currentMonthVisits, topCountryVisits, topCityVisits };
  }

  async getVisitorInfo(visitor_id: string): Promise<IVisitor> {
    return await Visitor.findOne({ visitor_id });
  }

  async filterDates(urlId: string, startDate: string, endDate: string): Promise<object[]> {
    return await Visitor.find({ url_id: urlId, createdAt: { $gte: startDate, $lte: endDate} });
  }

  async filterBy(urlId: string, type: string): Promise<object[]> {
    return await Visitor.aggregate([
      {
        $match: { url_id: urlId },
      },
      {
        $group: {
          _id: `$${type}`,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);
  }
}
