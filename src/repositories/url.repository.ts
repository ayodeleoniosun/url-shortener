import { Url } from "../../db/models/url";
import { IUrl } from "../interfaces/url.interface";
import { IUrlRepository } from "./interfaces/url.repository.interface";

export class UrlRepository implements IUrlRepository {
  save(url: IUrl): Promise<IUrl> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUrl = Url.build({ ...url });
        await newUrl.save();
        resolve(newUrl as unknown as IUrl);
      } catch (e) {
        reject(e);
      }
    });
  }

  getUrlByShortCode(shortCode: string): Promise<IUrl> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await Url.findOne({ where: { shortCode } });
        resolve(url as unknown as IUrl);
      } catch (e) {
        reject(e);
      }
    });
  }
}
