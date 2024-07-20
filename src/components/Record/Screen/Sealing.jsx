import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateValuationRequest } from "../../../services/api.js";
import { useCustomer } from "../../../services/customers.js";
import {
  createRecord,
  updateRecord,
  useRecords,
} from "../../../services/records.js";
import { useRequest } from "../../../services/requests.js";
import { formattedDateTime } from "../../../utilities/formatter.js";
import { loadImageByPath } from "../../../utilities/imageLoader.js";
import { getDiamondRows } from "../../../utilities/record.js";
import UIBreadCrumb from "../../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../../UI/CircularIndeterminate.jsx";

const RecordScreenSealing = () => {
  const { requestId } = useParams();
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const [isSigned, setIsSigned] = useState(false);

  const { data: records, isFetching: isRecordFetching } = useRecords(requestId);
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { data: customer, isLoading: isCustomerLoading } = useCustomer(
    request?.customerID,
  );

  const queryClient = useQueryClient();
  const { mutate: createSealing } = useMutation({
    mutationFn: (body) => {
      return createRecord(body);
    },
    onSuccess: () => {
      toast.success("Create sealing successfully");
      queryClient.invalidateQueries({
        queryKey: ["records", { requestId: requestId }],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Create return failed");
    },
  });
  const { mutate: updateRequest } = useMutation({
    mutationFn: (body) => {
      return updateValuationRequest(requestId, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests", { requestId: requestId }],
      });
    },
  });

  const { mutate: updateSealing } = useMutation({
    mutationFn: (body) => {
      return updateRecord(body);
    },
    onSuccess: (body) => {
      if (!body.status) toast.success("Update sealing successfully");
      else {
        toast.success("Sign sealing successfully");
        updateRequest({
          ...request,
          status: "SEALED",
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["records", { requestId: requestId }],
      });
    },
  });

  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState(null);

  const getSealingContent = (isSigned = false) => {
    let signature = {
      text: "",
      margin: [0, 50],
    };
    if (isSigned) {
      signature = {
        columns: [
          {
            text: "",
            width: "50%",
            alignment: "left",
          },
          {
            text: [
              {
                text: `Signed by: H&T Diamond Representative\n`,
              },
              {
                text: `Sign date: ${formattedDateTime(new Date())}\n`,
              },
            ],
            color: "#EE4E4E",
            width: "50%",
            alignment: "left",
          },
        ],
        margin: [0, 20, 0, 0],
      };
    }
    return {
      content: [
        {
          columns: [
            {
              image: "logo",
              width: 53,
              height: 40,
            },
            {
              text: "H&T Diamond",
              margin: [0, 10],
              fontSize: 18,
              color: "#1474b1",
            },
            {
              width: "*",
              text: [
                {
                  text: "Sealing Record\n",
                  margin: [0, 20],
                  style: "header",
                  alignment: "right",
                },
                {
                  text: `Appointment: #${requestId}\n`,
                  fontSize: 12,
                  alignment: "right",
                },
                {
                  text: `Date: ${formattedDateTime(new Date())}\n`,
                  fontSize: 12,
                  alignment: "right",
                },
              ],
            },
          ],
          columnGap: 10,
        },
        {
          columns: [
            {
              //customer infor
              text: "Customer Information\n",
              width: "50%",
              style: "subheader",
            },
            {
              //company infor
              text: "Company Information",
              width: "50%",
              style: "subheader",
            },
          ],
          margin: [0, 20, 0, 5],
        },
        {
          columns: [
            {
              text: [
                {
                  text: `Name: ${customer?.firstName} ${customer?.lastName}\n`,
                  style: "para",
                },
                {
                  text: `Phone: ${customer?.phone}\n`,
                  style: "para",
                },
                {
                  text: `Email: ${customer?.account?.email}\n`,
                  style: "para",
                },
                {
                  text: `Address: ${customer?.address}\n`,
                  style: "para",
                },
              ],
            },
            {
              text: [
                {
                  text: "Representative: Dat Nguyen\n",
                  style: "para",
                },
                {
                  text: "Phone: 0367304353\n",
                  style: "para",
                },
                {
                  text: "Email: datnguyen123@gmail.com\n",
                  style: "para",
                },
                {
                  text: "Address: Binh Thanh, HCM City\n",
                  style: "para",
                },
              ],
            },
          ],
        },
        {
          text: "Diamond Information",
          style: "subheader",
          margin: [0, 20, 0, 5],
        },
        {
          layout: "receiptLayout", // optional
          table: {
            headerRows: 1,
            widths: [20, "*", 30, 40, 40, 70, 70, "*"],
            body: getDiamondRows(request),
          },
        },
        {
          text: "Confirmation Reason",
          style: "subheader",
          margin: [0, 20, 0, 0],
        },
        {
          text: [
            {
              text: "The diamonds listed above have been sealed due to the customer not retrieving them within 24 hours after the scheduled return date. Efforts to contact the customer have been unsuccessful, and the diamonds are being securely stored until the customer reclaims them.",
              alignment: "justify",
            },
          ],
          margin: [0, 7, 0, 0],
        },
        {
          text: "Company Confirmation",
          style: "subheader",
          margin: [0, 20, 0, 0],
        },
        {
          text: [
            {
              text: "We, H&T Diamond Company, confirm that the above-listed diamonds have been securely sealed and stored due to the customer's failure to retrieve them within the specified time frame.",
              alignment: "justify",
            },
          ],
          margin: [0, 7, 0, 0],
        },
        {
          columns: [
            {
              text: "",
              width: "50%",
              alignment: "center",
            },
            {
              text: [
                {
                  text: "Representative Signature\n",
                },
              ],
              width: "50%",
              alignment: "center",
            },
          ],
          margin: [0, 20, 0, 0],
        },
        signature,
        {
          text: "Note: ",
          style: "subheader",
          margin: [0, 20, 0, 5],
        },
        {
          ul: [
            "The customer is advised to contact us at the earliest convenience to reclaim their diamonds.",
            "For any inquiries, please contact 0367304351 or hntdiamond@gmai.com.",
          ],
          margin: [0, 0, 0, 20],
        },
      ],
      header: function (currentPage, pageCount, pageSize) {
        return [
          {
            text: currentPage.toString() + " of " + pageCount,
            alignment: "right",
            margin: [0, 10, 20, 0],
          },
          {
            canvas: [
              { type: "rect", x: 170, y: 32, w: pageSize.width - 170, h: 40 },
            ],
          },
        ];
      },
      footer: [
        {
          text: "Thank you for choosing H&T Diamond",
          alignment: "center",
        },
      ],
      images: {
        logo: `${logo}`,
      },
      defaultStyle: {
        fontSize: 12,
        bold: false,
      },
      styles: {
        thead: {
          fontSize: 13,
          bold: true,
        },
        header: {
          fontSize: 20,
          bold: true,
          margin: 5,
        },
        subheader: {
          fontSize: 15,
          bold: true,
          italics: true,
          color: "#333",
          margin: [0, 20, 0, 0],
        },
        para: {
          fontSize: 12,
          bold: false,
          color: "#333",
        },
        number: {
          color: "#333",
          alignment: "right",
        },
      },
    };
  };

  useEffect(() => {
    const sealing = records?.find((record) => record.type === "SEALING");
    if (sealing) {
      setUrl(sealing.link);
    }
  }, [records]);

  const handleDownload = () => {
    const doc = getSealingContent();
    pdfMake.createPdf(doc).download(`sealing-${requestId}.pdf`);
  };
  const handleCreateSealing = () => {
    const doc = getSealingContent();
    pdfMake.createPdf(doc).getDataUrl((url) => {
      const body = {
        link: url,
        status: false,
        type: "SEALING",
        valuationRequestId: requestId,
      };
      createSealing(body);
    });
  };

  useEffect(() => {
    loadImageByPath("images/logo.png", setLogo);
  }, [logo]);

  useEffect(() => {
    const sealing = records?.find((record) => record.type === "SEALING");
    if (sealing?.status) {
      setIsSigned(true);
    }
  }, []);

  if (isCustomerLoading || isRequestLoading || isRecordFetching) {
    return <UICircularIndeterminate />;
  }

  function handleRefreshSealing() {
    const returned = records?.find((record) => record.type === "SEALING");
    if (returned) {
      const doc = getSealingContent();
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...returned,
          link: url,
        };
        updateSealing(body);
      });
    }
  }

  function handleSignSealing() {
    const returned = records?.find((record) => record.type === "SEALING");
    if (returned) {
      const doc = getSealingContent(true);
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...returned,
          status: true,
          link: url,
        };
        updateSealing(body);
        setIsSigned(true);
      });
    }
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <UIBreadCrumb pathNames={pathNames} />
        <Typography variant="h4">Sealing Record</Typography>

        {!isSigned && (
          <Button variant={"contained"} onClick={handleSignSealing}>
            Sign Sealing
          </Button>
        )}
      </Box>
      <Stack direction={"row"} spacing={1}>
        <IconButton
          aria-label="Download"
          color="primary"
          onClick={handleDownload}
        >
          <DownloadIcon />
        </IconButton>
        {!isSigned && (
          <>
            <IconButton
              aria-label="Save"
              color="secondary"
              onClick={handleCreateSealing}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="Save"
              color="status.processing"
              onClick={handleRefreshSealing}
            >
              <LoopIcon />
            </IconButton>
          </>
        )}
      </Stack>
      <br />
      {url && (
        <Box sx={{ w: "90%", margin: "0 auto" }}>
          <iframe src={url} style={{ width: "100%", height: "90vh" }} />
        </Box>
      )}
      {!url && isRecordFetching && <UICircularIndeterminate />}
    </Box>
  );
};

export default RecordScreenSealing;
