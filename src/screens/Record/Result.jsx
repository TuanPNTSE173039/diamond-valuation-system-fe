import logo from "../../assets/images/logo.png";

const ScreenResult = () => {
  return (
    <div>
      {/*<div className="bg-gradient-to-r from-blue-600 to-blue-400 -z-10 absolute -left-[2cm] right-[25vw] -skew-y-12 h-[100vh] bottom-[95vh]" />*/}
      {/*<div className="bg-gradient-to-r from-blue-600 to-blue-800 -z-20 absolute left-[75vw] -right-[2cm] -skew-y-12 h-[100vh] bottom-[90vh]" />*/}
      {/*<div className="bg-slate-100 -rotate-12 -z-10 absolute -left-[200em] -right-[200em] h-[100vh] top-[75vh]" />*/}
      <main className="text-slate-800 mt-24 h-[90vh] flex flex-col w-full">
        <div className="flex flex-row justify-center items-center mb-2">
          <img src={logo} alt={"H&T Diamond"} className="h-20 w-auto" />
        </div>
        <h1 className="text-center text-2xl text-slate-800">H&T Diamond</h1>
        <p className="pt-2 text-slate-400 text-center">Valuation #10192</p>
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
                  <img src="" alt="" />
                  <img src="" alt="" />
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
      <main className="text-slate-800 mt-24 h-[90vh] flex flex-col w-full">
        <div className="flex flex-row justify-center items-center mb-2">
          <img src={logo} alt={"H&T Diamond"} className="h-20 w-auto" />
        </div>
        <h1 className="text-center text-2xl text-slate-800">H&T Diamond</h1>
        <p className="pt-2 text-slate-400 text-center">Valuation #10192</p>
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
                  <img src="" alt="" />
                  <img src="" alt="" />
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
  );
};

export default ScreenResult;
