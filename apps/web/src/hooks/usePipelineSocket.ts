import { useEffect, useRef, useCallback, useState } from 'react';
import { type PipelineProgressEvent, ProjectStatus } from '@legenda/shared-types';
import { useProjectStore } from '@/store/projectStore';

const WS_URL = `ws://${window.location.host}/ws`;

// Statuses that should NOT attempt WebSocket connection
const TERMINAL_STATUSES = new Set<string>([
  ProjectStatus.COMPLETED,
  ProjectStatus.FAILED,
  ProjectStatus.STORY_DONE, // Story generation complete - no active pipeline
]);

// Statuses that indicate active pipeline work (should maintain WebSocket)
const ACTIVE_PIPELINE_STATUSES = new Set<string>([
  ProjectStatus.STORY_GENERATING,
  ProjectStatus.ASSETS_GENERATING,
  ProjectStatus.AUDIO_GENERATING,
  ProjectStatus.STORYBOARD_GENERATING,
  ProjectStatus.VIDEO_GENERATING,
  ProjectStatus.ASSEMBLING,
]);

export function usePipelineSocket(
  projectId: string | null,
  projectStatus: string | null,
  onMessage?: (event: PipelineProgressEvent) => void,
) {
  const ws = useRef<WebSocket | null>(null);
  const { setPipelineProgress, updateProjectInList } = useProjectStore();
  const [isConnected, setIsConnected] = useState(false);
  const connectAttempts = useRef(0);
  const maxConnectAttempts = 3;

  const connect = useCallback(() => {
    if (!projectId) return;

    // Don't connect if project is in terminal state
    if (projectStatus && TERMINAL_STATUSES.has(projectStatus)) {
      console.info('[WS] Project in terminal status, not connecting:', projectStatus);
      return;
    }

    // Don't open a second socket
    if (ws.current && ws.current.readyState <= WebSocket.OPEN) return;

    const socket = new WebSocket(`${WS_URL}?projectId=${projectId}`);
    ws.current = socket;

    socket.onopen = () => {
      console.info('[WS] Connected');
      setIsConnected(true);
      connectAttempts.current = 0;
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data as string) as PipelineProgressEvent;
      setPipelineProgress(data);
      onMessage?.(data);

      // Fetch updated project when pipeline reaches terminal stages
      if (data.stage === ProjectStatus.COMPLETED || data.stage === ProjectStatus.FAILED || data.stage === ProjectStatus.STORY_DONE) {
        fetch(`/api/projects/${projectId}`)
          .then((r) => r.json())
          .then((res) => {
            if (res.success && res.data) updateProjectInList(res.data);
          })
          .catch(console.error);
      }
    };

    socket.onerror = (err) => console.error('[WS] Error:', err);

    socket.onclose = (event) => {
      console.info('[WS] Closed:', event.code, event.reason);
      setIsConnected(false);

      // Auto-reconnect for active pipeline statuses (but not terminal)
      if (
        projectStatus &&
        ACTIVE_PIPELINE_STATUSES.has(projectStatus) &&
        connectAttempts.current < maxConnectAttempts
      ) {
        connectAttempts.current++;
        console.info(`[WS] Reconnecting... attempt ${connectAttempts.current}`);
        setTimeout(connect, 1000 * connectAttempts.current);
      }
    };
  }, [projectId, projectStatus, setPipelineProgress, updateProjectInList]);

  useEffect(() => {
    connect();

    return () => {
      const socket = ws.current;
      if (!socket) return;
      if (socket.readyState === WebSocket.CONNECTING) {
        socket.addEventListener('open', () => socket.close());
      } else if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      ws.current = null;
      setIsConnected(false);
    };
  }, [connect]);

  return { isConnected };
}
