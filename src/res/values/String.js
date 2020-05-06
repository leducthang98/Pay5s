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
  CHANGE_NETWORK: 'Thay đổi nhà mạng',
  CHANGE_NETWORK_NOTE: 'Lưu ý: chỉ thay đổi nhà mạng khi bạn đã đăng ký chuyển mạng giữ số điện thoại',
  DISCOUNT: 'Giảm',
  DEPOSIT_NOW: 'Nạp ngay',
  YOU_NEED_TO_ENTER_PHONE_NUMBER: 'Bạn cần nhập số điện thoại',
  PHONE_NUMBER_IS_INCORRECT_TYPE: 'Số điện thoại không đúng định dạng',
  ACCOUNT_CODE: 'Mã tài khoản', 
  
  //commons
  CONNECTING: 'Đang kết nối',
  FETCHING_DATA: 'Đang tải dữ liệu',
  OK: 'Đồng ý',
  CANCEL: 'Hủy bỏ',
  CLOSE: 'Đóng',
  NOTIFICATION: 'Thông báo',
  NOT_SUPPORT: 'Không hỗ trợ',
  SERVICE_IS_CLOSED_TEMPORARY: 'Dịch vụ tạm thời đóng',
  //dashboard
  BUY_CARD: 'Mua mã thẻ',
  INTERNET_VIETTEL: 'Internet Viettel',

};
export const getString = (code) => {
  return vn[code];
};
export const INFODATA = {
  PARAGRAPH1A: '1. Số dư được dùng để mua các dịch vụ trên Pay5s như Nạp tài khoản điện thoại trả trước và trả sau, gia hạn K+, Internet Viettel, ...',
  PARAGRAPH1B: 'Để có số dư, bạn có thể nạp qua các kênh Momo, chuyển khoản ngân hàng trong phần nạp tiền.',
  PARAGRAPH2A: '2. Chương trình giới thiệu giúp bạn kiếm thêm tiền ngay trên Pay5s:',
  PARAGRAPH2B: '- Khi giới thiệu bạn bè sử dụng dịch vụ trên Pay5s, bạn nhận được phần thưởng từ quá trình sử dụng dịch vụ của bạn bè.',
  PARAGRAPH2C: '- Nhận thưởng 2% giá trị đơn của người được giới thiệu (F1).',
  PARAGRAPH2D: 'Khi đơn hàng được hoàn thành, thưởng sẽ được ghi nhận ngay vào số dư tài khoản của bạn.',
  PARAGRAPH3A: 'Cùng nhận thưởng với bạn bè ngay trên Pay5s nhé.',

}
