/**
 * stageParser.ts
 * 
 * Extracts stage boundaries and content from MDX write-up files.
 * Parses <Stage> components to identify stages, titles, and content divisions.
 */

export interface StageData {
  index: number;
  title: string;
  description?: string;
  content: string;
}

/**
 * Extracts stages from MDX content by parsing <Stage> component boundaries.
 * 
 * @param mdxContent - Raw MDX content from a write-up file
 * @returns Array of extracted stages with index, title, and content
 * 
 * @example
 * const stages = extractStages(mdxContent);
 * // Returns: [
 * //   { index: 1, title: "Initial Reconnaissance", content: "...mdx..." },
 * //   { index: 2, title: "Exploitation", content: "...mdx..." }
 * // ]
 */
export function extractStages(mdxContent: string): StageData[] {
  const stages: StageData[] = [];

  // Regex to match <Stage> components with title and optional description
  // Captures: title attribute, optional description attribute, and all content until </Stage>
  const stagePattern =
    /<Stage\s+title=["']([^"']+)["'](?:\s+description=["']([^"']+)["'])?\s*>([\s\S]*?)<\/Stage>/g;

  let match;
  let stageIndex = 1;

  while ((match = stagePattern.exec(mdxContent)) !== null) {
    const title = match[1]; // title attribute
    const description = match[2] || undefined; // optional description attribute
    const content = match[3]; // stage content (everything inside <Stage>)

    stages.push({
      index: stageIndex,
      title: title.trim(),
      description: description ? description.trim() : undefined,
      content: content.trim(),
    });

    stageIndex++;
  }

  // If no stages found, treat entire content as a single stage
  if (stages.length === 0) {
    console.warn('No <Stage> components found in MDX. Treating entire content as Stage 1.');
    stages.push({
      index: 1,
      title: 'Untitled Stage',
      content: mdxContent.trim(),
    });
  }

  return stages;
}

/**
 * Validates that all stages have unique titles and proper structure.
 * 
 * @param stages - Array of extracted stages
 * @returns true if valid, throws error if invalid
 */
export function validateStages(stages: StageData[]): boolean {
  if (stages.length === 0) {
    throw new Error('No stages found in write-up.');
  }

  const titles = stages.map((s) => s.title);
  const uniqueTitles = new Set(titles);

  if (uniqueTitles.size !== titles.length) {
    throw new Error('Duplicate stage titles detected. Each stage must have a unique title.');
  }

  stages.forEach((stage, idx) => {
    if (!stage.title || stage.title.length === 0) {
      throw new Error(`Stage ${idx + 1} has an empty title.`);
    }
    if (!stage.content || stage.content.length === 0) {
      throw new Error(`Stage ${idx + 1} ("${stage.title}") has no content.`);
    }
  });

  return true;
}

/**
 * Gets a specific stage by its number (1-indexed).
 * 
 * @param stages - Array of extracted stages
 * @param stageNumber - 1-indexed stage number
 * @returns The stage object, or null if stage number is out of range
 */
export function getStage(stages: StageData[], stageNumber: number): StageData | null {
  if (stageNumber < 1 || stageNumber > stages.length) {
    return null;
  }
  return stages[stageNumber - 1];
}

/**
 * Returns the total number of stages.
 */
export function getTotalStages(stages: StageData[]): number {
  return stages.length;
}
