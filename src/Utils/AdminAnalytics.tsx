import { formatTextToCapitalize } from "./Utilities";

const formatAnalyticsStatusData = (data: any) => {
  const updated_data = [
    { key: "active", count: data?.ACTIVE },
    { key: "inactive", count: data?.INACTIVE },
  ];

  return updated_data;
};

const formatAnalyticsModelData = (data: any) => {
  //   Required Format = [
  //     { carName: "Honda", count: 12 },
  //     { carName: "Toyota", count: 8 },
  //     { carName: "Suzuki", count: 5 },
  //     { carName: "Tata", count: 15 },
  //     { carName: "Hyundai", count: 20 },
  //   ];

  // Validation Check : If Data is null
  if (!Array.isArray(data)) return [];

  let formatted_data = data.map((item: any) => {
    let [key, value] = Object.entries(item)[0];

    return { carName: key, count: value };
  });

  //   console.log("formatted_data : ", formatted_data);

  return formatted_data;
};

const formatAnalyticsConditionData = (data: any) => {
  //   Required Format = [
  //     { carName: "Excellent", count: 12 },
  //     { carName: "Very Good", count: 8 },
  //     { carName: "Good", count: 5 },
  //     { carName: "Fair", count: 15 },
  //   ];

  const formattedConditionCounts = Object.entries(data ?? {}).map(
    ([key, value]) => ({
      carName: formatTextToCapitalize(key),
      count: value,
    })
  );

  return formattedConditionCounts;
};

export {
  formatAnalyticsStatusData,
  formatAnalyticsModelData,
  formatAnalyticsConditionData,
};
