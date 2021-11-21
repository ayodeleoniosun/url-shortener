import redis from 'redis';
import { RedisClient } from 'redis';

export class RedisService {
  private readonly client: RedisClient;

  constructor() {
    this.client = redis.createClient(process.env.REDIS_URL);
  }

  set(key: string, value: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.client.set(key, value);
        resolve(true);
      } catch (e) {
        reject(e);
      }
    });
  }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }
}
