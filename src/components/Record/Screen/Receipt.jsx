import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import pdfMake from "pdfmake/build/pdfmake";
import { useEffect, useState } from "react";
import { loadImageByPath } from "../../../utilities/imageLoader.js";

const RecordScreenReceipt = () => {
  const [logo, setLogo] = useState(null);
  const [url, setUrl] = useState(null);

  console.log(url)
  const docDefinition = {
    content: [
      {
        columns: [
          {
            image: "logo",
            width: 53,
            height: 40,
            // margin: [30, 0],
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
    ],
    images: {
      logo: `${logo}`,
    },
    defaultStyle: {
      fontSize: 15,
      bold: true,
    },
    styles: {
      header: {
        fontSize: 20,
        bold: true,
      },
    },
  };
  const pdfGenerator = pdfMake.createPdf(docDefinition);
  const handleDownload = () => {
    pdfGenerator.download("receipt.pdf");
  };
  useEffect(() => {
    loadImageByPath("images/logo.png", setLogo);
    pdfGenerator.getDataUrl((url) => setUrl(url));
  }, []);
  console.log(url);
  return (
    <div>
      <h1>Receipt</h1>
      <Button variant={"contained"} onClick={handleDownload}>
        Download
      </Button>
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
