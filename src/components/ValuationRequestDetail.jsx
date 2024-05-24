import CustomBreadCrumb from "./common/BreadCrumb.jsx";
import { useParams } from "react-router-dom";

export default function ValuationRequestDetail() {
  const param = useParams();
  return (
    <div>
      <CustomBreadCrumb level={param.id} />
    </div>
  );
}
