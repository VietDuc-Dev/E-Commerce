import React from "react";

interface DateVNProps {
  value: string;
  withTime?: boolean;
}

const DateVN: React.FC<DateVNProps> = ({ value, withTime = false }) => {
  const date = new Date(value);

  // Format VN
  const vnDate = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  });

  return <span>{vnDate}</span>;
};

export default DateVN;
