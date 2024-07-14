import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArticleIcon from "@mui/icons-material/Article";
import DiamondIcon from "@mui/icons-material/Diamond";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import PaidIcon from "@mui/icons-material/Paid";
import { Card, CardContent, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
  useAppointments,
  useOverral,
  useRevenue,
  useTopFiveConsultants,
  useTopFiveValuations,
} from "../services/dashboard.js";
import {
  dataMapping,
  dataSeriesMapping,
  yearFilter,
} from "../utilities/dashboard.js";
import {
  formattedMoney,
  formattedPercent,
  formatTotalDashboardItem,
} from "../utilities/formatter.js";
import UICircularIndeterminate from "./UI/CircularIndeterminate.jsx";

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
  const { data: overral, isLoading: isOverralLoading } = useOverral();
  const { revenue, appointment, user, valuation } = {
    revenue: {
      total: formattedMoney(+overral?.revenue.total),
      percent: formattedPercent(overral?.revenue.percent),
      status: overral?.revenue.status === "true",
    },
    user: {
      total: 12,
      percent: 1.5,
      status: false,
    },
    appointment: {
      total: overral?.appointment.total,
      percent: formattedPercent(overral?.appointment.percent),
      status: overral?.appointment.status === "true",
    },
    valuation: {
      total: overral?.valuation.total,
      percent: formattedPercent(overral?.valuation.percent),
      status: overral?.valuation.status === "true",
    },
  };

  const { data: revenueChart, isLoading: isRevenueChartLoading } = useRevenue();
  const revenueDataSet = dataMapping(revenueChart);

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const { data: appointmentChart, isLoading: isAppointmentChartLoading } =
    useAppointments();

  const { data: topConsultant, isLoading: isTopConsultantLoading } =
    useTopFiveConsultants();
  const { data: topValuation, isLoading: isTopValuationLoading } =
    useTopFiveValuations();

  const customYAxisFormatter = (value) => {
    if (value >= 1000) {
      return `${value / 1000}k$`;
    }
    return `${value}$`;
  };

  const getCurrentDateFormatted = () => {
    const date = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };
  if (
    isOverralLoading ||
    isRevenueChartLoading ||
    isAppointmentChartLoading ||
    isTopConsultantLoading ||
    isTopValuationLoading
  ) {
    return <UICircularIndeterminate />;
  }

  return (
    <>
      <Stack direction="row" spacing={3} justifyContent={"space-between"}>
        {isOverralLoading ? (
          <UICircularIndeterminate />
        ) : (
          <>
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
                    {revenue.status ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )}{" "}
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
                      {formatTotalDashboardItem(user?.total)}
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
                  <Typography color={user?.status ? "green" : "red"} mr={2}>
                    {user?.status ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}{" "}
                    {user?.percent}%
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
                  <Typography
                    color={appointment.status ? "green" : "red"}
                    mr={2}
                  >
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
                    {valuation.status ? (
                      <ArrowUpwardIcon />
                    ) : (
                      <ArrowDownwardIcon />
                    )}{" "}
                    {valuation.percent}%
                  </Typography>
                  <Typography color={grey[600]}>Since last month</Typography>
                </Stack>
              </CardContent>
            </Card>
          </>
        )}
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
            series={dataSeriesMapping(revenueChart)}
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
              {yearFilter(appointmentChart).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <BarChart
            dataset={dataMapping(appointmentChart)}
            yAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: year }]}
            layout="horizontal"
            xAxis={[{ label: "Number of appointments" }]}
            width={532}
            height={400}
          />
        </Paper>
      </Stack>

      <Stack direction="row" spacing={3} mt={3} width={"100%"}>
        <Box component={Paper} p={2} width="50%">
          <Typography variant="h6" fontSize={20} fontWeight="700" ml={2}>
            Top 5 Consultants of month {getCurrentDateFormatted()}
          </Typography>
          <TableContainer>
            <Table aria-label="consultant table">
              <TableHead>
                <TableRow>
                  <TableCell>Consultant</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="right">Reqs</TableCell>
                  <TableCell align="right">Sale</TableCell>
                  <TableCell align="center">Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topConsultant.map((row, index) => (
                  <TableRow
                    key={row.staffPhone}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ mr: 1 }}>{row.avatar}</Avatar>
                      {row.staffName}
                    </TableCell>
                    <TableCell align="left">{row.staffPhone}</TableCell>
                    <TableCell align="right">{row.totalAppointments}</TableCell>
                    <TableCell align="right">
                      {formattedMoney(row.totalServicePrice)}
                    </TableCell>
                    <TableCell align="center">Top {index + 1}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box component={Paper} p={2} width="50%">
          <Typography variant="h6" fontSize={20} fontWeight="700" ml={2}>
            Top 5 Valuations of month {getCurrentDateFormatted()}
          </Typography>
          <TableContainer>
            <Table aria-label="valuation table">
              <TableHead>
                <TableRow>
                  <TableCell>Valuation</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="right">Vals</TableCell>
                  <TableCell align="right">Chosen</TableCell>
                  <TableCell align="center">Rank</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topValuation.map((row, index) => (
                  <TableRow
                    key={row.staffPhone}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Avatar sx={{ mr: 1 }}>{row.avatar}</Avatar>
                      {row.staffName}
                    </TableCell>
                    <TableCell align="left">{row.staffPhone}</TableCell>
                    <TableCell align="right">{row.totalValuation}</TableCell>
                    <TableCell align="right">{row.valuationCount}</TableCell>
                    <TableCell align="center">Top {index + 1}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </>
  );
};

export default Dashboard;
