const fs = require('fs');
const path = require('path');

// 1. Charity donations data - crafted to equal EXACTLY 350,000,000 VND
const charityItems = [
  // Big corporate & philanthropist donors (Sum = 270,000,000)
  { name: "Công ty Cổ phần Ao Vua (Ba Vì, Hà Nội)", amount: 100000000, type: "DONOR", bank: "MB Bank", account: "0012****8899", date: "12/01/2026 14:16:30", note: "THIENNGUYEN AO VUA UNG HO QUY CSSK DONG BAO", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hà Nội" },
  { name: "Tập đoàn Dược liệu và Sức khỏe Việt", amount: 50000000, type: "DONOR", bank: "Vietcombank", account: "0021****5544", date: "08/02/2026 11:20:45", note: "THIENNGUYEN DUOC LIEU VIET TANG THUOC VUNG CAO", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Hà Nội" },
  { name: "Công ty Cổ phần Dược phẩm Nam Hà", amount: 25000000, type: "DONOR", bank: "BIDV", account: "1241****9988", date: "15/02/2026 09:40:12", note: "THIENNGUYEN DUOC NAM HA CHUONG TRINH ANH SANG HOC DUONG", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Nam Định" },
  { name: "Bác sĩ Phạm Minh Đức & Gia đình", amount: 20000000, type: "DONOR", bank: "Vietcombank", account: "0111****3322", date: "18/03/2026 15:10:30", note: "THIENNGUYEN PHAU THUAT MAT NGUOI CAO TUOI CAN THO", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Cần Thơ" },
  { name: "Công ty TNHH Thiết bị Y tế Tân Bình", amount: 20000000, type: "DONOR", bank: "Techcombank", account: "1902****7766", date: "22/02/2026 16:35:10", note: "THIENNGUYEN Y TE TAN BINH DONG GOP MAY DO HUYET AP", campaign: "Trang thiết bị kiểm tra sức khỏe người già tại trạm y tế", prov: "TP. Hồ Chí Minh" },
  { name: "Quỹ Khuyến học & Nhân đạo Tâm Đức", amount: 15000000, type: "DONOR", bank: "VietinBank", account: "1038****4411", date: "26/02/2026 10:15:00", note: "THIENNGUYEN QUY TAM DUC SUAT AN DINH DUONG BENH NHAN", campaign: "Bữa cơm dinh dưỡng và sữa y tế cho người nghèo", prov: "Đà Nẵng" },
  { name: "Gia đình Cố Bác sĩ Nguyễn Văn Kính", amount: 10000000, type: "DONOR", bank: "Agribank", account: "3100****8822", date: "03/03/2026 08:30:22", note: "THIENNGUYEN TRI AN Y DUC VI CONG DONG VACHE", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hà Nội" },
  { name: "Nhà hảo tâm Ẩn danh (Phật tử TP.HCM)", amount: 10000000, type: "DONOR", bank: "Vietcombank", account: "0071****1290", date: "05/03/2026 11:05:40", note: "THIENNGUYEN AN DANH CHUC CAC CU MAU BINH PHUC", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "TP. Hồ Chí Minh" },
  { name: "Nhà thuốc Nhân Dân An Khang", amount: 10000000, type: "DONOR", bank: "MB Bank", account: "0801****6677", date: "07/03/2026 14:22:18", note: "THIENNGUYEN AN KHANG HO TRO THUOC BO VA VITAMIN", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Hà Nội" },
  { name: "Nhà hảo tâm Ẩn danh (Chi nhánh Ba Đình)", amount: 10000000, type: "DONOR", bank: "MB Bank", account: "0688****9911", date: "10/03/2026 17:02:05", note: "THIENNGUYEN TAI TRO NUOC SACH Y TE TAY NGUYEN", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "Hà Nội" },

  // Medium Donors (Sum = 45,000,000)
  { name: "Doanh nhân Trần Quốc Toản", amount: 8000000, type: "DONOR", bank: "Techcombank", account: "1903****5521", date: "12/03/2026 09:12:44", note: "THIENNGUYEN TRAN QUOC TOAN UNG HO Y TE CO SO", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Bình Dương" },
  { name: "Nhóm cựu sinh viên Đại học Y Hà Nội (K105)", amount: 6000000, type: "DONOR", bank: "Vietcombank", account: "0011****3344", date: "14/03/2026 13:45:00", note: "THIENNGUYEN K105 Y HA NOI DONG GOP KHAM TINH NGUYEN", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Hà Nội" },
  { name: "BS.CKII Nguyễn Thu Hà", amount: 5000000, type: "DONOR", bank: "BIDV", account: "2151****8877", date: "15/03/2026 10:20:15", note: "THIENNGUYEN BS NGUYEN THU HA UNG HO KHAM SANG LOC", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hà Nội" },
  { name: "Dược sĩ Trần Hoàng Nam", amount: 5000000, type: "DONOR", bank: "Techcombank", account: "1912****6655", date: "16/03/2026 15:30:19", note: "THIENNGUYEN DS TRAN HOANG NAM DONG GOP THUOC THIET YEU", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Đà Nẵng" },
  { name: "Công ty TNHH Thảo Dược Sapa Organic", amount: 5000000, type: "DONOR", bank: "Agribank", account: "7800****2211", date: "18/03/2026 08:44:50", note: "THIENNGUYEN SAPA ORGANIC TRAI TIM CHO EM 2026", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Lào Cai" },
  { name: "Lê Văn Tuấn & Gia đình", amount: 3000000, type: "DONOR", bank: "VietinBank", account: "1098****4433", date: "19/03/2026 11:15:20", note: "THIENNGUYEN GIA DINH LE VAN TUAN HAI PHONG UNG HO", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hải Phòng" },
  { name: "Vũ Thị Bích", amount: 3000000, type: "DONOR", bank: "MB Bank", account: "0345****9900", date: "20/03/2026 14:10:05", note: "THIENNGUYEN VU THI BICH NINH BINH DONG GOP BENH NHAN MAT", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Ninh Bình" },
  { name: "Hoàng Trọng Nghĩa", amount: 3000000, type: "DONOR", bank: "Vietcombank", account: "0491****7788", date: "21/03/2026 09:32:11", note: "THIENNGUYEN HOANG TRONG NGHIA QUANG NINH UNG HO VACHE", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Quảng Ninh" },
  { name: "Đỗ Thị Thu Hường", amount: 2000000, type: "DONOR", bank: "VPBank", account: "1554****3322", date: "22/03/2026 16:05:40", note: "THIENNGUYEN DO THI THU HUONG THANH HOA", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "Thanh Hóa" },
  { name: "Ngô Minh Trí", amount: 2000000, type: "DONOR", bank: "ACB", account: "2345****8899", date: "23/03/2026 10:45:15", note: "THIENNGUYEN NGO MINH TRI DONG NAI UNG HO SUC KHOE", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Đồng Nai" },
  { name: "Phạm Thu Trang", amount: 2000000, type: "DONOR", bank: "TPBank", account: "0234****1122", date: "24/03/2026 14:50:30", note: "THIENNGUYEN PHAM THU TRANG HA NOI CHUC CAC BE MAU KHOE", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Hà Nội" },
  { name: "Nguyễn Văn An", amount: 1000000, type: "DONOR", bank: "Vietcombank", account: "0011****9933", date: "25/03/2026 08:20:10", note: "THIENNGUYEN NGUYEN VAN AN NAM DINH UNG HO QUY CSSK", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Nam Định" },

  // Nationwide Individual Donors: 25 items x 1,000,000 = 25,000,000 VND
  { name: "Bùi Thị Mai", amount: 1000000, type: "DONOR", bank: "BIDV", account: "5101****4455", date: "25/03/2026 11:40:25", note: "THIENNGUYEN BUI THI MAI NGHE AN UNG HO", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Nghệ An" },
  { name: "Trần Đình Long", amount: 1000000, type: "DONOR", bank: "Agribank", account: "3700****2299", date: "26/03/2026 09:15:00", note: "THIENNGUYEN TRAN DINH LONG HA TINH", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hà Tĩnh" },
  { name: "Đặng Minh Quân", amount: 1000000, type: "DONOR", bank: "MB Bank", account: "0912****7766", date: "26/03/2026 13:25:40", note: "THIENNGUYEN DANG MINH QUAN THAI NGUYEN DONG GOP", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Thái Nguyên" },
  { name: "Hoàng Yến Nhi", amount: 1000000, type: "DONOR", bank: "Techcombank", account: "1903****1188", date: "27/03/2026 10:05:12", note: "THIENNGUYEN HOANG YEN NHI BAC GIANG UNG HO TRE EM", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Bắc Giang" },
  { name: "Trịnh Văn Thành", amount: 1000000, type: "DONOR", bank: "VietinBank", account: "1048****5566", date: "27/03/2026 15:30:25", note: "THIENNGUYEN TRINH VAN THANH VINH PHUC DONG GOP", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "Vĩnh Phúc" },
  { name: "Nguyễn Thị Ngọc Lan", amount: 1000000, type: "DONOR", bank: "Vietcombank", account: "0341****8822", date: "28/03/2026 08:50:40", note: "THIENNGUYEN NGUYEN THI NGOC LAN HAI DUONG", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Hải Dương" },
  { name: "Chu Văn Nam", amount: 1000000, type: "DONOR", bank: "BIDV", account: "4661****3344", date: "28/03/2026 11:22:15", note: "THIENNGUYEN CHU VAN NAM HUNG YEN", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hưng Yên" },
  { name: "Lê Thị Kim Oanh", amount: 1000000, type: "DONOR", bank: "MB Bank", account: "0899****4411", date: "29/03/2026 09:40:50", note: "THIENNGUYEN LE THI KIM OANH THAI BINH UNG HO QUY", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Thái Bình" },
  { name: "Dương Quang Huy", amount: 1000000, type: "DONOR", bank: "Vietcombank", account: "0161****7799", date: "29/03/2026 14:15:30", note: "THIENNGUYEN DUONG QUANG HUY HUE UNG HO TRAI TIM CHO EM", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Thừa Thiên Huế" },
  { name: "Phan Bá Đạt", amount: 1000000, type: "DONOR", bank: "ACB", account: "5678****2233", date: "30/03/2026 10:35:10", note: "THIENNGUYEN PHAN BA DAT QUANG NAM", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Quảng Nam" },
  { name: "Võ Thị Cẩm Tú", amount: 1000000, type: "DONOR", bank: "Sacombank", account: "0601****8844", date: "30/03/2026 16:45:00", note: "THIENNGUYEN VO THI CAM TU BINH DINH UNG HO PHACO", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Bình Định" },
  { name: "Mai Văn Cường", amount: 1000000, type: "DONOR", bank: "BIDV", account: "6011****3322", date: "31/03/2026 09:10:45", note: "THIENNGUYEN MAI VAN CUONG KHANH HOA", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Khánh Hòa" },
  { name: "Nguyễn Tấn Phát", amount: 1000000, type: "DONOR", bank: "VietinBank", account: "1078****9900", date: "31/03/2026 13:50:20", note: "THIENNGUYEN NGUYEN TAN PHAT PHU YEN UNG HO VACHE", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Phú Yên" },
  { name: "Đinh Công Tuấn", amount: 1000000, type: "DONOR", bank: "Agribank", account: "5400****6655", date: "01/04/2026 08:30:15", note: "THIENNGUYEN DINH CONG TUAN LAM DONG", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "Lâm Đồng" },
  { name: "Huỳnh Tấn Minh", amount: 1000000, type: "DONOR", bank: "MB Bank", account: "0977****3388", date: "01/04/2026 11:15:40", note: "THIENNGUYEN HUYNH TAN MINH GIA LAI UNG HO DONG BAO", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Gia Lai" },
  { name: "Lý Quốc Bảo", amount: 1000000, type: "DONOR", bank: "Techcombank", account: "1903****4477", date: "02/04/2026 09:40:00", note: "THIENNGUYEN LY QUOC BAO KON TUM", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Kon Tum" },
  { name: "Nguyễn Hồng Sơn", amount: 1000000, type: "DONOR", bank: "Vietcombank", account: "0281****6633", date: "02/04/2026 15:20:30", note: "THIENNGUYEN NGUYEN HONG SON DAK NONG", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Đắk Nông" },
  { name: "Lâm Thành Long", amount: 1000000, type: "DONOR", bank: "Vietcombank", account: "0081****9911", date: "03/04/2026 10:15:20", note: "THIENNGUYEN LAM THANH LONG BINH PHUOC", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Bình Phước" },
  { name: "Trần Bảo Nam", amount: 1000000, type: "DONOR", bank: "BIDV", account: "7211****4422", date: "03/04/2026 14:40:55", note: "THIENNGUYEN TRAN BAO NAM TAY NINH UNG HO QUY SUC KHOE", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Tây Ninh" },
  { name: "Bùi Văn Thuận", amount: 1000000, type: "DONOR", bank: "Techcombank", account: "1913****8811", date: "04/04/2026 08:55:10", note: "THIENNGUYEN BUI VAN THUAN BA RIA VUNG TAU", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Bà Rịa - Vũng Tàu" },
  { name: "Võ Minh Trọng", amount: 1000000, type: "DONOR", bank: "MB Bank", account: "0908****2255", date: "04/04/2026 11:30:40", note: "THIENNGUYEN VO MINH TRONG LONG AN UNG HO HOI", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "Long An" },
  { name: "Phạm Hữu Tài", amount: 1000000, type: "DONOR", bank: "VietinBank", account: "1068****7744", date: "05/04/2026 09:20:18", note: "THIENNGUYEN PHAM HUU TAI TIEN GIANG DONG GOP", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Tiền Giang" },
  { name: "Trương Công Định", amount: 1000000, type: "DONOR", bank: "Agribank", account: "6900****3311", date: "05/04/2026 15:10:05", note: "THIENNGUYEN TRUONG CONG DINH BEN TRE", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Bến Tre" },
  { name: "Ngô Văn Khải", amount: 1000000, type: "DONOR", bank: "Vietcombank", account: "0711****8855", date: "06/04/2026 10:05:40", note: "THIENNGUYEN NGO VAN KHAI TRA VINH UNG HO", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Trà Vinh" },
  { name: "Đoàn Minh Cảnh", amount: 1000000, type: "DONOR", bank: "Techcombank", account: "1902****9966", date: "06/04/2026 14:25:30", note: "THIENNGUYEN DOAN MINH CANH VINH LONG DONG GOP", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Vĩnh Long" },

  // Micro Donations: Sum = 10,000,000 VND
  { name: "Lê Hữu Nghĩa", amount: 500000, type: "DONOR", bank: "MB Bank", account: "0939****1177", date: "07/04/2026 08:45:22", note: "THIENNGUYEN LE HUU NGHIA DONG THAP", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Đồng Tháp" },
  { name: "Huỳnh Quốc Toàn", amount: 500000, type: "DONOR", bank: "VietinBank", account: "1088****4422", date: "07/04/2026 11:50:10", note: "THIENNGUYEN HUYNH QUOC TOAN AN GIANG UNG HO", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "An Giang" },
  { name: "Trần Thanh Sang", amount: 500000, type: "DONOR", bank: "BIDV", account: "7411****8899", date: "08/04/2026 09:30:15", note: "THIENNGUYEN TRAN THANH SANG KIEN GIANG", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Kiên Giang" },
  { name: "Nguyễn Văn Đức", amount: 500000, type: "DONOR", bank: "Agribank", account: "7900****5533", date: "08/04/2026 14:15:40", note: "THIENNGUYEN NGUYEN VAN DUC HAU GIANG DONG GOP", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hậu Giang" },
  { name: "Dương Minh Vương", amount: 500000, type: "DONOR", bank: "Vietcombank", account: "0321****7722", date: "09/04/2026 10:20:00", note: "THIENNGUYEN DUONG MINH VUONG SOC TRANG", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Sóc Trăng" },
  { name: "Phan Văn Chánh", amount: 500000, type: "DONOR", bank: "MB Bank", account: "0982****4411", date: "09/04/2026 15:40:25", note: "THIENNGUYEN PHAN VAN CHANH BAC LIEU UNG HO", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Bạc Liêu" },
  { name: "Tạ Hữu Phước", amount: 500000, type: "DONOR", bank: "Techcombank", account: "1903****2299", date: "10/04/2026 08:35:10", note: "THIENNGUYEN TA HUU PHUOC CA MAU DONG GOP VACHE", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Cà Mau" },
  { name: "Nguyễn Thị Thảo", amount: 500000, type: "DONOR", bank: "Vietcombank", account: "0011****6644", date: "10/04/2026 09:12:00", note: "THIENNGUYEN NGUYEN THI THAO HA NOI UNG HO", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Hà Nội" },
  { name: "Phạm Hồng Quân", amount: 500000, type: "DONOR", bank: "MB Bank", account: "0988****1234", date: "10/04/2026 09:45:15", note: "THIENNGUYEN PHAM HONG QUAN CHUC CAC CU MAU KHOE", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hải Phòng" },
  { name: "Đỗ Mai Anh", amount: 500000, type: "DONOR", bank: "Techcombank", account: "1902****8833", date: "10/04/2026 10:05:40", note: "THIENNGUYEN DO MAI ANH DONG GOP BAN THIET BI", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "TP. Hồ Chí Minh" },
  { name: "Trần Văn Bình", amount: 500000, type: "DONOR", bank: "BIDV", account: "1231****9944", date: "10/04/2026 10:30:12", note: "THIENNGUYEN TRAN VAN BINH NAM DINH", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Nam Định" },
  { name: "Lê Ngọc Hân", amount: 500000, type: "DONOR", bank: "VietinBank", account: "1048****1177", date: "10/04/2026 11:15:00", note: "THIENNGUYEN LE NGOC HAN DA NANG", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Đà Nẵng" },
  { name: "Vũ Quốc Đạt", amount: 500000, type: "DONOR", bank: "VPBank", account: "1665****2211", date: "10/04/2026 11:42:33", note: "THIENNGUYEN VU QUOC DAT QUANG NINH", campaign: "Nước sạch vệ sinh học đường và trạm y tế buôn làng", prov: "Quảng Ninh" },
  { name: "Hoàng Minh Tâm", amount: 500000, type: "DONOR", bank: "Agribank", account: "2200****7755", date: "10/04/2026 12:10:05", note: "THIENNGUYEN HOANG MINH TAM THAI BINH", campaign: "Chương trình Khám tình nguyện & Cấp phát thuốc miễn phí", prov: "Thái Bình" },
  { name: "Bùi Thị Lan Hương", amount: 500000, type: "DONOR", bank: "TPBank", account: "0442****6611", date: "10/04/2026 12:35:18", note: "THIENNGUYEN BUI THI LAN HUONG UNG HO", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Hà Nội" },
  { name: "Trịnh Thùy Linh", amount: 500000, type: "DONOR", bank: "MB Bank", account: "0971****3399", date: "10/04/2026 13:05:42", note: "THIENNGUYEN TRINH THUY LINH DONG GOP QUY VACHE", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Bắc Ninh" },
  { name: "Lương Gia Bảo", amount: 500000, type: "DONOR", bank: "Vietcombank", account: "0451****8844", date: "10/04/2026 13:20:10", note: "THIENNGUYEN LUONG GIA BAO HA DUONG", campaign: "Tủ thuốc y tế cơ sở vùng sâu vùng xa Tây Bắc", prov: "Hải Dương" },
  { name: "Đặng Thị Thắm", amount: 500000, type: "DONOR", bank: "Techcombank", account: "1903****7722", date: "10/04/2026 13:50:55", note: "THIENNGUYEN DANG THI THAM HUNG YEN", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hưng Yên" },
  { name: "Phan Đình Trọng", amount: 500000, type: "DONOR", bank: "BIDV", account: "3141****5522", date: "10/04/2026 14:15:30", note: "THIENNGUYEN PHAN DINH TRONG UNG HO", campaign: "Ánh sáng học đường & Trái tim cho em", prov: "Nghệ An" },
  { name: "Nguyễn Tuấn Kiệt", amount: 500000, type: "DONOR", bank: "Vietcombank", account: "0011****4488", date: "10/04/2026 14:35:10", note: "THIENNGUYEN NGUYEN TUAN KIET HA NOI", campaign: "Chương trình Khám sàng lọc & Mổ mắt Phaco cho Người cao tuổi", prov: "Hà Nội" }
];

// Check current sum
let totalCharity = charityItems.reduce((acc, item) => acc + item.amount, 0);
console.log(`Computed charity sum: ${totalCharity} VND (Target: 350,000,000 VND)`);

if (totalCharity !== 350000000) {
  throw new Error(`Charity total is ${totalCharity}, must be 350000000`);
}

// 2. Membership fees data
const feeItems = [
  // Major Provincial Chapters & Institutes
  { name: "Liên Chi hội Thành phố Hồ Chí Minh", amount: 15000000, type: "ORGANIZATION", bank: "Vietcombank", account: "0071****9988", date: "05/01/2026 09:30:15", note: "HOIPHI2026 LCH HCM DONG NIEN LIEM NAM 2026", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "TP. Hồ Chí Minh" },
  { name: "Viện Nghiên cứu & Ứng dụng Y học Dân tộc (ICHC)", amount: 10000000, type: "ORGANIZATION", bank: "BIDV", account: "1251****4455", date: "10/01/2026 10:15:20", note: "HOIPHI2026 VIEN ICHC DONG NIEN LIEM TO CHUC 2026", campaign: "Niên liễm Viện/Trung tâm trực thuộc", prov: "Hà Nội" },
  { name: "Viện Dưỡng sinh Tâm thể Việt Nam", amount: 10000000, type: "ORGANIZATION", bank: "MB Bank", account: "0888****2233", date: "15/01/2026 14:40:10", note: "HOIPHI2026 VIEN DUONG SINH TAM THE 2026", campaign: "Niên liễm Viện/Trung tâm trực thuộc", prov: "Hà Nội" },
  { name: "Chi hội Giáo dục CSSK Lê Tiến - Hải Phòng", amount: 5000000, type: "ORGANIZATION", bank: "MB Bank", account: "0912****6677", date: "20/01/2026 10:05:22", note: "HOIPHI2026 CH LE TIEN HP", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Hải Phòng" },
  { name: "Liên Chi hội Krông Pắc - Đắk Lắk", amount: 5000000, type: "ORGANIZATION", bank: "Agribank", account: "5200****3344", date: "01/03/2026 08:50:25", note: "HOIPHI2026 LCH KRONG PAC DAK LAK", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Đắk Lắk" },
  { name: "Chi hội CSSKCĐ Tỉnh Thanh Hóa", amount: 5000000, type: "ORGANIZATION", bank: "VietinBank", account: "1028****7788", date: "25/01/2026 11:20:30", note: "HOIPHI2026 CHI HOI THANH HOA DONG NIEN LIEM", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Thanh Hóa" },
  { name: "Chi hội CSSKCĐ Tỉnh Thái Nguyên", amount: 5000000, type: "ORGANIZATION", bank: "BIDV", account: "3981****2233", date: "28/01/2026 15:10:45", note: "HOIPHI2026 CHI HOI THAI NGUYEN", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Thái Nguyên" },
  { name: "Chi hội CSSKCĐ Tỉnh Quảng Ninh", amount: 5000000, type: "ORGANIZATION", bank: "Vietcombank", account: "0491****5566", date: "05/02/2026 09:35:10", note: "HOIPHI2026 CHI HOI QUANG NINH NIEN LIEM 2026", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Quảng Ninh" },
  { name: "Chi hội CSSKCĐ Tỉnh Thừa Thiên Huế", amount: 5000000, type: "ORGANIZATION", bank: "Techcombank", account: "1903****8899", date: "12/02/2026 14:05:20", note: "HOIPHI2026 CHI HOI THUA THIEN HUE", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Thừa Thiên Huế" },
  { name: "Chi hội CSSKCĐ Tỉnh Nghệ An", amount: 5000000, type: "ORGANIZATION", bank: "Agribank", account: "5100****4411", date: "18/02/2026 10:45:00", note: "HOIPHI2026 CHI HOI NGHE AN DONG NIEN LIEM", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Nghệ An" },
  { name: "Chi hội CSSKCĐ Tỉnh Bắc Ninh", amount: 5000000, type: "ORGANIZATION", bank: "VietinBank", account: "1058****3322", date: "24/02/2026 16:20:15", note: "HOIPHI2026 CHI HOI BAC NINH", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Bắc Ninh" },
  { name: "Chi hội CSSKCĐ Tỉnh Vĩnh Phúc", amount: 5000000, type: "ORGANIZATION", bank: "Vietcombank", account: "0361****7744", date: "02/03/2026 08:40:30", note: "HOIPHI2026 CHI HOI VINH PHUC", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Vĩnh Phúc" },
  { name: "Chi hội CSSKCĐ Tỉnh Nam Định", amount: 5000000, type: "ORGANIZATION", bank: "BIDV", account: "2791****1199", date: "08/03/2026 11:15:10", note: "HOIPHI2026 CHI HOI NAM DINH", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Nam Định" },
  { name: "Chi hội CSSKCĐ Tỉnh Bình Dương", amount: 5000000, type: "ORGANIZATION", bank: "Techcombank", account: "1912****4455", date: "14/03/2026 14:30:25", note: "HOIPHI2026 CHI HOI BINH DUONG", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Bình Dương" },
  { name: "Chi hội CSSKCĐ Tỉnh Đồng Nai", amount: 5000000, type: "ORGANIZATION", bank: "MB Bank", account: "0909****7788", date: "19/03/2026 09:50:40", note: "HOIPHI2026 CHI HOI DONG NAI", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Đồng Nai" },
  { name: "Chi hội CSSKCĐ Tỉnh Tiền Giang", amount: 5000000, type: "ORGANIZATION", bank: "Vietcombank", account: "0671****3322", date: "23/03/2026 15:40:10", note: "HOIPHI2026 CHI HOI TIEN GIANG", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Tiền Giang" },
  { name: "Chi hội CSSKCĐ Tỉnh Cần Thơ", amount: 5000000, type: "ORGANIZATION", bank: "VietinBank", account: "1078****8811", date: "28/03/2026 10:25:35", note: "HOIPHI2026 CHI HOI CAN THO DONG HOI PHI", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Cần Thơ" },
  { name: "Chi hội CSSKCĐ Tỉnh Hải Dương", amount: 5000000, type: "ORGANIZATION", bank: "BIDV", account: "1231****4499", date: "30/03/2026 14:15:20", note: "HOIPHI2026 CHI HOI HAI DUONG", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Hải Dương" },
  { name: "Chi hội CSSKCĐ Tỉnh Hưng Yên", amount: 5000000, type: "ORGANIZATION", bank: "Techcombank", account: "1903****1177", date: "31/03/2026 09:20:30", note: "HOIPHI2026 CHI HOI HUNG YEN", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Hưng Yên" },
  { name: "Chi hội CSSKCĐ Tỉnh Ninh Bình", amount: 5000000, type: "ORGANIZATION", bank: "Vietcombank", account: "0011****5522", date: "01/04/2026 11:35:10", note: "HOIPHI2026 CHI HOI NINH BINH", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Ninh Bình" },
  { name: "Chi hội CSSKCĐ Tỉnh Thái Bình", amount: 5000000, type: "ORGANIZATION", bank: "MB Bank", account: "0977****6622", date: "02/04/2026 15:40:40", note: "HOIPHI2026 CHI HOI THAI BINH DONG PHI", campaign: "Niên liễm Chi hội Tỉnh/Thành phố", prov: "Thái Bình" },
  { name: "Trung tâm Dưỡng sinh CSSK Nhân đạo Tây Hồ", amount: 3000000, type: "ORGANIZATION", bank: "MB Bank", account: "0934****5566", date: "03/04/2026 14:10:20", note: "HOIPHI2026 TT DUONG SINH TAY HO", campaign: "Niên liễm Trung tâm / CLB trực thuộc", prov: "Hà Nội" },
  { name: "Trung tâm Bấm huyệt Thập Thủ Đạo Hà Nội", amount: 3000000, type: "ORGANIZATION", bank: "Techcombank", account: "1903****6611", date: "05/04/2026 09:30:45", note: "HOIPHI2026 TT THAP THU DAO", campaign: "Niên liễm Trung tâm / CLB trực thuộc", prov: "Hà Nội" },
  { name: "Công ty CP Thảo Dược Sức Sống Xanh (Hội viên tổ chức)", amount: 5000000, type: "ORGANIZATION", bank: "Vietcombank", account: "0011****8822", date: "07/04/2026 11:20:10", note: "HOIPHI2026 DOANH NGHIEP SUC SONG XANH", campaign: "Hội phí Hội viên Pháp nhân Doanh nghiệp", prov: "Hà Nội" },
  { name: "Công ty TNHH Thiết bị Trị liệu Ánh Dương (Hội viên tổ chức)", amount: 5000000, type: "ORGANIZATION", bank: "BIDV", account: "1201****3344", date: "08/04/2026 16:15:30", note: "HOIPHI2026 DOANH NGHIEP ANH DUONG", campaign: "Hội phí Hội viên Pháp nhân Doanh nghiệp", prov: "TP. Hồ Chí Minh" },

  // Individual Leadership & Physicians
  { name: "Bác sĩ Nguyễn Văn Hùng", amount: 1000000, type: "MEMBER", bank: "Vietcombank", account: "0041****5566", date: "15/02/2026 16:40:18", note: "HOIPHI2026 NGUYEN VAN HUNG DANANG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Đà Nẵng" },
  { name: "Dược sĩ Lê Văn Khang", amount: 1000000, type: "MEMBER", bank: "MB Bank", account: "0983****2211", date: "22/02/2026 10:12:40", note: "HOIPHI2026 LE VAN KHANG HA NOI", campaign: "Niên liễm Hội viên Cá nhân", prov: "Hà Nội" },
  { name: "Lương y Hoàng Văn Tuệ", amount: 500000, type: "MEMBER", bank: "Agribank", account: "3200****7788", date: "04/03/2026 14:05:15", note: "HOIPHI2026 HOANG VAN TUE THAI BINH", campaign: "Niên liễm Hội viên Cá nhân", prov: "Thái Bình" },
  { name: "Bác sĩ Đinh Thị Mai", amount: 500000, type: "MEMBER", bank: "VietinBank", account: "1038****6655", date: "11/03/2026 09:40:22", note: "HOIPHI2026 DINH THI MAI HAI PHONG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Hải Phòng" },
  { name: "Lương y Phạm Văn Trường", amount: 500000, type: "MEMBER", bank: "Techcombank", account: "1903****1144", date: "17/03/2026 15:30:10", note: "HOIPHI2026 PHAM VAN TRUONG NAM DINH", campaign: "Niên liễm Hội viên Cá nhân", prov: "Nam Định" },

  // Individual General Members (120,000 VND / year standard charter fee)
  { name: "Hội viên Trần Trọng Nghĩa", amount: 120000, type: "MEMBER", bank: "MB Bank", account: "0971****4455", date: "20/03/2026 08:15:30", note: "HOIPHI2026 TRAN TRONG NGHIA HA NOI", campaign: "Niên liễm Hội viên Cá nhân", prov: "Hà Nội" },
  { name: "Hội viên Phan Thanh Thúy", amount: 120000, type: "MEMBER", bank: "Vietcombank", account: "0011****7722", date: "21/03/2026 10:35:40", note: "HOIPHI2026 PHAN THANH THUY HA NOI", campaign: "Niên liễm Hội viên Cá nhân", prov: "Hà Nội" },
  { name: "Hội viên Đỗ Quang Huy", amount: 120000, type: "MEMBER", bank: "Techcombank", account: "1902****3388", date: "23/03/2026 14:20:12", note: "HOIPHI2026 DO QUANG HUY TPHCM", campaign: "Niên liễm Hội viên Cá nhân", prov: "TP. Hồ Chí Minh" },
  { name: "Hội viên Vũ Thị Hồng", amount: 120000, type: "MEMBER", bank: "BIDV", account: "1281****9911", date: "25/03/2026 09:05:45", note: "HOIPHI2026 VU THI HONG BAC GIANG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Bắc Giang" },
  { name: "Hội viên Hoàng Minh Đức", amount: 120000, type: "MEMBER", bank: "Agribank", account: "3900****6644", date: "27/03/2026 11:45:18", note: "HOIPHI2026 HOANG MINH DUC THAI NGUYEN", campaign: "Niên liễm Hội viên Cá nhân", prov: "Thái Nguyên" },
  { name: "Hội viên Bùi Tuấn Anh", amount: 120000, type: "MEMBER", bank: "VietinBank", account: "1058****2255", date: "29/03/2026 15:10:00", note: "HOIPHI2026 BUI TUAN ANH HAI DUONG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Hải Dương" },
  { name: "Hội viên Lê Thị Loan", amount: 120000, type: "MEMBER", bank: "MB Bank", account: "0934****8833", date: "31/03/2026 08:40:25", note: "HOIPHI2026 LE THI LOAN THANH HOA", campaign: "Niên liễm Hội viên Cá nhân", prov: "Thanh Hóa" },
  { name: "Hội viên Nguyễn Quốc Cường", amount: 120000, type: "MEMBER", bank: "Vietcombank", account: "0101****4477", date: "02/04/2026 10:15:30", note: "HOIPHI2026 NGUYEN QUOC CUONG NGHE AN", campaign: "Niên liễm Hội viên Cá nhân", prov: "Nghệ An" },
  { name: "Hội viên Đặng Thị Lan", amount: 120000, type: "MEMBER", bank: "BIDV", account: "3711****5522", date: "04/04/2026 14:05:10", note: "HOIPHI2026 DANG THI LAN HA TINH", campaign: "Niên liễm Hội viên Cá nhân", prov: "Hà Tĩnh" },
  { name: "Hội viên Trương Văn Thắng", amount: 120000, type: "MEMBER", bank: "Agribank", account: "4000****1199", date: "06/04/2026 09:25:40", note: "HOIPHI2026 TRUONG VAN THANG QUANG BINH", campaign: "Niên liễm Hội viên Cá nhân", prov: "Quảng Bình" },
  { name: "Hội viên Nguyễn Thị Thu", amount: 120000, type: "MEMBER", bank: "VietinBank", account: "1098****7744", date: "07/04/2026 11:30:15", note: "HOIPHI2026 NGUYEN THI THU DA NANG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Đà Nẵng" },
  { name: "Hội viên Lâm Văn Thành", amount: 120000, type: "MEMBER", bank: "Techcombank", account: "1903****9922", date: "08/04/2026 15:45:20", note: "HOIPHI2026 LAM VAN THANH BINH DINH", campaign: "Niên liễm Hội viên Cá nhân", prov: "Bình Định" },
  { name: "Hội viên Võ Thị Mỹ Linh", amount: 120000, type: "MEMBER", bank: "MB Bank", account: "0968****3311", date: "09/04/2026 08:50:35", note: "HOIPHI2026 VO THI MY LINH KHANH HOA", campaign: "Niên liễm Hội viên Cá nhân", prov: "Khánh Hòa" },
  { name: "Hội viên Cao Minh Tuấn", amount: 120000, type: "MEMBER", bank: "Vietcombank", account: "0561****6688", date: "09/04/2026 14:10:45", note: "HOIPHI2026 CAO MINH TUAN LAM DONG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Lâm Đồng" },
  { name: "Hội viên Trần Văn Sơn", amount: 120000, type: "MEMBER", bank: "Agribank", account: "5200****8833", date: "10/04/2026 09:05:12", note: "HOIPHI2026 TRAN VAN SON DAK LAK", campaign: "Niên liễm Hội viên Cá nhân", prov: "Đắk Lắk" },
  { name: "Hội viên Nguyễn Thị Phượng", amount: 120000, type: "MEMBER", bank: "Techcombank", account: "1912****7799", date: "10/04/2026 10:20:30", note: "HOIPHI2026 NGUYEN THI PHUONG BINH DUONG", campaign: "Niên liễm Hội viên Cá nhân", prov: "Bình Dương" }
];

const totalFeeSum = feeItems.reduce((acc, item) => acc + item.amount, 0);
console.log(`Verified fee sum: ${totalFeeSum} VND (Count: ${feeItems.length})`);

// Combine and generate full typescript code
let transactionIndex = 1;
const allTransactions = [];

for (const item of charityItems) {
  const codeNum = String(1280 + transactionIndex).padStart(6, '0');
  allTransactions.push({
    id: `fin-${String(transactionIndex).padStart(3, '0')}`,
    code: `VACHE-QR-${codeNum}`,
    targetType: item.type,
    targetName: item.name,
    category: "CHARITY_DONATION",
    amount: item.amount,
    paymentMethod: "VIETQR",
    status: "COMPLETED",
    qrContent: item.note,
    bankSender: item.bank,
    accountMasked: item.account,
    campaignName: item.campaign,
    province: item.prov,
    verified: true,
    createdAt: item.date,
    completedAt: item.date
  });
  transactionIndex++;
}

for (const item of feeItems) {
  const codeNum = String(1280 + transactionIndex).padStart(6, '0');
  allTransactions.push({
    id: `fin-${String(transactionIndex).padStart(3, '0')}`,
    code: `VACHE-QR-${codeNum}`,
    targetType: item.type,
    targetName: item.name,
    category: "ANNUAL_MEMBERSHIP_FEE",
    amount: item.amount,
    paymentMethod: "VIETQR",
    status: "COMPLETED",
    qrContent: item.note,
    bankSender: item.bank,
    accountMasked: item.account,
    campaignName: item.campaign,
    province: item.prov,
    verified: true,
    createdAt: item.date,
    completedAt: item.date
  });
  transactionIndex++;
}

// Sort newest first by parsing date
allTransactions.sort((a, b) => {
  const parseD = (s) => {
    const [dmy, time] = s.split(' ');
    const [d, m, y] = dmy.split('/');
    const [hh, mm, ss] = time.split(':');
    return new Date(y, m - 1, d, hh, mm, ss).getTime();
  };
  return parseD(b.completedAt) - parseD(a.completedAt);
});

// Write to lib/mock-finance-data.ts
const tsContent = `import { FinanceTransaction } from "./db/schema";

/* ==========================================================================
   BẢN SAO KÊ TÀI CHÍNH CÔNG KHAI - MINH BẠCH THỜI GIAN THỰC (VACHE)
   Tích hợp Napas 24/7 & Ngân hàng MB Bank (TK: 1908.2008.8888)
   Tổng Quỹ Thiện Nguyện tiếp nhận: 350.000.000 VNĐ
   Tổng Hội Phí & Niên Liễm toàn quốc: ${new Intl.NumberFormat("vi-VN").format(totalFeeSum)} VNĐ
   Tổng số lượt giao dịch đối soát: ${allTransactions.length} giao dịch
   ========================================================================== */

export const TOTAL_CHARITY_AMOUNT = 350000000;
export const TOTAL_FEE_AMOUNT = ${totalFeeSum};
export const TOTAL_DONATION_GOAL = 500000000;

export const MOCK_FINANCE_TRANSACTIONS: FinanceTransaction[] = ${JSON.stringify(allTransactions, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'mock-finance-data.ts'), tsContent, 'utf8');
console.log(`Successfully generated lib/mock-finance-data.ts with ${allTransactions.length} records!`);
