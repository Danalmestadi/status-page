"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { subscribe, unsubscribe } from "./redux/subscriptionSlice";
export const Subscribe = () => {
  const dispatch = useDispatch();
  const isSubscribed = useSelector(
    (state: RootState) => state.subscription.isSubscribed
  );
  const handleButtonClick = async () => {
    if (isSubscribed) {
      // Unsubscribe
      dispatch(unsubscribe());
      const message = "A user has unsubscribed";
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: message }),
        });

        if (response.ok) {
          console.log("Slack message sent:", response);
        } else {
          console.error("Failed to send Slack message");
        }
      } catch (error) {
        console.error("Error sending Slack message:", error);
      }
    } else {
      dispatch(subscribe());
      const message = "A new user has subscribed!";
      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: message }),
        });

        if (response.ok) {
          console.log("Slack message sent:", response);
        } else {
          console.error("Failed to send Slack message");
        }
      } catch (error) {
        console.error("Error sending Slack message:", error);
      }
    }
  };

  return (
    <div>
      <button
        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2 lg:px-5 lg:py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 w-full lg:w-auto"
        onClick={handleButtonClick}
      >
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>
    </div>
  );
};

export default Subscribe;
