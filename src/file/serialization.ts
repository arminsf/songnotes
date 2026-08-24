import type { Project } from "../types/project";

interface ProjectFileV1 {
    version: 1,
    project: Project,
}

export function serializeProject(project: Project): ProjectFileV1 {
    return {
        version: 1,
        project: project,
    };
}

export function deserializeProject(json: string) {
    const loadedProject: ProjectFileV1 = JSON.parse(json);
    // version migrations go here i think? also validate the file
    
    return loadedProject.project;
}