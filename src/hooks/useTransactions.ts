import { useQuery, UseQueryResult } from "@tanstack/react-query";
import APITransactions from "../api/transactions";
import { Row } from "../types/dashboard";

export const useTransactions = (): UseQueryResult<Row[], Error> => {
  return useQuery<Row[], Error>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await APITransactions.getTransactionsMock();
      return response.map((tx) => ({
        ...tx,
        date: new Date(tx.date), // Convertimos la fecha de string a Date
      })) as Row[];
    },
    staleTime: 1000 * 60 * 5, // Cachea los datos por 5 minutos
  });
};
