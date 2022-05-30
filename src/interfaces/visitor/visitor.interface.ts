import { IVisitor } from './visitor';

export interface VisitorInterface {
  getVisitorsStatisticsByUrl(url_id: string): Promise<object>;
  getVisitorInfo(visitor_id: string): Promise<IVisitor>;
}
