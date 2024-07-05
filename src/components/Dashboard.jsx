import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import { grey, red } from "@mui/material/colors";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { BarChart, LineChart } from "@mui/x-charts";

const chartSetting = {
  xAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}mm`;
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
                  NEW USER
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  1,024
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
              <Typography color="green" mr={2}>
                <ArrowUpwardIcon /> 3.48%
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
                  NEW USER
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  1,024
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
              <Typography color="green" mr={2}>
                <ArrowUpwardIcon /> 3.48%
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
                  NEW USER
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  1,024
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
              <Typography color="green" mr={2}>
                <ArrowUpwardIcon /> 3.48%
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
                  NEW USER
                </Box>
                <Box fontSize={24} lineHeight={1.2} fontWeight={700}>
                  1,024
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
              <Typography color="green" mr={2}>
                <ArrowUpwardIcon /> 3.48%
              </Typography>
              <Typography color={grey[600]}>Since last month</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction="row" spacing={3} justifyContent={"space-between"}>
        <Box>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={400}
          />
        </Box>
        <Box>
          <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "seoul", label: "Seoul rainfall", valueFormatter },
            ]}
            layout="horizontal"
            {...chartSetting}
          />
        </Box>
      </Stack>

      <Stack direction="row" spacing={3}>
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
