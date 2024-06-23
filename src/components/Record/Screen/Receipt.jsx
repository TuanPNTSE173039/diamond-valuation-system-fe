import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState } from "react";
import { loadImageByPath } from "../../../utilities/imageLoader.js";

const RecordScreenReceipt = () => {
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
                text: "Receipt #123\n",
                margin: [0, 20],
                style: "header",
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
        columns: [
          {
            text: [
              {
                text: "Estimated Return Date: \n",
                style: "subheader",
              },
              {
                text: "2024/04/20 - 12:00:00",
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
                text: "Normal Service",
              },
            ],
            margin: [0, 20, 0, 0],
            width: "50%",
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
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ["*", 80, 120, 120],

          body: [
            [
              { text: "Number", style: "thead" },
              { text: "Size", style: ["thead", "number"] },
              { text: "Service Price", style: ["thead", "number"] },
              { text: "Will be paid", style: ["thead", "number"] },
            ],
            [
              { text: "250", bold: true },
              {
                text: [
                  "4.8",
                  {
                    text: " mm",
                    italics: true,
                  },
                ],
                style: "number",
              },
              {
                text: "$25.00",
                bold: true,
                style: "number",
              },
              {
                text: "$5.00",
                bold: true,
                style: "number",
              },
            ],
            [
              { text: "251", bold: true },
              {
                text: [
                  "4.2",
                  {
                    text: " mm",
                    italics: true,
                  },
                ],
                style: "number",
              },
              {
                text: "$20.00",
                bold: true,
                style: "number",
              },
              {
                text: "$4.00",
                bold: true,
                style: "number",
              },
            ],
          ],
        },
      },
      {
        text: "Total Service Price: $29.00",
        style: "subheader",
        alignment: "right",
        margin: [0, 20, 0, 5],
      },
      {
        text: "Total Price (First payment): $9.00",
        style: "subheader",
        color: "#EE4E4E",
        alignment: "right",
        margin: [0, 5, 0, 5],
      },
      {
        text: [
          {
            text: "I, Tuan Pham, confirm that I have handed over the above-mentioned quantity of diamonds to H&T Diamond Company for appraisal. I acknowledge that the information provided about the diamonds is accurate to the best of my knowledge and that I have read and understood the terms and conditions of the appraisal service.",
            alignment: "justify",
          },
        ],
        margin: [0, 18, 0, 0],
      },
      {
        text: [
          {
            text: "We, H&T Diamond Company, confirm that we have received the above-mentioned quantity of diamonds from Tuan Pham for the purpose of appraisal. We guarantee that the diamonds will be appraised by our certified gemologists and will be handled with the utmost care.",
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
    // pdfGenerator.getDataUrl((url) => setUrl(url));
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

export default RecordScreenReceipt;
