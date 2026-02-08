import * as projectService from '../src/services/projectService';
import * as requirementService from '../src/services/requirementService';

describe('Project Service', () => {
  it('getAllProjects returns array', async () => {
    const projects = await projectService.getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
  });
});

describe('Requirement Service', () => {
  it('getAllRequirements returns array', async () => {
    const reqs = await requirementService.getAllRequirements('507f1f77bcf86cd799439011');
    expect(Array.isArray(reqs)).toBe(true);
  });
});