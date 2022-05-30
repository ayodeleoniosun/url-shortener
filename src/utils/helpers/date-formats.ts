import moment from "moment";

export class DateFormats {
  public yesterday: string;
  public now: string;
  public startOfToday: string;
  public endOfToday: string;
  public startOfCurrentWeek: string;
  public endOfCurrentWeek: string;
  public startOfCurrentMonth: string;
  public endOfCurrentMonth: string;

  constructor() {
    this.yesterday = moment.utc().subtract(1, "days").toISOString();
    this.now = moment.utc().toISOString();
    this.startOfToday = moment.utc().startOf("day").toISOString();
    this.endOfToday = moment.utc().endOf("day").toISOString();
    this.startOfCurrentWeek = moment.utc().startOf("week").toISOString();
    this.endOfCurrentWeek = moment.utc().endOf("week").toISOString();
    this.startOfCurrentMonth = moment.utc().startOf("month").toISOString();
    this.endOfCurrentMonth = moment.utc().endOf("month").toISOString();
  }
}