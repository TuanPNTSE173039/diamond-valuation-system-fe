import Typography from "@mui/material/Typography";
import bruise from "../assets/images/clarity-characteristic/bruise.png";
import cavity from "../assets/images/clarity-characteristic/cavity.png";
import chip from "../assets/images/clarity-characteristic/chip.png";
import cloud from "../assets/images/clarity-characteristic/cloud.png";
import crystal from "../assets/images/clarity-characteristic/crystal.png";
import etchChannel from "../assets/images/clarity-characteristic/etch_channel.png";
import feather from "../assets/images/clarity-characteristic/feather.png";
import indentedNatual from "../assets/images/clarity-characteristic/indented_natural.png";
import knot from "../assets/images/clarity-characteristic/knot.png";
import laserDrillHole from "../assets/images/clarity-characteristic/laser_drill_hole.png";
import natural from "../assets/images/clarity-characteristic/natural.png";
import needle from "../assets/images/clarity-characteristic/needle.png";
import pinpoint from "../assets/images/clarity-characteristic/pinpoint.png";
import twinningWisp from "../assets/images/clarity-characteristic/twining_wisp.png";
import Role from "./Role.js";

export const diamondAttribute = {
  origin: [
    {
      label: "Natural",
      value: "NATURAL",
    },
    {
      label: "Lab grown",
      value: "LAB_GROWN",
    },
    null,
  ],
  color: [
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ].map((color) => ({
    label: color,
    value: color,
  })),
  clarity: [
    "VS2",
    "VS1",
    "FL",
    "VVS1",
    "VVS2",
    "I1",
    "I2",
    "SI1",
    "I3",
    "IF",
    "SI2",
  ].map((clarity) => ({
    label: clarity,
    value: clarity,
  })),
  cut: ["FAIR", "GOOD", "EXCELLENT", "VERY_GOOD"].map((cut) => ({
    label: cut,
    value: cut,
  })),
  shape: [
    "PRINCESS",
    "HEART",
    "CUSHION",
    "EMERALD",
    "MARQUISE",
    "PEAR",
    "ROUND",
    "OVAL",
    "RADIANT",
    "ASSCHER",
  ].map((shape) => ({
    label: shape,
    value: shape,
  })),
  symmetry: ["FAIR", "GOOD", "EXCELLENT", "VERY_GOOD"].map((symmetry) => ({
    label: symmetry,
    value: symmetry,
  })),
  polish: ["FAIR", "GOOD", "EXCELLENT", "VERY_GOOD"].map((polish) => ({
    label: polish,
    value: polish,
  })),
  fluorescence: ["MEDIUM", "NONE", "VERY_STRONG", "FAINT", "STRONG"].map(
    (fluorescence) => ({
      label: fluorescence,
      value: fluorescence,
    }),
  ),
};
export const valuationRequestStatus = [
  {
    id: 0,
    name: "ALL",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 1,
    name: "PENDING",
    roles: [Role.MANAGER],
  },
  {
    id: 2,
    name: "PROCESSING",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 3,
    name: "RECEIVED",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 4,
    name: "VALUATING",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 5,
    name: "COMPLETED",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 6,
    name: "SEALED",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 7,
    name: "CANCELLED",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
  {
    id: 8,
    name: "FINISHED",
    roles: [Role.MANAGER, Role.CONSULTANT],
  },
];
export const diamondValuationStatus = [
  {
    id: 0,
    name: "All",
  },
  {
    id: 1,
    name: "PENDING",
  },
  {
    id: 2,
    name: "ASSESSING",
  },
  {
    id: 3,
    name: "ASSESSED",
  },
  {
    id: 4,
    name: "VALUATING",
  },
  {
    id: 5,
    name: "VALUATED",
  },
  {
    id: 6,
    name: "APPROVED",
  },
];
export const clarityCharacteristicList = [
  {
    code: "LASER_DRILL_HOLE",
    label: "Laser Drill Hole",
    image: laserDrillHole,
  },
  {
    code: "INDENTED_NATURAL",
    label: "Indented Natural",
    image: indentedNatual,
  },
  {
    code: "TWINNING_WISP",
    label: "Twinning Wisp",
    image: twinningWisp,
  },
  {
    code: "ETCH_CHANNEL",
    label: "Etch Channel",
    image: etchChannel,
  },
  {
    code: "CRYSTAL",
    label: "Crystal",
    image: crystal,
  },
  {
    code: "NEEDLE",
    label: "Needle",
    image: needle,
  },
  {
    code: "PINPOINT",
    label: "Pinpoint",
    image: pinpoint,
  },
  {
    code: "CLOUD",
    label: "Cloud",
    image: cloud,
  },
  {
    code: "KNOT",
    label: "Knot",
    image: knot,
  },
  {
    code: "FEATHER",
    label: "Feather",
    image: feather,
  },
  {
    code: "CHIP",
    label: "Chip",
    image: chip,
  },
  {
    code: "CAVITY",
    label: "Cavity",
    image: cavity,
  },
  {
    code: "BRUISE",
    label: "Bruise",
    image: bruise,
  },
  {
    code: "NATURAL",
    label: "Natural",
    image: natural,
  },
];

export const clarityCharacteristicConverter = (characteristic) => {
  return characteristic.map((item) => {
    return clarityCharacteristicList.find((clarity) => clarity.code === item);
  });
};

export const statusConverter = (status) => {
  switch (status) {
    case "PENDING":
      return (
        <Typography sx={{ backgroundColor: "primary.main" }}>
          Pending
        </Typography>
      );
    case "PROCESSING":
      return "PROCESSING";
    case "RECEIVED":
      return "RECEIVED";
    case "COMPLETED":
      return "COMPLETED";
    case "SEALED":
      return "SEALED";
    case "CANCEL":
      return "CANCELLED";
    case "FINISHED":
      return "FINISHED";
    case "VALUATING":
      return "VALUATING";
  }
};
export const getPreviousStatus = (currentStatus) => {
  switch (currentStatus) {
    case "PENDING":
      return "PENDING";
    case "ASSESSING":
      return "PENDING";
    case "ASSESSED":
      return "ASSESSING";
    case "VALUATING":
      return "ASSESSED";
    case "VALUATED":
      return "VALUATING";
    case "APPROVED":
      return "APPROVED";
  }
};
