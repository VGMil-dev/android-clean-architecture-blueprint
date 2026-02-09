---
name: StepsDiagram
description: Automated generation of standardized architecture diagrams using BaseArchitectureDiagram.tsx. Use this skill to transform a conceptual workflow into a high-fidelity React Flow diagram.
---

# StepsDiagram Skill

This skill provides the methodology to generate and integrate architecture diagrams using the `BaseArchitectureDiagram` component. 

## Workflow

### 1. Identify the Workflow
Analyze the technical process (e.g., "Push Notification Lifecycle", "QR Setup"). Identify 4 to 6 discrete, sequential steps.

### 2. Generate the Data Structure
Each diagram requires an array of `DiagramStep` objects. 

**Format:**
```typescript
import { Camera, Cpu, Code, Activity, CheckCircle } from 'lucide-react';

const steps = [
  { 
    title: "1. Phase Name", 
    description: "Brief technical explanation (max 12 words).", 
    icon: <IconComponent size={20} /> 
  },
  // ... more steps
];
```

### 3. Implementation Blueprint
Create a wrapper component in `src/components/react/` that passes data to the base engine.

**Template:**
```tsx
import BaseArchitectureDiagram, { type DiagramStep } from './BaseArchitectureDiagram';
import { Icon1, Icon2, ... } from 'lucide-react';

const steps: DiagramStep[] = [ ... ];

export default function MyNewDiagram() {
  return <BaseArchitectureDiagram steps={steps} />;
}
```

### 4. Integration in MDX
Import the diagram with `client:load` for interactivity.

```mdx
import MyNewDiagram from '@components/react/MyNewDiagram';

<MyNewDiagram client:load />
```

## Best Practices
- **Descriptions**: Use `⮕` for transitions and avoid long sentences. Use technical terms (PCI, API, Buffer, JSON).
- **Icons**: Always use `lucide-react` with `size={20}`.
- **Heights**: The default is `900px` (mobile) and `650px` (desktop), but can be overridden if the flow is exceptionally long.
- **Standardization**: Do not add custom React Flow logic in the wrapper; the engine handles all animations and responsiveness.
