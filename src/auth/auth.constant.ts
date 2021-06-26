import { configService } from "../config/config.service";

export const jwtConstants = {
  secret: configService.getValue('JWT_SECRET_KEY'),
  expireTime: 60*60*24
};