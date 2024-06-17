import React from "react";
import { formatISODate } from "./formatDate";

const Table = ({ columns, data }) => {
  const getStatusColor = (started) => {
    switch (started) {
      case "successful":
        return "#D1FFC9";
      case "active":
        return "#D1FFC9";
      case "resolved":
        return "#D1FFC9";
      case "pending":
        return "#FCCFCF";
      case "false":
        return "#FFA07A";
      case "failed":
        return "#D9D9D9";
      case "suspended":
        return "#FCCFCF";
      case "closed":
        return "#FCCFCF";
      case "blocked":
        return "#FCCFCF";
      case "inactive":
        return "#D9D9D9";
      default:
        return "transparent";
    }
  };

  return (
    <table className="mt-6 w-full">
      <thead className=" h-10">
        <tr className="text-[16px] text-left bg-[#EDEDEE]">
          {columns.map((column, index) => (
            <th className="font-medium " key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[12px]">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border-none pt-2" >
                {column.accessor === "due_date" ||
                column.accessor === "dueDate" ? (
                  formatISODate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                  <img
                    src={row[column.accessor] ? row[column.accessor] : ""}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="profile"
                  />
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "status" || column.accessor === "started" ? (
                  <p
                    className=" text-[12px] p-1 text-center font-normal w-20 rounded-md"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                    }}
                  >
                    {row[column.accessor]}
                  </p>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
