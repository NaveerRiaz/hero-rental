// utils.js
export const formatCurrency = (value, lang = "en") => {
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// format numbers
export const formatNumber = (value, lang = "en") => {
    const locale = lang === "ar" ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale, {
      useGrouping: false
    }).format(value);
  };
  
