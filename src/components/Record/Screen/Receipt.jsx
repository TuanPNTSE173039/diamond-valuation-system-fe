import DownloadIcon from "@mui/icons-material/Download";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { postPayment, updateValuationRequest } from "../../../services/api.js";
import { useCustomer } from "../../../services/customers.js";
import { useRequest } from "../../../services/requests.js";
import {
  formattedDate,
  formattedDateTime,
  formattedMoney,
} from "../../../utilities/formatter.js";
import { loadImageByPath } from "../../../utilities/imageLoader.js";
import { getDetailInformation } from "../../../utilities/record.js";
import UICircularIndeterminate from "../../UI/CircularIndeterminate.jsx";

const RecordScreenReceipt = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { data: customer, isLoading: isCustomerLoading } = useCustomer(
    request?.customerID,
  );
  const { mutate: firstPayment } = useMutation({
    mutationFn: (body) => {
      return postPayment(body);
    },
    onSuccess: () => {
      navigate(`/requests/${requestId}`, { replace: true });
      toast.success("First payment created successfully");
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
    },
  });
  const { mutate: updateReceiptLink } = useMutation({
    mutationFn: (body) => {
      return updateValuationRequest(requestId, body);
    },
    onSuccess: () => {
      toast.success("Update successfully");
      queryClient.invalidateQueries({
        queryKey: ["request", { requestId: requestId }],
      });
    },
  });
  const [docContent, setDocContent] = useState(null);
  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (request && customer && logo) {
      const doc = {
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
                    text: `Receipt #${requestId}\n`,
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
                    text: `Name: ${customer.firstName} ${customer.lastName}\n`,
                    style: "para",
                  },
                  {
                    text: `Phone: ${customer.phone}\n`,
                    style: "para",
                  },
                  {
                    text: `Email: ${customer.email}\n`,
                    style: "para",
                  },
                  {
                    text: `Address: ${customer.address}\n`,
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
            columns: [
              {
                text: [
                  {
                    text: "Estimated Return Date: \n",
                    style: "subheader",
                  },
                  {
                    text: `${formattedDateTime(request.returnDate)}`,
                  },
                ],
                margin: [0, 20, 0, 0],
                width: "50%",
              },
              {
                text: [
                  {
                    text: "Service: \n",
                    style: "subheader",
                  },
                  {
                    text: `${request.service.name}`,
                  },
                ],
                margin: [0, 20, 0, 0],
                width: "50%",
              },
            ],
          },
          {
            text: "Detail Information",
            style: "subheader",
            margin: [0, 20, 0, 5],
          },
          {
            layout: "receiptLayout", // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ["*", 80, 120, 120],

              body: getDetailInformation(request.valuationRequestDetails),
            },
          },
          {
            text: `Total Service Price: ${formattedMoney(request.totalServicePrice)}`,
            style: "subheader",
            alignment: "right",
            margin: [0, 20, 0, 5],
          },
          {
            text: `Total Price (First payment): ${formattedMoney(request.totalServicePrice * 0.4)}`,
            style: "subheader",
            color: "#EE4E4E",
            alignment: "right",
            margin: [0, 5, 0, 5],
          },
          {
            text: [
              {
                text: `I, ${customer.firstName} ${customer.lastName}, confirm that I have handed over the above-mentioned quantity of diamonds to H&T Diamond Company for appraisal. I acknowledge that the information provided about the diamonds is accurate to the best of my knowledge and that I have read and understood the terms and conditions of the appraisal service.`,
                alignment: "justify",
              },
            ],
            margin: [0, 18, 0, 0],
          },
          {
            text: [
              {
                text: `We, H&T Diamond Company, confirm that we have received the above-mentioned quantity of diamonds from ${customer.firstName} ${customer.lastName} for the purpose of appraisal. We guarantee that the diamonds will be appraised by our certified gemologists and will be handled with the utmost care.`,
                alignment: "justify",
              },
            ],

            margin: [0, 15, 0, 0],
          },

          {
            columns: [
              {
                text: [
                  {
                    text: "Customer Signature\n",
                  },
                ],
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
          {
            text: "",
            margin: [0, 50],
          },
          {
            text: "Note: ",
            style: "subheader",
            margin: [0, 20, 0, 5],
          },
          {
            ul: [
              "The first payment is required to be paid before the appraisal process begins.",
              "Please keep this receipt to retrieve your diamonds.",
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
      setDocContent(doc);
    }

    if (request?.receiptLink) {
      setUrl(request.receiptLink);
    }
  }, [request, customer, logo]);

  let pdfGenerator = null;

  if (docContent) {
    pdfGenerator = pdfMake.createPdf(docContent);
  }

  const handleDownload = () => {
    pdfGenerator.download(`receipt-${requestId}.pdf`);
  };
  const handleSaveReceipt = () => {
    updateReceiptLink({ ...request, receiptLink: url });
  };

  const handleView = () => {
    pdfGenerator?.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  };
  useEffect(() => {
    loadImageByPath("images/logo.png", setLogo);
  }, [logo]);

  const handleFirstPayment = () => {
    const paymentBody = {
      valuationRequestID: requestId,
      paymentMethod: { id: 1 },
    };
    firstPayment(paymentBody);
  };

  if (isCustomerLoading || isRequestLoading) {
    return <UICircularIndeterminate />;
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h4">Receipt Record</Typography>
        <Button variant={"contained"} onClick={handleFirstPayment}>
          Create Payment
        </Button>
      </Box>
      <Stack direction={"row"} spacing={1}>
        <IconButton
          aria-label="Download"
          color="primary"
          onClick={handleDownload}
        >
          <DownloadIcon />
        </IconButton>
        <IconButton aria-label="View" color="secondary" onClick={handleView}>
          <VisibilityIcon />
        </IconButton>
        <IconButton
          aria-label="Save"
          color="primary"
          onClick={handleSaveReceipt}
        >
          <SaveAltIcon />
        </IconButton>
      </Stack>
      <br />
      {url && (
        <Box sx={{ w: "90%", margin: "0 auto" }}>
          <iframe src={url} style={{ width: "100%", height: "90vh" }} />
        </Box>
      )}
    </Box>
  );
};

export default RecordScreenReceipt;
