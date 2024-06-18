import React from "react";
import { formatISODate } from "./formatDate";
import Edit from '../../assets/svgs/edit.svg'

const Table = ({ columns, data, handleStarted, handleCompleted }) => {
  const getStatusColor = (status) => {
    switch (status ) {
      case "Not started":
        return "#FFA07A";
      case  "Completed":
        return "#E9FFF4";
      case "Started":
        return "#FCCFCF";
      default:
        return "transparent"
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
                    className=" text-center py-1 rounded-lg"
                    style={{
                      backgroundColor: getStatusColor(row[column.accessor]),
                    }}
                  >
                    {row[column.accessor]}
                  </p>
                ) :column.header === "Action" ? (
                <div className="flex gap-3 items-end justify-end">
                 <button className="bg-[#E9EDFF] text-sm  rounded-md p-1 flex items-center justify-center font-bold"  onClick={() => handleStarted(row["_id"])}>
                    <img src={Edit} className="w-[15px] h-[15px]" alt="edit" />
                    Mark as Started
                  </button>
                  <button className="bg-[#E9EDFF] text-sm rounded-md p-1 flex items-center justify-center font-bold" onClick={()=>handleCompleted(row["_id"])}>
                  <img src={Edit} className="w-[15px] h-[15px]" alt="edit" />
                  Mark as Completed
                </button></div>
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
