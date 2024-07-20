import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCustomer } from "../../../services/customers.js";
import {
  createRecord,
  updateRecord,
  useRecords,
} from "../../../services/records.js";
import { useRequest } from "../../../services/requests.js";
import {
  formattedDate,
  formattedDateTime,
} from "../../../utilities/formatter.js";
import { loadImageByPath } from "../../../utilities/imageLoader.js";
import { getDiamondRows } from "../../../utilities/record.js";
import UIBreadCrumb from "../../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../../UI/CircularIndeterminate.jsx";

const RecordScreenCommitment = () => {
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
  const { mutate: createCommitment } = useMutation({
    mutationFn: (body) => {
      return createRecord(body);
    },
    onSuccess: () => {
      toast.success("Create commitment successfully");
      queryClient.invalidateQueries({
        queryKey: ["records", { requestId: requestId }],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Create commitment failed");
    },
  });
  const { mutate: updateCommitment } = useMutation({
    mutationFn: (body) => {
      return updateRecord(body);
    },
    onSuccess: () => {
      toast.success("Update commitment successfully");
      queryClient.invalidateQueries({
        queryKey: ["records", { requestId: requestId }],
      });
    },
  });

  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState(null);

  const getCommitmentContent = (isSigned = false) => {
    let signature = {
      text: "",
      margin: [0, 50],
    };
    const receipt = records?.find((record) => record.type === "RECEIPT");

    if (isSigned) {
      signature = {
        columns: [
          {
            text: [
              {
                text: `Signed by: ${customer?.firstName} ${customer?.lastName}\n`,
              },
              {
                text: `Sign date: ${formattedDateTime(new Date())}\n`,
              },
            ],
            color: "#EE4E4E",
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
                  text: `Commitment #${request.id}\n`,
                  margin: [0, 20],
                  style: "header",
                  alignment: "right",
                },
                {
                  text: `Date: ${formattedDate(new Date())}\n`,
                  fontSize: 12,
                  alignment: "right",
                },
              ],
            },
          ],
        },
        {
          text: "RECEIPT OF DELIVERY - COMMITMENT",
          style: "title",
          alignment: "center",
        },
        {
          text: `- Pursuant to the Sale and Purchase Agreement between the Company and the Customer
- Based on the Order dated ${receipt?.creationDate ? format(new Date(receipt.creationDate), "dd MMM, yyyy") : ""} of the Company`,
          style: "italicText",
        },
        {
          text: `Today, ${format(new Date(), "dd MMM, yyyy")} At H&T Company, We include:`,
          alignment: "left",
          fontSize: 12,
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
          table: {
            headerRows: 1,
            widths: [20, "*", 30, 40, 40, 70, 70, "*"],
            body: getDiamondRows(request),
          },
          layout: "lightHorizontalLines",
          margin: [0, 10, 0, 10],
        },
        {
          text: "The Customer affirms that the Company has delivered the right type and quantity of goods as listed above. Both parties agree to sign this receipt. The document is made in two copies, each party keeps one copy with the same legal value.",
          style: "bodyText",
        },
        {
          text: `Ho Chi Minh City, ${format(new Date(), "dd MMM, yyyy")}`,
          style: "bodyText",
          alignment: "right",
          margin: [0, 10, 0, 0],
        },
        {
          columns: [
            {
              text: "Customer Signature",
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
            {
              text: "Representative Signature",
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
          ],
        },
        signature,
        {
          text: "Note: ",
          style: "subheader",
          margin: [0, 20, 0, 5],
        },
        {
          ul: [
            "Ensure all diamonds are verified and inspected upon return to confirm they match the original descriptions.",
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
        title: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 20],
        },
        header: {
          fontSize: 20,
          bold: true,
          margin: 5,
        },
        italicText: {
          fontSize: 12,
          italics: true,
          alignment: "left",
          margin: [0, 10, 0, 10],
        },
        subheader: {
          fontSize: 15,
          bold: true,
          italics: true,
          color: "#333",
          margin: [0, 20, 0, 0],
        },
        bodyText: {
          fontSize: 12,
          margin: [0, 0, 10, 0],
        },
        para: {
          fontSize: 12,
          bold: false,
          color: "#333",
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
    };
  };

  useEffect(() => {
    const commitment = records?.find((record) => record.type === "COMMITMENT");
    if (commitment) {
      setUrl(commitment.link);
    }
  }, [records]);

  const handleDownload = () => {
    const doc = getCommitmentContent();
    pdfMake.createPdf(doc).download(`commitment-${requestId}.pdf`);
  };
  const handleCreateCommitment = () => {
    const doc = getCommitmentContent();
    pdfMake.createPdf(doc).getDataUrl((url) => {
      const body = {
        link: url,
        status: false,
        type: "COMMITMENT",
        valuationRequestId: requestId,
      };
      createCommitment(body);
    });
  };

  useEffect(() => {
    loadImageByPath("images/logo.png", setLogo);
  }, [logo]);

  /*
  useEffect(() => {
    const commitment = records?.find((record) => record.type === "COMMITMENT");
    if (request?.payment.length === 4 && commitment) {
      setIsSigned(true);
      const doc = getCommitmentContent(request.payment[2]);
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...commitment,
          link: url,
          status: true,
        };
        updateCommitment(body);
      });
    }
  }, [request?.payment[2]]);
  */
  if (isCustomerLoading || isRequestLoading || isRecordFetching) {
    return <UICircularIndeterminate />;
  }

  function handleRefreshCommitment() {
    const returned = records?.find((record) => record.type === "COMMITMENT");
    if (returned) {
      const doc = getCommitmentContent();
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...returned,
          link: url,
        };
        updateCommitment(body);
      });
    }
  }

  function handleSignCommitment() {
    const returned = records?.find((record) => record.type === "COMMITMENT");
    if (returned) {
      const doc = getCommitmentContent(true);
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...returned,
          status: true,
          link: url,
        };
        updateCommitment(body);
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
        <Typography variant="h4">Returned Record</Typography>

        {!isSigned && (
          <Button variant={"contained"} onClick={handleSignCommitment}>
            Sign Commitment
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
              onClick={handleCreateCommitment}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="Save"
              color="status.processing"
              onClick={handleRefreshCommitment}
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

export default RecordScreenCommitment;
