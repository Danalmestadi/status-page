"use client";
import React from "react";

type Incident = {
  title: string;
  details: string;
  date: string;
};

type IncidentProps = {
  statusCode: string;
};

export function Incident(props: IncidentProps) {
  const { statusCode } = props;

  const incidents: Incident[] = [
   
  ];

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  if (statusCode === "403") {
    incidents.push({
      title: "Forbidden",
      details: "Website is forbidden",
      date: new Date().toISOString(),
    });
  } else if (statusCode === "404") {
    incidents.push({
      title: "Not Found",
      details: "Website not found",
      date: new Date().toISOString(),
    });
  } else if (statusCode === "500") {
    incidents.push({
      title: "Internal Server Error",
      details: "Internal Server Error",
      date: new Date().toISOString(),
    });
  } else if (statusCode === "503") {
    incidents.push({
      title: "Under Maintenance",
      details: "Website is under maintenance",
      date: new Date().toISOString(),
    });
  }

  return (
    <main>
      <h2 className="font-thin text-xl mt-8 mb-4 text-center lg:text-left">
        Recent Incidents
      </h2>
      <ul className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
        {incidents.map((incident, index) => (
          <li key={index} className="py-4 pl-4">
            <div className="text-md font-medium text-gray-600">
              {incident.title}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <p>{incident.details}</p>
              <p className="mt-2">{formatDate(incident.date)}</p>
            </div>
          </li>
        ))}
      </ul>
 </main>
  );
}
