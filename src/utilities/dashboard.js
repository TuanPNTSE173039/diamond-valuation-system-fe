import { formattedMoney } from "./formatter.js";

export const dataMapping = (revenueChart) => {
  return revenueChart?.map((item) => {
    const monthShortName =
      item.month.slice(0, 3).charAt(0).toUpperCase() +
      item.month.slice(1, 3).toLowerCase();
    return {
      ...item.data,
      month: monthShortName,
    };
  });
};

export const dataSeriesMapping = (revenueChart) => {
  const combinedData = {};
  revenueChart?.forEach((item) => {
    Object.keys(item.data).forEach((year) => {
      if (!combinedData[year]) {
        combinedData[year] = {
          dataKey: year,
          label: year,
          valueFormatter: (value) => formattedMoney(value),
        };
      }
    });
  });

  return Object.values(combinedData);
};

export const yearFilter = (revenueChart) => {
  const allYears = revenueChart.flatMap((item) => Object.keys(item.data));
  const uniqueYearsSet = new Set(allYears);
  return Array.from(uniqueYearsSet);
};
