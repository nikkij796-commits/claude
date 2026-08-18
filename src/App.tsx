import { useState } from "react";
import { AppDataProvider } from "./state/AppDataContext";
import { NavBar, type ScreenId } from "./components/NavBar";
import { HomeScreen } from "./screens/HomeScreen";
import { ToolkitScreen } from "./screens/ToolkitScreen";
import { TrackerScreen } from "./screens/TrackerScreen";
import { JournalScreen } from "./screens/JournalScreen";
import { CommunicationScreen } from "./screens/CommunicationScreen";
import { ResourcesScreen } from "./screens/ResourcesScreen";
import { ToolDetailSheet } from "./components/ToolDetailSheet";
import { GuidedMode } from "./components/GuidedMode";
import type { Tool } from "./types";

function AppShell() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [openTool, setOpenTool] = useState<Tool | null>(null);
  const [guidedOpen, setGuidedOpen] = useState(false);
  const [guidedStartTool, setGuidedStartTool] = useState<Tool | undefined>(undefined);

  return (
    <div className="min-h-dvh mx-auto max-w-md">
      {screen === "home" && (
        <HomeScreen
          onOpenTool={setOpenTool}
          onStartGuided={() => {
            setGuidedStartTool(undefined);
            setGuidedOpen(true);
          }}
        />
      )}
      {screen === "toolkit" && <ToolkitScreen onOpenTool={setOpenTool} />}
      {screen === "tracker" && <TrackerScreen />}
      {screen === "journal" && <JournalScreen />}
      {screen === "communication" && <CommunicationScreen />}
      {screen === "resources" && <ResourcesScreen />}

      <NavBar current={screen} onChange={setScreen} />

      {openTool && (
        <ToolDetailSheet
          tool={openTool}
          onClose={() => setOpenTool(null)}
          onStartGuided={(tool) => {
            setOpenTool(null);
            setGuidedStartTool(tool);
            setGuidedOpen(true);
          }}
        />
      )}

      {guidedOpen && (
        <GuidedMode
          startTool={guidedStartTool}
          onClose={() => {
            setGuidedOpen(false);
            setGuidedStartTool(undefined);
          }}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AppDataProvider>
      <AppShell />
    </AppDataProvider>
  );
}

export default App;
