import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './domain/user/user.module';
import { FamilyModule } from './domain/family/family.module';
import { FamilyMemberModule } from './domain/family-member/family-member.module';

@Module({
  imports: [UserModule, FamilyModule, FamilyMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
