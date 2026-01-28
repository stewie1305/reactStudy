export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center p-20 gap-4">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-500 animate-pulse">Đang tải dữ liệu...</p>
  </div>
);

export const ErrorState = ({
  message = "Đã có lỗi xảy ra",
}: {
  message?: string;
}) => (
  <div className="p-10 border border-red-200 bg-red-50 text-red-600 rounded-lg text-center">
    <p className="font-bold">Oops!</p>
    <p>{message}</p>
    <button className="mt-4 underline" onClick={() => window.location.reload()}>
      Thử lại
    </button>
  </div>
);
