import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../../store/index.js";
import UIAutocomplete from "../UI/Autocomplete.jsx";
import UIModal from "../UI/UIModal.jsx";

const AssignmentConsultant = () => {
  const userProgress = useSelector((state) => state.userProgress);
  const dispatch = useDispatch();

  return (
    <UIModal open={userProgress.userProgress === "AssignConsultant"}>
      <Box>
        <UIAutocomplete />
      </Box>
      <Box>
        <Button
          onClick={() => dispatch(userProgressActions.hideConsultantAssign())}
          variant="text"
        >
          Cancel
        </Button>
        <Button variant="contained">Save</Button>
      </Box>
    </UIModal>
  );
};

export default AssignmentConsultant;
