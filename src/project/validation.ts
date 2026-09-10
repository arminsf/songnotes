export function validateProjectName(name: string): string {
  if (name === "") return "Untitled";
  name = name
    .split("")
    .filter((c) => !["/", "\\", '"', "*", ">", "<", ":", "|", "?"].includes(c))
    .join("");
  return name;
}
