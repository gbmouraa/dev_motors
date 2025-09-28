export const formatCurrency = (currency: string | number) => {
  const value = Number(currency);
  const formated = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formated;
};
