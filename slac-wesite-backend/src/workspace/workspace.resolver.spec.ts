import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceResolver } from './workspace.resolver.js';

describe('WorkspaceResolver', () => {
  let resolver: WorkspaceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceResolver],
    }).compile();

    resolver = module.get<WorkspaceResolver>(WorkspaceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
