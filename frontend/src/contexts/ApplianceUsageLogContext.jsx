import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { 
    getAllApplianceUsageLogs,
    addApplianceUsageLogAsync, 
    updateApplianceUsageLog
} from "../services/ApplianceUsageLogsService";

const ApplianceUsageLogContext = createContext(null);

export function ApplicationUsageLogProvider({children}) {
    const [ usageLogs, setUsageLogs ] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const fetchLogs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllApplianceUsageLogs();
            setUsageLogs(data);
        } catch (err) {
            console.error("Failed to fetch usage logs:", err);
            setError("Could not retrieve appliance usage data.");
        } finally {
            
        }
    }, []);

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    async function addLog(logData) {
        try {
            await addApplianceUsageLogAsync(logData);
            await fetchLogs();
        } catch (err) {
            console.error("Failed to add log entry:", err);
        }
    }

    async function updateLog(id, updatedFields) {
        try {
            await updateApplianceUsageLog(id, updatedFields);
            await fetchLogs();
        } catch (err) {
            console.error("Failed to update log entry:", err);
        }
    }

    return (
    <ApplianceUsageLogContext.Provider value={{ 
      usageLogs, 
      loading, 
      error, 
      refetchLogs: fetchLogs,
      addLog,
      updateLog
    }}>
      {children}
    </ApplianceUsageLogContext.Provider>
  );
}

export function useApplianceUsageLogs() { return useContext(ApplianceUsageLogContext); }