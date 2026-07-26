import { useEffect, useRef, useCallback } from 'react';
import { type PipelineProgressEvent } from '@legenda/shared-types';
import { useProjectStore } from '@/store/projectStore';

import { WS_URL } from '@/api/client';

export function usePipelineSocket(projectId: string | null) {
  const ws = useRef<WebSocket | null>(null);
  const { setPipelineProgress, updateProjectInList } = useProjectStore();

  const connect = useCallback(() => {
    if (!projectId) return;
    ws.current = new WebSocket(`${WS_URL}?projectId=${projectId}`);

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data as string) as PipelineProgressEvent;
      setPipelineProgress(data);
      if (data.stage === 'COMPLETED' || data.stage === 'FAILED') {
        // refresh project state
        fetch(`/api/projects/${projectId}`)
          .then((r) => r.json())
          .then((res) => {
            if (res.success && res.data) updateProjectInList(res.data);
          })
          .catch(console.error);
      }
    };

    ws.current.onerror = () => console.error('WebSocket error');
    ws.current.onclose = () => console.info('WebSocket closed');
  }, [projectId, setPipelineProgress, updateProjectInList]);

  useEffect(() => {
    connect();
    return () => ws.current?.close();
  }, [connect]);
}
