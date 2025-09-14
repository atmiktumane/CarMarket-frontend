function getNameInitials(name: string) {
  if (!name) return "";

  const parts = name.trim().split(" ");

  if (parts.length > 1) {
    // Multiple words → take first char of first & last word
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else {
    // Single word → take first 2 letters
    return name.substring(0, 2).toUpperCase();
  }
}

function formatTextToCapitalize(data: string) {
  return data
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatCurrencyInr(currency: number) {
  return currency.toLocaleString("en-IN");
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-GB", options);

  return formattedDate;
};

export {
  getNameInitials,
  formatTextToCapitalize,
  formatCurrencyInr,
  formatDate,
};
