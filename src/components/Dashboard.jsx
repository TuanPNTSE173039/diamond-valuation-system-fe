import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCounter,
  decrement,
  increment,
  incrementByAmount,
} from "../redux/counter/counterSlice.js";

const Dashboard = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Typography component="div" variant="h1">
          {count}
        </Typography>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button onClick={() => dispatch(incrementByAmount({ amount: 4 }))}>
          Increment by 4
        </Button>
        <Button variant={"contained"} onClick={() => dispatch(clearCounter())}>
          Clear state
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
