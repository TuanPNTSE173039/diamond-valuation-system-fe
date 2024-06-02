import DownloadIcon from "@mui/icons-material/Download";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import React, { useRef } from "react";
import { Margin, Resolution, usePDF } from "react-to-pdf";
import logo from "../../assets/images/logo.png";

const ScreenResult = () => {
  const ref = useRef(); // Create a reference
  const options = {
    // default is `save`
    filename: "ahi.pdf",
    method: "open",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "landscape",
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/png",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };
  const { toPDF, targetRef } = usePDF(options);

  return (
    <div>
      <div>
        <Stack direction="row" spacing={1}>
          <button onClick={() => toPDF()}>
            <IconButton color="primary" aria-label="download">
              <DownloadIcon />
            </IconButton>
          </button>
          <IconButton color="secondary" aria-label="upload">
            <FileUploadIcon />
          </IconButton>
          <IconButton color="primary" aria-label="view">
            <VisibilityIcon />
          </IconButton>
        </Stack>
      </div>
      <div ref={targetRef}>
        <main className="text-slate-800 mt-24 h-[100vh] flex flex-col w-full">
          <div className="flex flex-row justify-center items-center mb-2">
            <img src={logo} alt={"H&T Diamond"} className="h-20 w-auto" />
          </div>
          <h1 className="text-center text-2xl text-slate-800">H&T Diamond</h1>
          <p className="pt-1 text-slate-400 text-center h-full">
            Valuation #10192
          </p>
          <div className="p-12 flex-grow bg-white rounded-2xl rounded-t-none shadow-xl shadow-black/10">
            <div className="">
              <div className="h-px bg-gray-300 my-4" />
              <div>
                <p className="p-0 mb-1">
                  <b>Diamond Attribute</b>
                </p>
                <div className="flex gap-10">
                  <div className="flex w-1/2">
                    <div className="w-1/2">
                      <p className="p-0 mb-1">Diamond Origin</p>
                      <p className="p-0 mb-1">Carat</p>
                      <p className="p-0 mb-1">Color</p>
                      <p className="p-0 mb-1">Clarity</p>
                      <p className="p-0 mb-1">Cut</p>
                      <p className="p-0 mb-1">Shape</p>
                      <p className="p-0 mb-1">Polish</p>
                      <p className="p-0 mb-1">Symmetry</p>
                      <p className="p-0 mb-1">Fluorescence</p>
                    </div>
                    <div className="w-1/2 text-right">
                      <p className="p-0 mb-1">Diamond Origin</p>
                      <p className="p-0 mb-1">Carat</p>
                      <p className="p-0 mb-1">Color</p>
                      <p className="p-0 mb-1">Clarity</p>
                      <p className="p-0 mb-1">Cut</p>
                      <p className="p-0 mb-1">Shape</p>
                      <p className="p-0 mb-1">Polish</p>
                      <p className="p-0 mb-1">Symmetry</p>
                      <p className="p-0 mb-1">Fluorescence</p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    {/*<div className="">*/}
                    {/*  <img*/}
                    {/*    src="https://stonealgo-cert.b-cdn.net/img/img_prop-53d827c57a7a0d79f823a43c226fca6b.jpg"*/}
                    {/*    alt="proportion"*/}
                    {/*    className="w-auto h-[150px]"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*<div className="">*/}
                    {/*  <img*/}
                    {/*    src="https://stonealgo-cert.b-cdn.net/img/img_prop-53d827c57a7a0d79f823a43c226fca6b.jpg"*/}
                    {/*    alt="proportion"*/}
                    {/*    className="w-auto h-[150px]"*/}
                    {/*  />*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-300 my-4" />
            </div>
            <div className="bg-slate-100 px-6 py-2 rounded-md">
              <table className="w-full">
                <tr className="font-bold text-slate-700">
                  <td className="py-4">Estimated Retail Replacement Value</td>
                  <td className="py-4">$2000</td>
                </tr>
              </table>
            </div>
            <hr className="my-6" />
            This is some additional content to to inform you that Acme Inc. is a
            fake company and this is a fake receipt. This is just a demo to show
            you how you can create a beautiful receipt with Onedoc.{" "}
          </div>
        </main>
        <main className="text-slate-800 mt-24 h-[100vh] flex flex-col w-full">
          <div className="flex flex-row justify-center items-center mb-2">
            <img src={logo} alt={"H&T Diamond"} className="h-20 w-auto" />
          </div>
          <h1 className="text-center text-2xl text-slate-800">H&T Diamond</h1>
          <p className="pt-1 text-slate-400 text-center h-full">
            Valuation #10193
          </p>
          <div className="p-12 flex-grow bg-white rounded-2xl rounded-t-none shadow-xl shadow-black/10">
            <div className="">
              <div className="h-px bg-gray-300 my-4" />
              <div>
                <p className="p-0 mb-1">
                  <b>Diamond Attribute</b>
                </p>
                <div className="flex gap-10">
                  <div className="flex w-1/2">
                    <div className="w-1/2">
                      <p className="p-0 mb-1">Diamond Origin</p>
                      <p className="p-0 mb-1">Carat</p>
                      <p className="p-0 mb-1">Color</p>
                      <p className="p-0 mb-1">Clarity</p>
                      <p className="p-0 mb-1">Cut</p>
                      <p className="p-0 mb-1">Shape</p>
                      <p className="p-0 mb-1">Polish</p>
                      <p className="p-0 mb-1">Symmetry</p>
                      <p className="p-0 mb-1">Fluorescence</p>
                    </div>
                    <div className="w-1/2 text-right">
                      <p className="p-0 mb-1">Diamond Origin</p>
                      <p className="p-0 mb-1">Carat</p>
                      <p className="p-0 mb-1">Color</p>
                      <p className="p-0 mb-1">Clarity</p>
                      <p className="p-0 mb-1">Cut</p>
                      <p className="p-0 mb-1">Shape</p>
                      <p className="p-0 mb-1">Polish</p>
                      <p className="p-0 mb-1">Symmetry</p>
                      <p className="p-0 mb-1">Fluorescence</p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    {/*<div className="">*/}
                    {/*  <img*/}
                    {/*    src="https://stonealgo-cert.b-cdn.net/img/img_prop-53d827c57a7a0d79f823a43c226fca6b.jpg"*/}
                    {/*    alt="proportion"*/}
                    {/*    className="w-auto h-[150px]"*/}
                    {/*  />*/}
                    {/*</div>*/}
                    {/*<div className="">*/}
                    {/*  <img*/}
                    {/*    src="https://stonealgo-cert.b-cdn.net/img/img_prop-53d827c57a7a0d79f823a43c226fca6b.jpg"*/}
                    {/*    alt="proportion"*/}
                    {/*    className="w-auto h-[150px]"*/}
                    {/*  />*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-300 my-4" />
            </div>
            <div className="bg-slate-100 px-6 py-2 rounded-md">
              <table className="w-full">
                <tr className="font-bold text-slate-700">
                  <td className="py-4">Estimated Retail Replacement Value</td>
                  <td className="py-4">$2000</td>
                </tr>
              </table>
            </div>
            <hr className="my-6" />
            This is some additional content to to inform you that Acme Inc. is a
            fake company and this is a fake receipt. This is just a demo to show
            you how you can create a beautiful receipt with Onedoc.{" "}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScreenResult;
