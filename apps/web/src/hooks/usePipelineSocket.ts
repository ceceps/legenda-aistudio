import { useEffect, useRef, useCallback } from 'react';
import { type PipelineProgressEvent, ProjectStatus } from '@legenda/shared-types';
import { useProjectStore } from '@/store/projectStore';

const WS_URL = `ws://${window.location.host}/ws`;

const TERMINAL_STATUSES = new Set<string>([
  ProjectStatus.COMPLETED,
  ProjectStatus.FAILED,
]);

export function usePipelineSocket(projectId: string | null) {
  const ws = useRef<WebSocket | null>(null);
  const { setPipelineProgress, updateProjectInList, currentProject } = useProjectStore();

  const connect = useCallback(() => {
    if (!projectId) return;

    // Don't connect if project already in terminal state
    if (currentProject && TERMINAL_STATUSES.has(currentProject.status)) return;

    // Don't open a second socket
    if (ws.current && ws.current.readyState <= WebSocket.OPEN) return;

    const socket = new WebSocket(`${WS_URL}?projectId=${projectId}`);
    ws.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data as string) as PipelineProgressEvent;
      setPipelineProgress(data);
      if (data.stage === ProjectStatus.COMPLETED || data.stage === 'FAILED') {
        fetch(`/api/projects/${projectId}`)
          .then((r) => r.json())
          .then((res) => {
            if (res.success && res.data) updateProjectInList(res.data);
          })
          .catch(console.error);
      }
    };

    socket.onerror = () => console.error('WebSocket error');
    socket.onclose = () => console.info('WebSocket closed');
  }, [projectId, currentProject?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    connect();

    return () => {
      const socket = ws.current;
      if (!socket) return;
      // Only close if connection is actually open or connecting
      if (socket.readyState === WebSocket.CONNECTING) {
        // Wait for open then close, avoids "closed before established" error
        socket.addEventListener('open', () => socket.close());
      } else if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      ws.current = null;
    };
  }, [connect]);
}
