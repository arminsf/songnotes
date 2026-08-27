import type { Project } from "../types/project";
import { deserializeProject, serializeProject } from "./serialization";

export function downloadProject(project: Project) {
    const blob = new Blob([JSON.stringify(serializeProject(project))], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = project.name;
    link.click();
    URL.revokeObjectURL(url);
}

export async function uploadProject(): Promise<Project> {
    return new Promise((resolve, reject) => {
        function whenChanged(this: HTMLInputElement) {
            if (!this.files || !this.files[0]) {
                reject(new Error("upload failed"));
                return;
            }

            const file = this.files[0];
            if (file.type !== "application/json") {
                reject(new Error("file is not json"));
                return;
            }

            file.text().then((json) => {
                const project = deserializeProject(json);
                resolve(project);
            });
        }

        const input = document.createElement('input');
        input.type="file";
        input.addEventListener("change", whenChanged);
        input.click();
    });
}

export async function fetchProject(url: string): Promise<Project> {
    const response = await fetch(url);
    const blob = await response.blob();
    const json = await blob.text();
    return deserializeProject(json);
}

export async function uploadAudio(): Promise<string> {
    return new Promise((resolve, reject) => {
        function whenChanged(this: HTMLInputElement) {
            if (!this.files || !this.files[0]) {
                reject(new Error("upload failed"));
                return;
            }

            const file = this.files[0];
            if (!file.type.startsWith("audio")) {
                reject(new Error("file is not audio"));
                return;
            }

            resolve(URL.createObjectURL(file));
        }

        const input = document.createElement('input');
        input.type="file";
        input.addEventListener("change", whenChanged);
        input.click();
    });
}