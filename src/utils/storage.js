const STORAGE_KEY = "quickqr_history";

export const getQRHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEY);

    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("History read error:", error);
    return [];
  }
};

export const saveQRHistory = (item) => {
  try {
    const history = getQRHistory();

    const newItem = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...item,
    };

    const updatedHistory = [newItem, ...history].slice(0, 20);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));

    return updatedHistory;
  } catch (error) {
    console.error("History save error:", error);
    return [];
  }
};

export const deleteQRHistory = (id) => {
  const history = getQRHistory();

  const updated = history.filter((item) => item.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  return updated;
};

export const clearQRHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
