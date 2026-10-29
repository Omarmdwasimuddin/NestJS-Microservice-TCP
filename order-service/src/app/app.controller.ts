import { Controller, Inject, Get, Param } from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {} 

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    const pattern = { cmd: 'validate_user' };
    const payload = { userId: Number(userId) };
    const authResponse = await firstValueFrom(this.authService.send(pattern, payload));

    if(authResponse.status === 'success') {
      return { 
        message: 'User validated successfully!', 
        user: authResponse.user, 
      };
    }
    return {
      message: 'User validation failed!',
      error: authResponse.message,
    }
  }
}