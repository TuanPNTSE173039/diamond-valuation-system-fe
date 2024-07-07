import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import LoopIcon from "@mui/icons-material/Loop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { sha512 } from "js-sha512";
import pdfMake from "pdfmake/build/pdfmake";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { frontendUrl } from "../../../services/config/axiosInstance.js";
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
  formattedMoney,
} from "../../../utilities/formatter.js";
import { loadImageByPath } from "../../../utilities/imageLoader.js";
import { getDetailInformation } from "../../../utilities/record.js";
import UIBreadCrumb from "../../UI/BreadCrumb.jsx";
import UICircularIndeterminate from "../../UI/CircularIndeterminate.jsx";

const RecordScreenReceipt = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  const [isPaid, setIsPaid] = useState(false);

  const { data: records, isFetching: isRecordFetching } = useRecords(requestId);
  const { data: request, isLoading: isRequestLoading } = useRequest(requestId);
  const { data: customer, isLoading: isCustomerLoading } = useCustomer(
    request?.customerID,
  );

  const queryClient = useQueryClient();
  const { mutate: createReceipt } = useMutation({
    mutationFn: (body) => {
      return createRecord(body);
    },
    onSuccess: () => {
      toast.success("Create receipt successfully");
      queryClient.invalidateQueries({
        queryKey: ["records", { requestId: requestId }],
      });
    },
  });
  const { mutate: updateReceipt } = useMutation({
    mutationFn: (body) => {
      return updateRecord(body);
    },
    onSuccess: () => {
      toast.success("Update record successfully");
      queryClient.invalidateQueries({
        queryKey: ["records", { requestId: requestId }],
      });
    },
  });

  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("Cash"); //Cash or VNPay
  const handleChangePaymentMethod = (event, newPaymentMethod) => {
    setPaymentMethod(newPaymentMethod);
  };

  const [vnPayParam, setVnPayParam] = useState({
    vnp_Amount: "",
    vnp_Command: "pay",
    vnp_CreateDate: "",
    vnp_CurrCode: "VND",
    vnp_IpAddr: "",
    vnp_Locale: "vn",
    vnp_OrderInfo: "",
    vnp_OrderType: "other",
    vnp_TmnCode: "BRNTYI8B",
    vnp_TxnRef: "",
    vnp_Version: "2.1.0",
  });
  const getVNPayURL = (vnPayParam) => {
    const secretKey = "NT5SF8B7NJGGX5FILVUWHSARUC8P1TK9"; // Replace with your actual secret key
    const updatedParams = { ...vnPayParam };
    const sortedParams = Object.keys(updatedParams)
      .sort()
      .reduce((result, key) => {
        result[key] = updatedParams[key];
        return result;
      }, {});
    const queryString = qs.stringify(sortedParams, { encode: false });
    sortedParams["vnp_SecureHash"] = sha512.hmac(secretKey, queryString);
    return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${qs.stringify(sortedParams, { encode: false })}`;
  };
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setVnPayParam((prev) => ({
          ...prev,
          vnp_IpAddr: response.data.ip,
        }));
      } catch (error) {
        console.error("Error fetching the IP address:", error);
      }
    };
    const convertCurrency = async (amount) => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/071dafb7c790a0973e0feee3/latest/USD`,
        );
        const exchangeRate = response.data.conversion_rates["VND"];
        setVnPayParam((prev) => ({
          ...prev,
          vnp_Amount: Math.floor(amount * exchangeRate * 100),
        }));
      } catch (error) {
        console.error("Error fetching the exchange rate:", error);
        return null;
      }
    };
    fetchIpAddress();
    setVnPayParam((prev) => ({
      ...prev,
      vnp_CreateDate: format(date, "yyyyMMddHHmmss").toString(),
      vnp_TxnRef: format(date, "HHmm").toString(),
      vnp_OrderInfo: `Payment+for+request+${requestId}`,
      vnp_ReturnUrl: encodeURIComponent(
        frontendUrl + `requests/${requestId}/receipt/payment`,
      ),
    }));

    const date = new Date();
    if (request) {
      convertCurrency(request.totalServicePrice * 0.4);
    }
  }, [request]);

  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleVNPayPayment = () => {
    const vnPayURL = getVNPayURL(vnPayParam);
    window.location.href = vnPayURL;
    handleDialogClose();
  };
  const handleCashPayment = () => {
    navigate(`/requests/${requestId}/receipt/payment?transaction_status=00`, {
      replace: true,
    });
    handleDialogClose();
  };

  const getReceiptContent = (payment = null) => {
    const returnDate = request.returnDate || new Date();
    let payStatus = {};
    let signature = {
      text: "",
      margin: [0, 50],
    };

    if (payment) {
      payStatus = {
        text: "Paid",
        color: "#06D001",
        style: "subheader",
        alignment: "right",
        margin: [0, 5, 0, 5],
      };
      signature = {
        columns: [
          {
            text: [
              {
                text: `Signed by: ${customer.firstName} ${customer.lastName}\n`,
              },
              {
                text: `Sign date: ${formattedDateTime(payment.paytime)}\n`,
              },
              {
                text: `Payment: ${payment.paymentMethod.name}\n`,
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
                text: `Sign date: ${formattedDateTime(payment.paytime)}\n`,
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
                payStatus,
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
                  text: `Email: ${customer.account.email}\n`,
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
                  text: `${formattedDateTime(returnDate)}`,
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
        signature,
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
              {
                type: "rect",
                x: 170,
                y: 32,
                w: pageSize.width - 170,
                h: 40,
              },
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
    const receipt = records?.find((record) => record.type === "RECEIPT");
    if (receipt) {
      setUrl(receipt.link);
    }
  }, [records]);

  const handleDownload = () => {
    const doc = getReceiptContent();
    pdfMake.createPdf(doc).download(`receipt-${requestId}.pdf`);
  };
  const handleCreateReceipt = () => {
    const doc = getReceiptContent();
    pdfMake.createPdf(doc).getDataUrl((url) => {
      const body = {
        link: url,
        status: false,
        type: "RECEIPT",
        valuationRequestId: requestId,
      };
      createReceipt(body);
    });
  };

  useEffect(() => {
    loadImageByPath("images/logo.png", setLogo);
  }, [logo]);

  useEffect(() => {
    const receipt = records?.find((record) => record.type === "RECEIPT");
    if (request?.payment.length === 2 && receipt) {
      setIsPaid(true);
      const doc = getReceiptContent(request.payment[0]);
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...receipt,
          link: url,
          status: true,
        };
        updateReceipt(body);
      });
    }
  }, [request.payment[0]]);

  if (isCustomerLoading || isRequestLoading || isRecordFetching) {
    return <UICircularIndeterminate />;
  }

  function handleRefreshReceipt() {
    const receipt = records?.find((record) => record.type === "RECEIPT");
    if (receipt) {
      const doc = getReceiptContent();
      pdfMake.createPdf(doc).getDataUrl((url) => {
        const body = {
          ...receipt,
          link: url,
        };
        updateReceipt(body);
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
        <Typography variant="h4">Receipt Record</Typography>

        {!isPaid && (
          <Button variant={"contained"} onClick={handleDialogOpen}>
            Create Payment
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
        {!isPaid && (
          <>
            <IconButton
              aria-label="Save"
              color="secondary"
              onClick={handleCreateReceipt}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="Save"
              color="status.processing"
              onClick={handleRefreshReceipt}
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
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Payment Information</DialogTitle>
        <DialogContent>
          <Box>
            <ToggleButtonGroup
              color="primary"
              value={paymentMethod}
              exclusive
              onChange={handleChangePaymentMethod}
              aria-label="Payment"
            >
              <ToggleButton value="Cash">Cash</ToggleButton>
              <ToggleButton value="VNPay">VNPay</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Close
          </Button>
          <Button
            onClick={
              paymentMethod === "Cash" ? handleCashPayment : handleVNPayPayment
            }
            variant="contained"
          >
            {paymentMethod === "Cash" ? "Confirm" : "Pay now"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecordScreenReceipt;
