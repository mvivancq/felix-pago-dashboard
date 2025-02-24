export function tableDate (date: Date): string {
  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export const formatUSD = (amount: number): string => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
};

export const formatExchange = (amount: number, currency: string): string => {
    const locale = currency === "MXN" ? "es-MX" 
                  : currency === "COP" ? "es-CO" 
                  : currency === "CLP" ? "es-CL" 
                  : "en-US"; // Fallback si la moneda no está en la lista
  
    return amount.toLocaleString(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
};
  