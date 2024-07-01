import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const count = useSelector((state) => state.counter.value);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        {/*<Button*/}
        {/*  aria-label="Increment value"*/}
        {/*  onClick={() => dispatch(increment())}*/}
        {/*>*/}
        {/*  Increment*/}
        {/*</Button>*/}
        {/*<Typography component="div" variant="h1">*/}
        {/*  {count}*/}
        {/*</Typography>*/}
        {/*<Button*/}
        {/*  aria-label="Decrement value"*/}
        {/*  onClick={() => dispatch(decrement())}*/}
        {/*>*/}
        {/*  Decrement*/}
        {/*</Button>*/}
        {/*<Button onClick={() => dispatch(incrementByAmount({ amount: 4 }))}>*/}
        {/*  Increment by 4*/}
        {/*</Button>*/}
        {/*<Button variant={"contained"} onClick={() => dispatch(clearCounter())}>*/}
        {/*  Clear state*/}
        {/*</Button>*/}
        Dashboard
      </div>
    </div>
  );
};

export default Dashboard;
