"use client";
import Head from "next/head";
import Header from "@/app/components/header";
import { Incident } from "./Incident";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";
import { setApiStatus } from "./redux/apiSliceReducer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Subscribe } from "./subscribeButton";
import { Footer } from "./components/footer";

const StatusPage = () => {
  const dispatch = useDispatch();
  let apiStatusText = "";
  let statusColor = "";

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
    }, 800000); // 80000 milliseconds =  seconds change based on

    return () => clearInterval(intervalId);
  }, [checkApiStatus]);

  useEffect(() => {
    checkApiStatus();
  }, [apiStatus]);

  switch (apiStatus) {
    case "200":
      apiStatusText = "Operational";
      statusColor = "green";
      break;
    case "429":
      apiStatusText = "Rate Limited";
      statusColor = "yellow";
      break;
    case "503":
      apiStatusText = "Under Maintenance";
      statusColor = "blue";
      break;
    case "504":
      apiStatusText = "Gateway Timeout";
      statusColor = "yellow";
      break;
    case "400":
      apiStatusText = "Partial Outage";
      statusColor = "orange";
      break;
    case "401":
      apiStatusText = "Unauthorized";
      statusColor = "red";
      break;
    case "403":
      apiStatusText = "Forbidden";
      statusColor = "red";
      break;
    case "404":
      apiStatusText = "Not Found";
      statusColor = "gray";
      break;
    case "500":
      apiStatusText = "Degraded Performance";
      statusColor = "red";
      break;
    default:
      apiStatusText = "Unknown";
      statusColor = "gray";
      break;
  }

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
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${statusColor}-100 text-${statusColor}-800`}
                  >
                    {apiStatusText}
                  </span>
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
