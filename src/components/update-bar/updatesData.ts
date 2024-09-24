// updatesData.ts

/**
 * Update Type Definition
 * 
 * Represents the structure of an update item.
 */
export type Update = {
    id: number;
    content: string;
    timestamp: Date;
  };
  
  /**
   * Initial Events Data
   */
  export const initialEvents: Update[] = [
    { id: 1, content: "AGI House @SF/Bay Area", timestamp: new Date() },
    { id: 2, content: "GenAI Meetup @ Sunnyvale", timestamp: new Date() },
    { id: 3, content: "[Upcoming] AI Workshop @ Stanford/Nvidia", timestamp: new Date() },
  ];
  
  /**
   * Initial Learnings Data
   */
  export const initialLearnings: Update[] = [
    { id: 1, content: "Learning AI Agents", timestamp: new Date() },
    { id: 2, content: "Building Job Automation T00l", timestamp: new Date() },
    { id: 3, content: "Exploring SF/Bay Area", timestamp: new Date() },
  ];
  
  /**
   * Initial Completed Tasks Data
   */
  export const initialCompleted: Update[] = [
    { id: 1, content: "TypeScript Project", timestamp: new Date() },
    { id: 2, content: "10K Marathon", timestamp: new Date() },
    { id: 3, content: "Mylo Singh's 4th Bday", timestamp: new Date() },
  ];

