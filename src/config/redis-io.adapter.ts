import { IoAdapter } from '@nestjs/platform-socket.io';

import { createShardedAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ServerOptions } from 'socket.io';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createShardedAdapter>;
  async connectToRedis(url: string): Promise<void> {
    const pubClient = createClient({ url: url });
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]);
    // https://docs.aws.amazon.com/ko_kr/AmazonElastiCache/latest/red-ug/supported-engine-versions.html#redis-version-7.1
    this.adapterConstructor = createShardedAdapter(pubClient, subClient);
  }
  override createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}
