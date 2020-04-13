const vn = {

  //fetch api
  UNKNOWN_ERROR: 'Lỗi không xác định',
  SERVER_IS_TAKING_TOO_LONG_TO_RESPOND: 'Máy chủ mất quá nhiều thời gian để phản hồi',
  NO_INTERNET_CONNECTION: 'Không có kết nối mạng',
  PLEASE_TRY_AGAIN: 'Vui lòng thử lại',

  //recharge
  DEPOSIT_TO: 'Nạp đến',
  WATCH_HISTORY: 'Xem lịch sử',
  TYPE_PHONE_NUMBER: 'Nhập số điện thoại',
  TIME_FINISH_BELOW_1_MINUTE: 'Thời gian hoàn thành dưới 1 phút',
  NOT_RECEIVE_20_PERCENT_PROMOTION: 'Không nhận được 20% khi nhà mạng đang khuyến mãi',
  PROCESS_SPEED_6_HOUR: 'Tốc độ xử lý đơn hiện tại: trong 6 tiếng',
  PROCESS_SPEED: 'Tốc độ xử lý đơn: ',
  RECEIVE_20_PERCENT_PROMOTION: 'Nhận được 20% khuyến mại của nhà mạng nếu có',
  AMOUNT_TO_DEPOSIT: 'Mệnh giá nạp',


  //commons
  CONNECTING: 'Đang kết nối',
  FETCHING_DATA: 'Đang tải dữ liệu',
  OK: 'Đồng ý',
  CANCEL: 'Hủy bỏ',
  CLOSE: 'Đóng',
  NOTIFICATION: 'Thông báo',
  NOT_SUPPORT: 'Không hỗ trợ'
};

export const getString = (code) => {
  return vn[code];
};
