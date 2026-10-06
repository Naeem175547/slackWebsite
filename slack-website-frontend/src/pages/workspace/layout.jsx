import { WorkspaceNavbar } from '@/components/organisms/workspace/WorkspaceNavbar';
import { WorkspaceSidebar } from '@/components/organisms/workspace/WorkspaceSidebar';
import { useDefaultLayout } from 'react-resizable-panels';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';

export const WorkspaceLayout = ({ children }) => {
 

  return (
    <div className="h-screen">
      <WorkspaceNavbar />

      <div className="flex h-[calc(100vh-40px)]">
        <WorkspaceSidebar />

        <ResizablePanelGroup
          orientation="horizontal"
          className="flex-1"
        >
          <ResizablePanel
            id="workspace-sidebar"
            defaultSize="20%"
            minSize="11%"
            className="bg-slack-medium"
          >
            <div>
              Sidebar
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel id="workspace-content" minSize="20%">
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};