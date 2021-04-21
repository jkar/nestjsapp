import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from "src/roles/role.enum";
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // return req.user;/
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('profile')
  // @Roles(Role.Admin)
  getProfile(@Request() req) {
    return req.user;
  }
}
