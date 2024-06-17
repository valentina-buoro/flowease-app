import React from "react";
import { formatISODate } from "./formatDate";
import Edit from '../../assets/svgs/edit.svg'

const Table = ({ columns, data }) => {
  const getStatusColor = (started ,completed) => {
    switch (started ) {
      case false:
        return "#FFA07A";
      case  true:
        return "#E9FFF4";
      case "suspended":
        return "#FCCFCF";
      case "closed":
        return "#FCCFCF";
      case "blocked":
        return "#FCCFCF";
      case "inactive":
        return "#D9D9D9";
      default:
    }
    switch (completed ) {
      case  true:
        return "#E9FFF4";
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
        <tr className="text-[16px] text-center text-[#4A4A4C] bg-[#EDEDEE]">
          {columns.map((column, index) => (
            <th className="font-medium " key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-base text-[#1A1817] text-center">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="border-none py-3" >
                {column.accessor === "id" ||
                column.accessor === "_id" ? (
                  row[column.accessor]===rowIndex+1?row[column.accessor]:rowIndex+1
                ):column.accessor === "due_date" ||
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
                    className=" text-center rounded-md"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                    }}
                  >
                    {row[column.accessor]===false ? "Pending" : "completed"}
                  </p>
                ) :column.header === "Action" ? (
                 <button className="bg-[#E9EDFF]  rounded-md p-1">
                    <img src={Edit} className="w-[15px] h-[15px]" alt="edit" />
                  </button>
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
