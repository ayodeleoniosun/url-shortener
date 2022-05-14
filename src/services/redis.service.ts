import redis from 'redis';
import { RedisClient } from 'redis';

export class RedisService {
  private readonly client: RedisClient;

  constructor() {
    this.client = redis.createClient(process.env.REDIS_URL);
  }

  async set(key: string, value: any): Promise<boolean> {
    return await this.client.set(key, value);
  }

  async get(key: string): Promise<any> {
    await this.client.get(key, (err, value) => {
      return value;
    });
  }

  async remove(key: string): Promise<any> {
    await this.client.del(key, (err, value) => {
      return value;
    });
  }
}
