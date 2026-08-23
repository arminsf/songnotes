import { useProjectStore } from "../store/project-store"

export function Ribbon() {
    const projectName = useProjectStore((state) => state.project.name)

    return (<h1 className="text-2xl font-bold p-3">{projectName}</h1>)
}