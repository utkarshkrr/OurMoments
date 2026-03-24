import React, { useEffect, useState } from "react";
import { Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const history = useHistory();

  const dateF = new Date(process.env.REACT_APP_DATEF);
  const dateR = new Date(process.env.REACT_APP_DATER);

  const [TextF, setTextF] = useState("");
  const [TextR, setTextR] = useState("");

  const [expand, setExpand] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const calculateDuration = (startDate) => {
    const now = new Date();

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  const formatDuration = ({ years, months, days }) => {
    let parts = [];

    if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
    if (days > 0) parts.push(`and ${days} day${days > 1 ? "s" : ""}`);

    if (parts.length === 0) return "0 days";

    return parts.join(" ");
  };

  useEffect(() => {
    const f = calculateDuration(dateF);
    const r = calculateDuration(dateR);

    setTextF(`${f.years} years of friendship`);
    setTextR(`Together for ${formatDuration(r)} with forever to go`);
  }, [dateF, dateR]); // ✅ FIXED

  const handleClick = (e) => {
    setPos({ x: e.clientX, y: e.clientY });
    setExpand(true);

    setTimeout(() => {
      history.push("/posts");
    }, 500);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Allura&family=Poppins:wght@300;400;500;600&display=swap');

          .bg {
            font-family: 'Poppins', sans-serif;
            position: relative;
            overflow: hidden;
            background: linear-gradient(135deg, #f5e6d360, #e6ccb260, #d2b48c5b);
          }

          .bg::before, .bg::after {
            content: "";
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.6;
          }

          .bg::before {
            background: #ffcf9d;
            top: -150px;
            left: -150px;
            animation: float1 10s ease-in-out infinite;
          }

          .bg::after {
            background: #c89a6a;
            bottom: -150px;
            right: -150px;
            animation: float2 12s ease-in-out infinite;
          }

          @keyframes float1 {
            0%,100% { transform: translate(0,0); }
            50% { transform: translate(120px,80px); }
          }

          @keyframes float2 {
            0%,100% { transform: translate(0,0); }
            50% { transform: translate(-120px,-80px); }
          }

          .content {
            animation: fadeIn 1.2s ease;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .btn {
            font-family: 'Poppins', sans-serif !important;
            transition: all 0.3s ease;
          }

          .btn:hover {
            transform: scale(1.02);
            box-shadow: 0 0 20px rgba(140,104,65,0.5);
            background-color: #fa003ed2 !important;
          }

          .expand-circle {
            position: fixed;
            width: max(100vw, 100vh);
            height: max(100vw, 100vh);
            background: #FA003F;
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            z-index: 999;
            animation: expandAnim 0.8s forwards;
          }

          @keyframes expandAnim {
            to {
              transform: translate(-50%, -50%) scale(2);
            }
          }
        `}
      </style>

      {expand && (
        <div
          className="expand-circle"
          style={{
            left: pos.x,
            top: pos.y,
          }}
        />
      )}

      <div
        className="bg"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 15px",
          textAlign: "center",
        }}
      >
        <div
          className="content"
          style={{
            maxWidth: "1200px",
            width: "100%",
            zIndex: 1,
            marginTop: "30px",
          }}
        >
          
          <Typography
            style={{
              fontFamily: "'Allura', cursive",
              color: "#3e2a1ae0",
              lineHeight: 1.8,
              marginTop: "60px",
              fontSize: "clamp(1.6rem, 2.5vw, 1.75rem)",
              textShadow: "0 0px 10px rgb(255, 244, 129)",
              padding: "0 10px",
            }}
          >
            Some moments are too special to be lost in time. The quiet meets, the surprises, the hugs, laughs, the walks, the random late-night talks, the little things are the ones that mean everything.  
            <br />
            This is for us, this space is ours. A place where memories don’t fade, where every photo, every word, every feeling stays alive just the way we felt it.  
            <br />
            No matter where life takes us, hopefully this will always be a reminder of us. A reminder of what we’ve shared, what we’ve built, and everything that still lies ahead.
            <br />❤️
          </Typography>

          <Typography
            style={{
              fontFamily: "'Allura', cursive",
              color: "#885f00",
              marginBottom: "6px",
              fontSize: "1.9rem",
              fontWeight: "700",
              textShadow: "0 0px 10px rgb(255, 244, 129)",
              opacity: 0.85,
            }}
          >
            {TextF}
          </Typography>

          <Typography
            style={{
              fontFamily: "'Allura', cursive",
              color: "#FA003F",
              marginBottom: "25px",
              fontSize: "2rem",
              fontWeight: "700",
              textShadow: "0 0px 10px #ff5a83",
              opacity: 0.85,
            }}
          >
            {TextR}
          </Typography>

          <Button
            className="btn"
            variant="contained"
            onClick={handleClick}
            style={{
              backgroundColor: "#885f00cd",
              color: "#fff",
              padding: "12px 32px",
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1rem",
              marginBottom: "10px",
            }}
          >
            Enter our moments
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;