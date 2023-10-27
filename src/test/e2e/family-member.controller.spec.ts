import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberController } from '../../domain/family-member/family-member.controller';
import { FamilyMemberService } from '../../domain/family-member/family-member.service';

describe('FamilyMemberController', () => {
  let controller: FamilyMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamilyMemberController],
      providers: [FamilyMemberService],
    }).compile();

    controller = module.get<FamilyMemberController>(FamilyMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
