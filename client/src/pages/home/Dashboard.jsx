import React, { useState, useEffect } from "react";

function Dashboard({ user }) {
  const [gMeetLink, setGMeetLink] = useState("");
  const [jitsiMeetLink, setJitsiLink] = useState("");
  const [date, setDate] = useState("");
  const [isMeetingActive, setIsMeetingActive] = useState(false); // Track meeting status

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    setDate(`${formattedDate} ${formattedTime}`);

    const intervalId = setInterval(() => {
      const updatedDate = new Date();
      const updatedFormattedDate = updatedDate.toLocaleDateString();
      const updatedFormattedTime = updatedDate.toLocaleTimeString();
      setDate(`${updatedFormattedDate} ${updatedFormattedTime}`);
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const handleJoinMeeting = () => {
    if (!isMeetingActive) {
      // Start meeting
      setGMeetLink("https://meet.google.com/wrm-vhag-kdd");
      setJitsiLink("https://meet.jit.si/ReasonableRiversRenderClosely");
    } else {
      // End meeting
      setGMeetLink("");
      setJitsiLink("");
    }

    setIsMeetingActive(!isMeetingActive);
  };

  return (
    <div className="min-h-screen w-full justify-center bg-gray-100">
      <div className="flex justify-between p-8 w-full">
        {/* Left Section: Content aligned to the left */}
        <div className="flex-1 text-left">
          <h2 className="text-2xl font-bold text-gray-700">NOHAAI</h2>
          <p className="mt-4 text-gray-600">Your AI powered interviewer</p>
        </div>
        <div className="flex-1 text-right">
          <h1 className="text-2xl font-bold text-gray-700 inline mr-3">
            Welcome, {user.name}!
          </h1>
          {user.picture && (
            <img
              src={user.picture}
              alt="User Avatar"
              className="w-16 h-16 rounded-full inline"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>{date}</p>
        <button
          onClick={handleJoinMeeting}
          className={`m-4 px-6 py-2 ${
            isMeetingActive
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg`}
        >
          {isMeetingActive ? "End Meeting" : "Start Meeting"}
        </button>
      </div>
      <div className="justify-center mx-auto">
        {gMeetLink && (
          <iframe
            src={gMeetLink}
            height="600"
            width="1000"
            allowFullScreen
            className="mx-auto mb-3"
          />
        )}
        {jitsiMeetLink && (
          <iframe
            src={jitsiMeetLink}
            height="600"
            width="1000"
            allowFullScreen
            className="mx-auto"
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
