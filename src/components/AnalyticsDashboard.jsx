import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Importing data directly from the JSON files
// Ensure these files exist in src/data/ as described in README.json
import metricsData from "../data/metrics.json";
import transactionsData from "../data/transactions.json";

const AnalyticsDashboard = () => {
  // 1. Data Processing for Transactions
  // We need to aggregate the raw list of transactions into groups for the chart
  const transactionStats = useMemo(() => {
    const stats = {};

    transactionsData.forEach((txn) => {
      // Assuming transactions have a 'status' field (e.g., 'completed', 'pending')
      const status = txn.status || "unknown";
      if (!stats[status]) {
        stats[status] = { name: status, count: 0, totalAmount: 0 };
      }
      stats[status].count += 1;
      // Assuming transactions have an 'amount' field
      stats[status].totalAmount += txn.amount || 0;
    });

    return Object.values(stats);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Analytics</h1>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        {/* Chart 1: Time Series from metrics.json */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Revenue & Traffic Over Time</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metricsData.series}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                {/* Assuming metrics.json has 'date' or 'month' field */}
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                {/* Assuming metrics.json has 'revenue' and 'activeUsers' fields */}
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            Source: src/data/metrics.json
          </p>
        </div>

        {/* Chart 2: Aggregated Data from transactions.json */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h3>Transactions by Status</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={transactionStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Transaction Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>
            Source: src/data/transactions.json (Aggregated)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
