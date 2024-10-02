import { useState } from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);
  return {
    loading,
    toggleLoading: () => setLoading((prev) => !prev),
  };
};
