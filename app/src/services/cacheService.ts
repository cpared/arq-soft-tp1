import * as redis from 'redis';

class CacheService {

    private static instance: CacheService;
    private client: redis.RedisClientType;

    private constructor() {
        this.client = redis.createClient({url: 'redis://redis:6379'});

        //Chequeo la conexion
        this.client.on('connect', () => {
            console.log('Cliente Redis conectado');
        });

        this.client.on('error', (err: any) => {
            console.error('Error en el cliente Redis:', err);
        });
    }

    static create(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    private async connect() {
        try {
            await this.client.connect();
            //Chequeo la conexion
            
            this.client.on('connect', () => {
                console.log('Cliente Redis conectado');
            });

            this.client.on('error', (err: any) => {
                console.error('Error en el cliente Redis:', err);
            });
        } catch (err) {
            console.error(err);
        }
    }

    public async get(key: string){
        try {
            if (!this.client.isReady) {
                console.log('Redis client is not connected, connecting now...');
                await this.connect();
            }
            return await this.client.get(key);
        } catch (err) {
            console.error(err);
        }
    }

    public async set(key: string, value: string, expiresSeconds: number) {
        try {
            if (!this.client.isReady) {
                console.log('Redis client is not connected, connecting now...');
                await this.connect();
            }
            this.client.set(key, value,{EX: expiresSeconds});
        } catch (err) {
            console.error(err);
        }

}
}


export const cacheService = CacheService.create();