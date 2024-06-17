export const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

export const capitalizeFirstLetter = (str) => {
  if (str === undefined) {
      return undefined;
  }
  return str.charAt(0).toUpperCase() + str?.slice(1);
};

export function formatCurrency(
  value,
  currency,
  display
) {
  try {
    if (value != null) {
      return value.toLocaleString("en-NG", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        currencyDisplay: display,
      });
    } else {
    }
  } catch (e) {
    return "N/A";
  }
}