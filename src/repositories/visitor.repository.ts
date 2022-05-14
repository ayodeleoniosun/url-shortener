import { VisitorInterface } from '../interfaces/visitor/visitor.interface';
import Visitor from '../models/visitor';
import { IVisitor } from '../interfaces/visitor/visitor';

export class VisitorRepository implements VisitorInterface {
  async save(visitor: IVisitor): Promise<IVisitor> {
    return await new Visitor(visitor).save();
  }

  async getVisitorsByUrl(url_id: string): Promise<object[]> {
    return await Visitor.find({ url_id });
  }

  async getVisitorInfo(visitor_id: string): Promise<IVisitor> {
    return await Visitor.findOne({ visitor_id });
  }
}
