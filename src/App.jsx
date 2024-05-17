function App() {
  //vertical center
  return (
    <>
      <section className="min-h-screen bg-amber-100 flex flex-col justify-center items-center">
        <div className="text-center text-2xl text-red-600 font-bold">
          Bạn đang ở trong Develop branch
        </div>
        <p className="text-3xl font-extrabold text-center text-blue-500">
          Chuyển ngay sang branch của bạn hoặc tạo branch mới
        </p>
        <div className="text-center text-2xl text-red-600 font-bold">
          Bất cứ hành vi nào ở trong branch này đều sẽ gây nên tội lỗi nghiêm
          trọng cho dự án
        </div>
      </section>
    </>
  );
}

export default App;
