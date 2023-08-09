"use client";
import Head from "next/head";
import Header from "@/app/components/header";
import { Incident } from "./Incident";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { setApiStatus } from "./redux/apiSliceReducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Subscribe } from "./subscribeButton";
import { Footer } from "./components/footer";

const StatusPage = () => {
  const dispatch = useDispatch();
  const [apiStatusText, setApiStatusText] = useState("");

  const apiStatus = useSelector((state: RootState) => state.api.status);

  const checkApiStatus = async () => {
    try {
      const response = await fetch("https://httpstat.us/200");
      const data = await response.text();
      const status = response.status;
      console.log(data);
      dispatch(setApiStatus(status.toString()));

      let slackMessage;

      if (status.toString() === "403") {
        slackMessage = {
          text: "Website is forbidden",
        };
      } else if (status.toString() === "404") {
        slackMessage = {
          text: "Website not found",
        };
      } else if (status.toString() === "500") {
        slackMessage = {
          text: "Internal Server Error",
        };
      } else if (status.toString() === "503") {
        slackMessage = {
          text: "Website is under maintenance",
        };
      }

      if (slackMessage) {
        const sendSlackResponse = await fetch("/api/sendSlackStatus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(slackMessage),
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(setApiStatus("error"));
    }
  };

  useEffect(() => {
    checkApiStatus();

    const intervalId = setInterval(() => {
      checkApiStatus();
    }, 60000); // 60000 milliseconds = 60 seconds change based on

    return () => clearInterval(intervalId);
  }, [checkApiStatus]);

  useEffect(() => {
    checkApiStatus();
  }, [apiStatus]);

  const [statusColor, setStatusColor] = useState("");
  const [textColor, setTextColor] = useState("");
  interface StatusMapping {
    [key: string]: { text: string; color: string };
  }
  const statusMapping: StatusMapping = {
    "200": { text: "Operational", color: "green" },
    "429": { text: "Rate Limited", color: "yellow" },
    "503": { text: "Under Maintenance", color: "blue" },
    "504": { text: "Gateway Timeout", color: "yellow" },
    "400": { text: "Partial Outage", color: "orange" },
    "401": { text: "Unauthorized", color: "red" },
    "403": { text: "Forbidden", color: "red" },
    "404": { text: "Not Found", color: "gray" },
    "500": { text: "Degraded Performance", color: "red" },
    default: { text: "Unknown", color: "gray" },
  };

  useEffect(() => {
    const setStatus = () => {
      const { text, color } = statusMapping[apiStatus] || statusMapping.default;
      setApiStatusText(text);
      setStatusColor(color);
      setTextColor(getTextColor(color));
    };

    setStatus();
  }, [apiStatus]);

  const getTextColor = (color: string) => {
    switch (color) {
      case "green":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800";
      case "yellow":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800";
      case "blue":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800";
      case "orange":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800";
      case "red":
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800";
      case "gray":
      default:
        return "px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="min-h-screen overflow-scroll-hidden">
      <Head>
        <title>Status Page</title>
        <link rel="icon" href="" />
      </Head>

      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h2 className="font-thin text-xl mb-4 md:mb-0 md:mr-4">
            Operational Domains
          </h2>
          <Subscribe />
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Domain
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider pr-8"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        example.com
                      </div>
                      <div className="text-sm text-gray-500">
                        A search engine
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right pr-8">
                  <span className={textColor}>{apiStatusText}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Incident statusCode={apiStatus} />
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
