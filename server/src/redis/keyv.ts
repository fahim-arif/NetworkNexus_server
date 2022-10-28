import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";

const keyvRedis = new KeyvRedis("redis://localhost:6379");
const keyv = new Keyv({ store: keyvRedis });

export default keyv;

export const DEFAULT_EXPIRATION = 1000 * 60 * 60;
