import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SiteSettingsDto } from 'src/models/site-settings.model';
import { SettingsService } from './settings.service';

@Controller('settings')
// @UseGuards(AuthGuard())
export class SettingsController {
  constructor(private settingsService: SettingsService) {}

  @Get()
  getSettings(): Promise<any> {
    return this.settingsService.getSettings();
  }

  @Get('/banners')
  getBanners(): Promise<any> {
    return this.settingsService.getBanners();
  }

  @Patch()
  updateSiteSettings(
    @Body() updateSiteSettingsObj: SiteSettingsDto,
  ): Promise<string> {
    return this.settingsService.updateSettings(updateSiteSettingsObj);
  }
}
