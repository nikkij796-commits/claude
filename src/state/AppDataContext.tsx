import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CATEGORIES, DEFAULT_TOOLS } from "../data/toolkitData";
import type {
  CategoryId,
  CheckIn,
  CustomTool,
  DayLog,
  JournalEntry,
  Tool,
  ToolEdits,
} from "../types";

function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface AppDataValue {
  tools: Tool[];
  toolsByCategory: (categoryId: CategoryId) => Tool[];
  toolById: (id: string) => Tool | undefined;
  categories: typeof CATEGORIES;

  favorites: string[];
  toggleFavorite: (toolId: string) => void;

  updateTool: (toolId: string, patch: Partial<Pick<Tool, "name" | "howTo" | "guidedSeconds">>) => void;
  addCustomTool: (categoryId: CategoryId, name: string) => string;
  removeCustomTool: (toolId: string) => void;

  checkIns: CheckIn[];
  addCheckIn: (checkIn: Omit<CheckIn, "id" | "timestamp">) => void;

  dayLogs: Record<string, DayLog>;
  todayKeyStr: string;
  getDayLog: (date: string) => DayLog;
  updateDayLog: (date: string, patch: Partial<Omit<DayLog, "date">>) => void;
  toggleDayTool: (date: string, toolId: string) => void;

  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, "id" | "createdAt">) => void;
  updateJournalEntry: (id: string, patch: Partial<Pick<JournalEntry, "text" | "tags" | "date">>) => void;
  deleteJournalEntry: (id: string) => void;
}

const AppDataContext = createContext<AppDataValue | null>(null);

function emptyDayLog(date: string): DayLog {
  return { date, checked: false, note: "", toolIds: [] };
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [toolEdits, setToolEdits] = useLocalStorage<ToolEdits>("anxiety-toolkit:tool-edits", {});
  const [customTools, setCustomTools] = useLocalStorage<CustomTool[]>("anxiety-toolkit:custom-tools", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("anxiety-toolkit:favorites", []);
  const [checkIns, setCheckIns] = useLocalStorage<CheckIn[]>("anxiety-toolkit:checkins", []);
  const [dayLogs, setDayLogs] = useLocalStorage<Record<string, DayLog>>("anxiety-toolkit:day-logs", {});
  const [journalEntries, setJournalEntries] = useLocalStorage<JournalEntry[]>("anxiety-toolkit:journal", []);

  const tools = useMemo<Tool[]>(() => {
    const base = [...DEFAULT_TOOLS, ...customTools];
    return base.map((t) => {
      const edit = toolEdits[t.id];
      return edit ? { ...t, ...edit } : t;
    });
  }, [toolEdits, customTools]);

  const toolsByCategory = (categoryId: CategoryId) => tools.filter((t) => t.categoryId === categoryId);
  const toolById = (id: string) => tools.find((t) => t.id === id);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => (prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]));
  };

  const updateTool: AppDataValue["updateTool"] = (toolId, patch) => {
    setToolEdits((prev) => ({ ...prev, [toolId]: { ...prev[toolId], ...patch } }));
  };

  const addCustomTool: AppDataValue["addCustomTool"] = (categoryId, name) => {
    const id = newId();
    setCustomTools((prev) => [
      ...prev,
      { id, categoryId, name, howTo: "Add your own notes on how you use this tool.", custom: true },
    ]);
    return id;
  };

  const removeCustomTool = (toolId: string) => {
    setCustomTools((prev) => prev.filter((t) => t.id !== toolId));
    setFavorites((prev) => prev.filter((id) => id !== toolId));
  };

  const addCheckIn: AppDataValue["addCheckIn"] = (checkIn) => {
    setCheckIns((prev) => [{ ...checkIn, id: newId(), timestamp: new Date().toISOString() }, ...prev].slice(0, 500));
  };

  const getDayLog = (date: string) => dayLogs[date] ?? emptyDayLog(date);

  const updateDayLog: AppDataValue["updateDayLog"] = (date, patch) => {
    setDayLogs((prev) => ({ ...prev, [date]: { ...emptyDayLog(date), ...prev[date], ...patch } }));
  };

  const toggleDayTool = (date: string, toolId: string) => {
    setDayLogs((prev) => {
      const current = prev[date] ?? emptyDayLog(date);
      const has = current.toolIds.includes(toolId);
      const toolIds = has ? current.toolIds.filter((id) => id !== toolId) : [...current.toolIds, toolId];
      return { ...prev, [date]: { ...current, toolIds } };
    });
  };

  const addJournalEntry: AppDataValue["addJournalEntry"] = (entry) => {
    setJournalEntries((prev) => [{ ...entry, id: newId(), createdAt: new Date().toISOString() }, ...prev]);
  };

  const updateJournalEntry: AppDataValue["updateJournalEntry"] = (id, patch) => {
    setJournalEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const value: AppDataValue = {
    tools,
    toolsByCategory,
    toolById,
    categories: CATEGORIES,
    favorites,
    toggleFavorite,
    updateTool,
    addCustomTool,
    removeCustomTool,
    checkIns,
    addCheckIn,
    dayLogs,
    todayKeyStr: todayKey(),
    getDayLog,
    updateDayLog,
    toggleDayTool,
    journalEntries,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataValue {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}

export { todayKey };
