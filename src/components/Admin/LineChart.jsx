import { useTheme } from "@mui/material/styles";
import React from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartDashboard = ({ lineChartData }) => {
  const theme = useTheme();

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={lineChartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Orders
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />

          <Line
            stroke="#D50000"
            isAnimationActive={false}
            type="monotone"
            dataKey="Number Of Courier Orders"
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LineChartDashboard;
