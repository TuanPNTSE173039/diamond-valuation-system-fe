import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState } from "react";
import { loadImageByPath } from "../../../utilities/imageLoader.js";

const RecordScreenSealing = () => {
  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState(null);
  const docDefinition = {
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
                text: "Appointment: #255\n",
                fontSize: 12,
                alignment: "right",
              },
              {
                text: "Date: 2021-10-01\n",
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
                text: "Name: Tuan Pham\n",
                style: "para",
              },
              {
                text: "Phone: 0367304351\n",
                style: "para",
              },
              {
                text: "Email: tuanpnt17@gmail.com\n",
                style: "para",
              },
              {
                text: "Address: District 9, HCM City\n",
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
          widths: [50, "*", 70, 50, 70, 60, 50],

          body: [
            [
              { text: "Number", style: "thead" },
              { text: "Certificate", style: ["thead", "number"] },
              { text: "Origin", style: ["thead"] },
              { text: "Carat", style: ["thead", "number"] },
              { text: "Cut", style: ["thead"] },
              { text: "Color", style: ["thead"] },
              { text: "Clarity", style: ["thead"] },
            ],
            [
              { text: "250", bold: true },
              {
                text: "0367304351",
                style: "number",
              },
              {
                text: "Natural",
              },
              {
                text: [
                  "1.01",
                  {
                    text: " .ct",
                    italics: true,
                  },
                ],
                style: "number",
              },
              {
                text: "Excellence",
              },
              {
                text: "D",
              },
              {
                text: "VS1",
              },
            ],
            [
              { text: "251", bold: true },
              {
                text: "0781889890",
                style: "number",
              },
              {
                text: "Natural",
              },
              {
                text: [
                  "2.01",
                  {
                    text: " .ct",
                    italics: true,
                  },
                ],
                style: "number",
              },
              {
                text: "Excellence",
              },
              {
                text: "D",
              },
              {
                text: "VS1",
              },
            ],
          ],
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
  const pdfGenerator = pdfMake.createPdf(docDefinition);
  const handleDownload = () => {
    pdfGenerator.download("receipt.pdf");
  };
  const savePdf = () => {
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    });
  };
  useEffect(() => {
    loadImageByPath("images/logo.png", setLogo);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url);
    });
  }, [logo]);

  return (
    <div>
      <h1>Receipt</h1>
      <Button variant={"contained"} onClick={handleDownload}>
        Download
      </Button>
      <Button variant={"contained"} onClick={savePdf}>
        Save
      </Button>
      <br />
      <br />

      {url && (
        <Box sx={{ w: "90%", margin: "0 auto" }}>
          <iframe src={url} style={{ width: "100%", height: "90vh" }} />
        </Box>
      )}
    </div>
  );
};

export default RecordScreenSealing;
