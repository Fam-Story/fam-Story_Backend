import { Test, TestingModule } from '@nestjs/testing';
import { FamilyMemberController } from '../../domain/family-member';
import { FamilyMemberService } from '../../domain/family-member';
import { INestApplication } from '@nestjs/common';
import { FamilyService } from '../../domain/family';
import { Repository } from 'typeorm';
import { Family, FamilyMember } from '../../infra/entities';

describe('FamilyMemberController (e2e)', () => {
  let controller: FamilyMemberController;
  let app: INestApplication;
  let mockFamilyMemberService: Partial<FamilyService>;
  let mockFamilyRepository: Partial<Repository<Family>>;
  let mockFamilyMemberRepository: Partial<Repository<FamilyMember>>;
  let mockUserRepository: Partial<Repository<FamilyMember>>;

  beforeEach(async () => {
    mockFamilyMemberService = {
      createFamilyMember: jest.fn().mockResolvedValue(1),
      updateFamilyMember: jest.fn(),
      deleteFamilyMember: jest.fn(),
    };

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
