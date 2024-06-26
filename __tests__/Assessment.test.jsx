import { fireEvent, render } from "@testing-library/react";
import DiamondValuationAssessment from "../src/components/Valuation/Assessment.jsx";

test("Cut Score field should accept numbers between 0 and 10", () => {
  const { getByLabelText } = render(<DiamondValuationAssessment />);
  const cutScoreField = getByLabelText("Cut Score");

  // Test with a valid value
  fireEvent.change(cutScoreField, { target: { value: "5" } });
  expect(cutScoreField.value).toBe("5");

  // Test with a value less than 0
  fireEvent.change(cutScoreField, { target: { value: "-1" } });
  expect(cutScoreField.value).not.toBe("-1");

  // Test with a value greater than 10
  fireEvent.change(cutScoreField, { target: { value: "11" } });
  expect(cutScoreField.value).not.toBe("11");
});
