const vn = {
  UNKNOWN_ERROR: 'Lỗi không xác định',
  SERVER_IS_TAKING_TOO_LONG_TO_RESPOND: 'Máy chủ mất quá nhiều thời gian để phản hồi',
  NO_INTERNET_CONNECTION: 'Không có kết nối mạng',
  PLEASE_TRY_AGAIN: 'Vui lòng thử lại'
};

export const getString = (code) => {
  return vn[code];
};
