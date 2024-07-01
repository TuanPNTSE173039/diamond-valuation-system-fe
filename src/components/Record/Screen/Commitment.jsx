import { useEffect, useState } from "react";
import { loadImageByPath } from "../../../utilities/imageLoader.js";
import pdfMake from "pdfmake/build/pdfmake";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const RecordScreenCommitment = () => {
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
                                text: "Commitment #123\n",
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
            },
            {
                text: "RECEIPT OF DELIVERY",
                style: "title",
                alignment: "center",
            },
            {
                text: "- Pursuant to the Sale and Purchase Agreement between the Company and the Customer\n- Based on the Order dated .................. of the Company",
                style: "italicText",
            },
            {
                text: "Today, day ... month ... year ... At .........................................................., We include:",
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
                table: {
                    headerRows: 1,
                    widths: [20, 70, '*', 35, 40, '*', 60, 60, '*'],
                    body: [
                        [
                            { text: 'NO', style: 'tableHeader' },
                            { text: 'Certificate', style: 'tableHeader' },
                            { text: 'Carat', style: 'tableHeader' },
                            { text: 'Color', style: 'tableHeader' },
                            { text: 'Clarity', style: 'tableHeader' },
                            { text: 'Cut', style: 'tableHeader' },
                            { text: 'Origin', style: 'tableHeader' },
                            { text: 'Note', style: 'tableHeader' },
                        ],
                        // Add rows here
                        [1, '8142020634', '1.0', 'G', 'VS1', 'EX', 'NATURAL', ''],
                        [2, '-', '-', '-', '-', '-', '-', 'THIS IS FAKE DIAMOND'],

                    ],
                },
                layout: 'lightHorizontalLines',
                margin: [0, 10, 0, 10],
            },
            {
                text: "The Customer affirms that the Company has delivered the right type and quantity of goods as listed above. Both parties agree to sign this receipt. The document is made in two copies, each party keeps one copy with the same legal value.",
                style: "bodyText",
            },
            {
                text: "..., day ... month ... year ...",
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
                color: 'black',
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
    }, [logo]);

    return (
        <div>
            <h1>Receipt</h1>
            <Button variant={"contained"} onClick={handleDownload}>
                Download
            </Button>
            <br />
            {url && (
                <Box sx={{ width: "90%", margin: "0 auto" }}>
                    <iframe src={url} style={{ width: "100%", height: "90vh" }} />
                </Box>
            )}
        </div>
    );
};

export default RecordScreenCommitment;
