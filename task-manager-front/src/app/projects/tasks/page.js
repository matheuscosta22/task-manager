"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectsTasks from '@/app/components/projects/tasks/projectsTasks';

function ProjectTasksContent() {  // The main component logic is extracted here
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project_id');

  return (
    <ProjectsTasks projectId={projectId}/>
  );
}

export default function ProjectTasks() {  // The outer component wraps the content in Suspense
  return (
    <Suspense>
      <ProjectTasksContent />
    </Suspense>
  );
}