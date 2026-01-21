import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import useAuthContext from "../hooks/UseAuthContext";
import "./css/dashboard.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

export default function DashboardPage() {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user || !user.user) {
    return (
      <div className="page">
        <Navigation />
        <div className="dashboard">
          <div className="dashboard-loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const labels = [];
  for (let index = 0; index < 30; index++) {
    const d = new Date();
    d.setDate(d.getDate() - (29 - index));
    labels.push(d.toISOString().split("T")[0]);
  }

  const creditsByDate = {};
  if (user.recentActivity) {
    user.recentActivity.forEach((item) => {
      const date = item.timestamp.split("T")[0];
      if (!creditsByDate[date]) {
        creditsByDate[date] = 0;
      }
      creditsByDate[date] += item.creditsEarned || 0;
    });
  }

  const lineDataValues = labels.map((date) => creditsByDate[date] || 0);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
        text: "Credit progress (Last 30 days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Credits",
        },
      },
      x: {
        title: {
          display: false,
          text: "Date",
        },
      },
    },
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: "Credits",
        data: lineDataValues,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Statisztikák",
      },
    },
  };

  const doughnutData = {
    labels: ["Completed chapters", "Enrolled Courses"],
    datasets: [
      {
        label: "Stats",
        data: [user.stats.completedChapters, user.stats.enrolledCourses],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="page">
      <Navigation />
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Üdv, {user.user.name}!</h1>
            <p className="dashboard-subtitle">
              Jó látni újra az irányítópulton.
            </p>
          </div>
          <div className="dashboard-credit">
            <span>Aktuális kreditek</span>
            <strong>{user.user.creditBalance}</strong>
          </div>
        </div>

        <div className="dashboard-quick-links">
          <Link to="/courses" className="dashboard-link">
            Kurzuskatalógus
          </Link>
          <Link to="/mentors" className="dashboard-link">
            Mentor foglalás
          </Link>
        </div>

        <div className="dashboard-stats">
          <div className="dashboard-stat">
            <span>Beiratkozott kurzusok</span>
            <strong>{user.stats.enrolledCourses}</strong>
          </div>
          <div className="dashboard-stat">
            <span>Teljesített fejezetek</span>
            <strong>{user.stats.completedChapters}</strong>
          </div>
          <div className="dashboard-stat">
            <span>Összes megszerzett kredit</span>
            <strong>{user.stats.totalCreditsEarned}</strong>
          </div>
          <div className="dashboard-stat">
            <span>Közelgő foglalások</span>
            <strong>{user.stats.upcomingBookings}</strong>
          </div>
        </div>

        <div className="dashboard-charts">
          <div className="dashboard-chart">
            <Line options={lineOptions} data={lineData} />
          </div>
          <div className="dashboard-chart">
            <Doughnut options={doughnutOptions} data={doughnutData} />
          </div>
        </div>
      </div>
    </div>
  );
}
