import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArticleIcon from "@mui/icons-material/Article";
import DiamondIcon from "@mui/icons-material/Diamond";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import PaidIcon from "@mui/icons-material/Paid";
import { Card, CardContent, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { blue, green, grey, red, yellow } from "@mui/material/colors";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import {
  axisClasses,
  BarChart,
  chartsGridClasses,
  LineChart,
} from "@mui/x-charts";
import { useState } from "react";
import {
  formattedMoney,
  formatTotalDashboardItem,
} from "../utilities/formatter.js";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 550,
  height: 400,
};

const valueFormatter = (value) => `${value} mm`;
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: "Jan",
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: "Feb",
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: "Mar",
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: "Apr",
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: "May",
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: "June",
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: "July",
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: "Aug",
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: "Sept",
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: "Oct",
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: "Nov",
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: "Dec",
  },
];

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const Dashboard = () => {
  const [year, setYear] = useState("seoul");
  const { revenue, appointment, user, valuation } = {
    revenue: {
      total: 1234,
      percent: 3.15,
      status: true,
    },
    user: {
      total: 1234,
      percent: 1.5,
      status: false,
    },
    appointment: {
      total: 1234,
      percent: 1.5,
      status: false,
    },
    valuation: {
      total: 1234,
      percent: 1.5,
      status: false,
    },
  };
  const revenueDataSet = [
    {
      2023: 100,
      2024: 202,
      month: "Jan",
    },
    {
      2023: 1500,
      2024: 2102,
      month: "Feb",
    },
    {
      2023: 200,
      2024: 222,
      month: "Mar",
    },
    {
      2023: 250,
      2024: 232,
      month: "Apr",
    },
    {
      2023: 300,
      2024: 242,
      month: "May",
    },
    {
      2023: 1050,
      2024: 1152,
      month: "June",
    },
    {
      2023: 400,
      2024: 262,
      month: "July",
    },
    {
      2023: 450,
      2024: 272,
      month: "Aug",
    },
    {
      2023: 500,
      2024: 282,
      month: "Sept",
    },
    {
      2023: 550,
      2024: 292,
      month: "Oct",
    },
    {
      2023: 600,
      2024: 302,
      month: "Nov",
    },
    {
      2023: 650,
      2024: 312,
      month: "Dec",
    },
  ];
  const moneyFormatter = (money) => formattedMoney(money);
  const customYAxisFormatter = (value) => {
    if (value >= 1000) {
      return `${value / 1000}k$`;
    }
    return `${value}$`;
  };
  return (
    <>
      <Stack direction="row" spacing={3} justifyContent={"space-between"}>
        <Card sx={{ width: "25%" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box fontSize={12} fontWeight={700} color={grey[500]}>
                  REVENUE
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  {formatTotalDashboardItem(revenue.total)}
                </Box>
              </Box>
              <Box
                width={50}
                height={50}
                position="relative"
                borderRadius="50%"
                bgcolor={green[400]}
              >
                <PaidIcon
                  fontSize="large"
                  sx={{
                    color: "#ffffff",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
            </Stack>
            <Stack direction="row" mt={2}>
              <Typography color={revenue.status ? "green" : "red"} mr={2}>
                {revenue.status ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                {revenue.percent}%
              </Typography>
              <Typography color={grey[600]}>Since last month</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: "25%" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box fontSize={12} fontWeight={700} color={grey[500]}>
                  NEW USERS
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  {formatTotalDashboardItem(user.total)}
                </Box>
              </Box>
              <Box
                width={50}
                height={50}
                position="relative"
                borderRadius="50%"
                bgcolor={red[400]}
              >
                <DonutSmallIcon
                  fontSize="large"
                  sx={{
                    color: "#ffffff",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
            </Stack>
            <Stack direction="row" mt={2}>
              <Typography color={user.status ? "green" : "red"} mr={2}>
                {user.status ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                {user.percent}%
              </Typography>
              <Typography color={grey[600]}>Since last week</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: "25%" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box fontSize={12} fontWeight={700} color={grey[500]}>
                  APPOINTMENTS
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  {formatTotalDashboardItem(appointment.total)}
                </Box>
              </Box>
              <Box
                width={50}
                height={50}
                position="relative"
                borderRadius="50%"
                bgcolor={yellow[800]}
              >
                <ArticleIcon
                  fontSize="large"
                  sx={{
                    color: "#ffffff",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
            </Stack>
            <Stack direction="row" mt={2}>
              <Typography color={appointment.status ? "green" : "red"} mr={2}>
                {appointment.status ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )}{" "}
                {appointment.percent}%
              </Typography>
              <Typography color={grey[600]}>Since last month</Typography>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: "25%" }}>
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Box fontSize={12} fontWeight={700} color={grey[500]}>
                  VALUATIONS
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  {formatTotalDashboardItem(valuation.total)}
                </Box>
              </Box>
              <Box
                width={50}
                height={50}
                position="relative"
                borderRadius="50%"
                bgcolor={blue[400]}
              >
                <DiamondIcon
                  fontSize="large"
                  sx={{
                    color: "#ffffff",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </Box>
            </Stack>
            <Stack direction="row" mt={2}>
              <Typography color={valuation.status ? "green" : "red"} mr={2}>
                {valuation.status ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                {valuation.percent}%
              </Typography>
              <Typography color={grey[600]}>Since last month</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack
        direction="row"
        spacing={3}
        justifyContent={"space-between"}
        mt={3}
      >
        <Paper elevation={2} sx={{ padding: 2, width: "50%" }}>
          <Typography variant="h6">Revenue</Typography>
          <LineChart
            dataset={revenueDataSet}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            yAxis={[{ valueFormatter: customYAxisFormatter }]}
            series={[
              {
                dataKey: "2023",
                label: "2023",
                color: blue[500],
                valueFormatter: moneyFormatter,
              },
              {
                dataKey: "2024",
                label: "2024",
                color: yellow[800],
                valueFormatter: moneyFormatter,
              },
            ]}
            sx={{
              [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translateX(-10px)",
              },
              [`& .${chartsGridClasses.line}`]: {
                strokeDasharray: "5 3",
                strokeWidth: 2,
              },
            }}
            width={532}
            height={400}
          />
        </Paper>
        <Paper elevation={2} sx={{ padding: 2, width: "50%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant={"h6"}>Appointment</Typography>
            <TextField
              id="year"
              select
              size="small"
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              {["seoul", "london"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: year, valueFormatter }]}
            layout="horizontal"
            xAxis={[{ label: "rainfall (mm)" }]}
            width={532}
            height={400}
          />
        </Paper>
      </Stack>

      <Stack direction="row" spacing={3} mt={3}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default Dashboard;
