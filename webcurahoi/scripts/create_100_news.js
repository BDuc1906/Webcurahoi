const fs = require('fs');
const path = require('path');

const IMAGES = [
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&auto=format&fit=crop&q=80'
];

function getImage(idx) {
  return IMAGES[idx % IMAGES.length];
}

const rawArticles = [
  // --- NHÓM 1: SỰ KIỆN TRUNG ƯƠNG HỘI (20 BÀI) ---
  {
    title: 'Hội nghị Ban Thường vụ Trung ương Hội: Triển khai chiến lược Chăm sóc Sức khỏe Cộng đồng đến năm 2030',
    category: 'Sự kiện Trung ương Hội',
    date: '10/10/2026',
    featured: true,
    excerpt: 'Sáng nay tại Cung Trí thức Hà Nội, Ban Thường trực Trung ương Hội đã tổ chức Hội nghị định kỳ đánh giá kết quả công tác và triển khai các chương trình mục tiêu quốc gia về chăm sóc và nâng cao sức khỏe nhân dân toàn diện.'
  },
  {
    title: 'Đồng chí Nguyễn Hồng Quân - Chủ tịch Trung ương Hội chủ trì phiên họp sơ kết công tác 9 tháng đầu năm 2026',
    category: 'Sự kiện Trung ương Hội',
    date: '09/10/2026',
    featured: true,
    excerpt: 'Chủ tịch Nguyễn Hồng Quân nhấn mạnh mục tiêu trọng tâm quý IV là kiện toàn tổ chức cơ sở tại các tỉnh miền Trung và Tây Nguyên, đẩy mạnh ứng dụng chuyển đổi số trong quản lý hội viên.'
  },
  {
    title: 'Trung ương Hội ban hành Nghị quyết số 04/NQ-BCH về tăng cường phòng ngừa bệnh mạn tính không lây nhiễm',
    category: 'Sự kiện Trung ương Hội',
    date: '07/10/2026',
    featured: false,
    excerpt: 'Nghị quyết đề ra 5 nhóm giải pháp then chốt nhằm nâng cao kiến thức của cộng đồng về huyết áp, tim mạch, đái tháo đường và dinh dưỡng hợp lý tại từng tổ dân phố.'
  },
  {
    title: 'Hội nghị Tập huấn Nghiệp vụ Công tác Hội toàn quốc lần thứ IV tại Thủ đô Hà Nội',
    category: 'Sự kiện Trung ương Hội',
    date: '05/10/2026',
    featured: false,
    excerpt: 'Hơn 200 đại biểu đại diện cho các Liên Chi hội, Chi hội và Viện nghiên cứu trên khắp 63 tỉnh thành đã tham dự khóa tập huấn nghiệp vụ quản trị và truyền thông sức khỏe.'
  },
  {
    title: 'Đoàn Chủ tịch Trung ương Hội tiếp và làm việc với Hiệp hội Chăm sóc Sức khỏe Cộng đồng Quốc tế',
    category: 'Sự kiện Trung ương Hội',
    date: '03/10/2026',
    featured: false,
    excerpt: 'Hai bên đã ký kết bản ghi nhớ hợp tác về chuyển giao công nghệ tầm soát sớm bệnh lý tuổi già và trao đổi kinh nghiệm mô hình câu lạc bộ dưỡng sinh sinh thái.'
  },
  {
    title: 'Lễ Trao Kỷ niệm chương Vì Sự nghiệp Giáo dục Chăm sóc Sức khỏe Cộng đồng năm 2026',
    category: 'Sự kiện Trung ương Hội',
    date: '01/10/2026',
    featured: false,
    excerpt: 'Trung ương Hội đã vinh danh và trao Kỷ niệm chương cho 35 cá nhân xuất sắc có nhiều cống hiến to lớn cho phong trào bảo vệ và nâng cao thể lực nhân dân.'
  },
  {
    title: 'Trung ương Hội công bố Quyết định chuẩn y Ban Chấp hành Liên Chi hội Doanh nhân Sức khỏe Sống khỏe',
    category: 'Sự kiện Trung ương Hội',
    date: '28/09/2026',
    featured: false,
    excerpt: 'Phó Chủ tịch kiêm Tổng Thư ký Tạ Quang Vinh đã trao quyết định công nhận tổ chức và định hướng phát triển mạng lưới cung ứng sản phẩm thảo dược sạch đạt chuẩn.'
  },
  {
    title: 'Ban Tuyên giáo và Truyền thông phát động Cuộc thi viết về Tấm gương Thầy thuốc vì cộng đồng 2026',
    category: 'Sự kiện Trung ương Hội',
    date: '26/09/2026',
    featured: false,
    excerpt: 'Cuộc thi nhằm lan tỏa những câu chuyện nhân văn của các y bác sĩ, lương y tận tụy khám chữa bệnh thiện nguyện tại các vùng sâu, vùng xa, biên giới hải đảo.'
  },
  {
    title: 'Hội nghị Trực tuyến Ban Kiểm tra Trung ương Hội về công tác thu nộp hội phí và quản lý tài chính minh bạch',
    category: 'Sự kiện Trung ương Hội',
    date: '24/09/2026',
    featured: false,
    excerpt: 'Ban Kiểm tra đánh giá cao tính công khai, minh bạch của việc triển khai chuẩn thanh toán VietQR kết nối hệ thống ngân hàng tự động trên toàn quốc.'
  },
  {
    title: 'Lễ Ký kết Thỏa thuận Hợp tác Toàn diện giữa Trung ương Hội VACHE và Hội Thầy thuốc Trẻ Việt Nam',
    category: 'Sự kiện Trung ương Hội',
    date: '22/09/2026',
    featured: false,
    excerpt: 'Chương trình phối hợp tập trung vào việc tổ chức các đợt khám bệnh lưu động miễn phí, ứng dụng trí tuệ nhân tạo trong tư vấn sức khỏe từ xa cho người dân.'
  },
  {
    title: 'Ban Thường vụ Trung ương Hội duyệt Kế hoạch Tổ chức Đại hội Đại biểu Toàn quốc Nhiệm kỳ V (2026 - 2031)',
    category: 'Sự kiện Trung ương Hội',
    date: '20/09/2026',
    featured: false,
    excerpt: 'Tiểu ban Nội dung và Tiểu ban Nhân sự báo cáo tiến độ chuẩn bị văn kiện chính trị và đề án nhân sự Ban Chấp hành khóa mới trình cấp có thẩm quyền.'
  },
  {
    title: 'Tọa đàm Chuyên đề: Phát huy vai trò của Y học Cổ truyền kết hợp Y học Hiện đại trong phòng bệnh ban đầu',
    category: 'Sự kiện Trung ương Hội',
    date: '18/09/2026',
    featured: false,
    excerpt: 'Các chuyên gia đầu ngành khẳng định giá trị trường tồn của nam dược, châm cứu, xoa bóp bấm huyệt và dưỡng sinh trong việc giảm tải áp lực cho bệnh viện tuyến trên.'
  },
  {
    title: 'Trung ương Hội ban hành Hướng dẫn thành lập Câu lạc bộ Sức khỏe Người cao tuổi tại xã, phường, thị trấn',
    category: 'Sự kiện Trung ương Hội',
    date: '15/09/2026',
    featured: false,
    excerpt: 'Văn bản hướng dẫn chuẩn hóa mô hình sinh hoạt rèn luyện thể dục dưỡng sinh kinh lạc, khiêu vũ dưỡng sinh và chế độ dinh dưỡng phòng ngừa loãng xương.'
  },
  {
    title: 'Đoàn Thường trực Hội làm việc với Tỉnh ủy, UBND tỉnh Quảng Ninh về phát triển chi hội cơ sở vùng mỏ',
    category: 'Sự kiện Trung ương Hội',
    date: '12/09/2026',
    featured: false,
    excerpt: 'Lãnh đạo tỉnh Quảng Ninh cam kết tạo điều kiện thuận lợi để Hội triển khai các chương trình khám sàng lọc bệnh nghề nghiệp phổi và hô hấp cho công nhân mỏ than.'
  },
  {
    title: 'Khen thưởng Đột xuất 5 tập thể có thành tích xuất sắc trong công tác phòng chống dịch bệnh mùa mưa lũ',
    category: 'Sự kiện Trung ương Hội',
    date: '10/09/2026',
    featured: false,
    excerpt: 'Chủ tịch Hội ký Quyết định khen thưởng các đơn vị đã kịp thời cấp phát Cloramin B, thuốc tiêu hóa và túi sơ cứu cho bà con vùng ngập lụt miền Trung.'
  },
  {
    title: 'Hội thảo Quốc gia: Chuyển đổi số trong quản lý dữ liệu sức khỏe cộng đồng và cấp Thẻ Hội viên điện tử',
    category: 'Sự kiện Trung ương Hội',
    date: '08/09/2026',
    featured: false,
    excerpt: 'Hội đồng Khoa học thảo luận giải pháp tích hợp mã định danh hội viên với Cổng Dịch vụ công Quốc gia và VNeID để tra cứu hồ sơ thuận tiện.'
  },
  {
    title: 'Ban Khoa học & Đào tạo nghiệm thu Đề tài Nghiên cứu Ứng dụng Bài thuốc dân gian chữa thoái hóa khớp',
    category: 'Sự kiện Trung ương Hội',
    date: '05/09/2026',
    featured: false,
    excerpt: 'Đề tài do Viện Nghiên cứu Chăm sóc Sức khỏe ICHC chủ trì được Hội đồng khoa học đánh giá xuất sắc, mở ra hướng ứng dụng an toàn không tác dụng phụ.'
  },
  {
    title: 'Trung ương Hội gửi Thư chúc mừng Ngày Quốc tế Người cao tuổi 01/10 đến toàn thể hội viên cả nước',
    category: 'Sự kiện Trung ương Hội',
    date: '30/08/2026',
    featured: false,
    excerpt: 'Khẳng định người cao tuổi là vốn quý của dân tộc, là nòng cốt trong các phong trào tự chăm sóc sức khỏe, nêu gương sáng cho con cháu noi theo.'
  },
  {
    title: 'Đoàn Giám sát Trung ương Hội kiểm tra hoạt động chi hội tại các tỉnh đồng bằng Sông Hồng',
    category: 'Sự kiện Trung ương Hội',
    date: '28/08/2026',
    featured: false,
    excerpt: 'Đoàn công tác ghi nhận nỗ lực phát triển hội viên và đề nghị các đơn vị tiếp tục chuẩn hóa hồ sơ pháp lý theo đúng quy định của Bộ Nội vụ.'
  },
  {
    title: 'Hội nghị Ban Thường trực: Đánh giá tiến độ Đề án Xã hội hóa Y tế và Giáo dục Sức khỏe giai đoạn mới',
    category: 'Sự kiện Trung ương Hội',
    date: '25/08/2026',
    featured: false,
    excerpt: 'Đẩy mạnh huy động nguồn lực từ các doanh nghiệp y dược và tổ chức xã hội để triển khai các trạm sơ cấp cứu thiện nguyện tại vùng cao.'
  },

  // --- NHÓM 2: THỜI SỰ 24/7 & CẢNH BÁO Y TẾ (20 BÀI) ---
  {
    title: 'Thời sự 24/7: Cảnh báo gia tăng đột quỵ mùa chuyển lạnh và cẩm nang sơ cứu tại gia đình',
    category: 'Thời sự 24/7',
    date: '10/10/2026',
    featured: true,
    excerpt: 'Thời tiết chuyển mùa thu đông là giai đoạn huyết áp biến động nguy hiểm. Bác sĩ Trung ương Hội hướng dẫn quy tắc FAST để nhận diện sớm và xử trí giờ vàng cấp cứu.'
  },
  {
    title: 'Thời sự 24/7: Hướng dẫn người dân phòng ngừa ngộ độc thực phẩm trong mùa lễ hội và tiệc cưới',
    category: 'Thời sự 24/7',
    date: '09/10/2026',
    featured: false,
    excerpt: 'Chuyên gia an toàn thực phẩm khuyến cáo các biện pháp kiểm soát nguồn gốc thực phẩm tươi sống, bảo quản đúng nhiệt độ và ăn chín uống sôi triệt để.'
  },
  {
    title: 'Thời sự 24/7: Khuyến cáo chế độ dinh dưỡng cân bằng và giải pháp giảm muối trong bữa ăn người Việt',
    category: 'Thời sự 24/7',
    date: '08/10/2026',
    featured: false,
    excerpt: 'Thói quen ăn mặn là nguyên nhân hàng đầu gây tăng huyết áp và suy thận. Hội phát động chiến dịch "Bớt một thìa muối - Thêm mười năm tuổi thọ".'
  },
  {
    title: 'Thời sự 24/7: Dịch sốt xuất huyết diễn biến phức tạp tại các đô thị lớn: Biện pháp diệt bọ gậy tận gốc',
    category: 'Thời sự 24/7',
    date: '07/10/2026',
    featured: false,
    excerpt: 'Các Chi hội địa phương phối hợp với trạm y tế phường xã ra quân dọn dẹp vệ sinh môi trường, lật úp dụng cụ chứa nước đọng và thả cá bảy màu.'
  },
  {
    title: 'Thời sự 24/7: Xu hướng ứng dụng thiền dưỡng sinh và thở bụng khí công trong giảm căng thẳng đô thị',
    category: 'Thời sự 24/7',
    date: '06/10/2026',
    featured: false,
    excerpt: 'Nghiên cứu lâm sàng cho thấy 20 phút tập thở sâu mỗi ngày giúp giảm 30% hormone cortisol gây căng thẳng và cải thiện đáng kể giấc ngủ tự nhiên.'
  },
  {
    title: 'Thời sự 24/7: Cảnh báo bẫy lừa đảo thực phẩm chức năng giả mạo danh xưng Bác sĩ Viện Trung ương',
    category: 'Thời sự 24/7',
    date: '05/10/2026',
    featured: false,
    excerpt: 'Trung ương Hội khuyến cáo người dân không mua thuốc không rõ nguồn gốc qua mạng xã hội, chỉ sử dụng sản phẩm được cấp phép của Cục An toàn Thực phẩm.'
  },
  {
    title: 'Thời sự 24/7: Lợi ích của việc đi bộ 6.000 bước mỗi ngày đối với sức khỏe xương khớp người trung niên',
    category: 'Thời sự 24/7',
    date: '04/10/2026',
    featured: false,
    excerpt: 'Vận động thể lực vừa sức kích thích tuần hoàn dịch khớp, hạn chế cứng khớp buổi sáng và tăng cường mật độ khoáng chất của xương.'
  },
  {
    title: 'Thời sự 24/7: Các biện pháp chăm sóc sức khỏe tâm thần và giảm nguy cơ sa sút trí tuệ ở tuổi già',
    category: 'Thời sự 24/7',
    date: '03/10/2026',
    featured: false,
    excerpt: 'Khuyến khích người cao tuổi tham gia câu lạc bộ thơ ca, cờ tướng, sinh hoạt cộng đồng để duy trì hoạt động của não bộ và tinh thần lạc quan.'
  },
  {
    title: 'Thời sự 24/7: Tác hại của khói thuốc lá thụ động đối với hệ hô hấp của phụ nữ và trẻ nhỏ',
    category: 'Thời sự 24/7',
    date: '02/10/2026',
    featured: false,
    excerpt: 'Hội kêu gọi xây dựng môi trường gia đình và công sở không khói thuốc, bảo vệ lá phổi của những người thân yêu trước các hạt bụi mịn độc hại.'
  },
  {
    title: 'Thời sự 24/7: Hướng dẫn chăm sóc răng miệng đúng cách để phòng ngừa các bệnh tim mạch mạn tính',
    category: 'Thời sự 24/7',
    date: '01/10/2026',
    featured: false,
    excerpt: 'Vi khuẩn viêm nha chu có thể xâm nhập dòng máu làm tăng nguy cơ hình thành mảng xơ vữa động mạch. Khám nha khoa định kỳ 6 tháng một lần là cần thiết.'
  },
  {
    title: 'Thời sự 24/7: Cách nhận biết triệu chứng mất nước âm thầm ở người lớn tuổi trong những ngày hanh khô',
    category: 'Thời sự 24/7',
    date: '29/09/2026',
    featured: false,
    excerpt: 'Cảm giác khát ở người cao tuổi thường suy giảm. Cần chủ động uống từng ngụm nước ấm nhỏ đều đặn trong ngày để tránh cô đặc máu và nghẽn mạch.'
  },
  {
    title: 'Thời sự 24/7: Vai trò của trà thảo mộc giảo cổ lam và nấm linh chi trong hạ men gan, ổn định đường huyết',
    category: 'Thời sự 24/7',
    date: '27/09/2026',
    featured: false,
    excerpt: 'Saponin trong giảo cổ lam giúp tăng nhạy cảm insulin của tế bào, hỗ trợ chuyển hóa lipid máu an toàn khi kết hợp chế độ ăn uống khoa học.'
  },
  {
    title: 'Thời sự 24/7: Phòng ngừa chấn thương té ngã ở người già: Hướng dẫn cải tạo an toàn không gian nhà ở',
    category: 'Thời sự 24/7',
    date: '25/09/2026',
    featured: false,
    excerpt: 'Lắp đặt thanh vịn nhà tắm, gạch chống trơn, đủ ánh sáng lối đi là những giải pháp đơn giản nhưng giúp ngăn chặn 70% nguy cơ gãy cổ xương đùi.'
  },
  {
    title: 'Thời sự 24/7: Khám phá công dụng của các loại rau gia vị Việt Nam: Tỏi, gừng, tía tô, kinh giới trong giải cảm',
    category: 'Thời sự 24/7',
    date: '23/09/2026',
    featured: false,
    excerpt: 'Tủ thuốc tự nhiên ngay trong gian bếp người Việt với các hoạt chất kháng sinh thực vật tự nhiên giúp nâng cao sức đề kháng hiệu quả.'
  },
  {
    title: 'Thời sự 24/7: Tầm soát đái tháo đường thai kỳ: Những điều bà mẹ trẻ cần đặc biệt lưu tâm',
    category: 'Thời sự 24/7',
    date: '21/09/2026',
    featured: false,
    excerpt: 'Nghiệm pháp dung nạp glucose ở tuần thai 24 - 28 giúp phát hiện sớm rối loạn chuyển hóa đường, bảo vệ an toàn tối đa cho mẹ và thai nhi.'
  },
  {
    title: 'Thời sự 24/7: Thực trạng thiếu hụt Vitamin D ở cư dân thành thị và giải pháp tắm nắng thông minh',
    category: 'Thời sự 24/7',
    date: '19/09/2026',
    featured: false,
    excerpt: 'Thói quen làm việc trong phòng máy lạnh khiến tỷ lệ thiếu Vitamin D gia tăng. Tắm nắng sớm 15 phút mỗi ngày giúp hấp thụ canxi tối ưu.'
  },
  {
    title: 'Thời sự 24/7: Cẩm nang sơ cấp cứu bỏng nước sôi và dị vật đường thở cho trẻ em tại hộ gia đình',
    category: 'Thời sự 24/7',
    date: '17/09/2026',
    featured: false,
    excerpt: 'Thao tác vỗ lưng ấn ngực đúng kỹ thuật giúp tống xuất dị vật trong vài giây cứu sống trẻ thoát khỏi nguy cơ ngạt thở tử vong.'
  },
  {
    title: 'Thời sự 24/7: Hiểu đúng về chỉ số khối cơ thể (BMI) và vòng eo chuẩn cho thể trạng người châu Á',
    category: 'Thời sự 24/7',
    date: '15/09/2026',
    featured: false,
    excerpt: 'Vòng eo nam giới trên 90cm và nữ giới trên 80cm là dấu hiệu cảnh báo mỡ nội tạng nguy hiểm, tiềm ẩn nguy cơ gan nhiễm mỡ và xơ vữa mạch.'
  },
  {
    title: 'Thời sự 24/7: Chăm sóc giấc ngủ tự nhiên không dùng thuốc ngủ: Liệu pháp ánh sáng và vệ sinh giấc ngủ',
    category: 'Thời sự 24/7',
    date: '13/09/2026',
    featured: false,
    excerpt: 'Hạn chế nhìn màn hình điện thoại trước giờ ngủ 1 tiếng và ngâm chân nước ấm giúp kích hoạt hệ thần kinh phó giao cảm đưa cơ thể vào giấc ngủ sâu.'
  },
  {
    title: 'Thời sự 24/7: Giữ ấm đôi bàn chân và huyệt Dũng Tuyền - Bí quyết sống thọ của người Á Đông',
    category: 'Thời sự 24/7',
    date: '11/09/2026',
    featured: false,
    excerpt: 'Day bấm huyệt Dũng Tuyền dưới lòng bàn chân mỗi tối giúp bổ thận khí, giáng hỏa, an thần và ổn định huyết áp cho người cao tuổi.'
  },

  // --- NHÓM 3: HOẠT ĐỘNG ĐỊA PHƯƠNG 63 TỈNH THÀNH (25 BÀI) ---
  {
    title: 'Hải Phòng: Lễ ra mắt Chi hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Lê Tiến và khám sàng lọc cho 1.200 người cao tuổi',
    category: 'Hoạt động Địa phương',
    date: '08/10/2026',
    featured: true,
    excerpt: 'Tại thành phố cảng Hải Phòng, Chi hội Lê Tiến chính thức công bố quyết định thành lập và trao tặng 1.200 suất thuốc bổ, tư vấn dinh dưỡng dưỡng sinh cho người cao tuổi có công với cách mạng.'
  },
  {
    title: 'TP. Hồ Chí Minh: Văn phòng Thường trực phía Nam tổ chức Hội nghị sơ kết công tác chăm sóc sức khỏe cộng đồng Đông Nam Bộ',
    category: 'Hoạt động Địa phương',
    date: '06/10/2026',
    featured: true,
    excerpt: 'Tại số 67 Bình Lợi, đại diện các Liên Chi hội và Chi hội khu vực TP.HCM, Bình Dương, Đồng Nai, Bà Rịa - Vũng Tàu đã thảo luận giải pháp đưa kiến thức tự chăm sóc sức khỏe đến từng khu dân cư và doanh nghiệp.'
  },
  {
    title: 'Đà Nẵng: Thành lập mạng lưới Chi hội Thanh Khê và chuỗi tập huấn sơ cấp cứu ban đầu trong học đường',
    category: 'Hoạt động Địa phương',
    date: '02/10/2026',
    featured: false,
    excerpt: 'Cơ quan Thường trực Miền Trung phối hợp với Sở Y tế TP. Đà Nẵng bồi dưỡng kỹ năng xử lý hóc dị vật, đuối nước và gãy xương cho 450 giáo viên mầm non và tiểu học.'
  },
  {
    title: 'Đắk Lắk: Liên chi hội Krông Pắc triển khai chiến dịch Nước sạch và dinh dưỡng khỏe mạnh cho buôn làng Tây Nguyên',
    category: 'Hoạt động Địa phương',
    date: '29/09/2026',
    featured: true,
    excerpt: 'Đoàn y bác sĩ thiện nguyện đã trao tặng hệ thống lọc nước RO công suất lớn và hướng dẫn phụ nữ Ê đê chế biến thực phẩm bảo đảm vi chất cho trẻ nhỏ.'
  },
  {
    title: 'Cần Thơ: Khám sàng lọc bệnh võng mạc đái tháo đường và phát thuốc miễn phí cho người dân quận Ninh Kiều',
    category: 'Hoạt động Địa phương',
    date: '27/09/2026',
    featured: false,
    excerpt: 'Hơn 800 bà con nghèo tại các cồn cù lao trên sông Hậu được soi đáy mắt kỹ thuật số và nhận túi thuốc bổ mắt miễn phí trị giá 500.000 đồng/suất.'
  },
  {
    title: 'Nghệ An: Trung tâm Phục hồi VN HOUSE (Diễn Châu) tổ chức tuần lễ châm cứu miễn phí cho thương bệnh binh',
    category: 'Hoạt động Địa phương',
    date: '25/09/2026',
    featured: false,
    excerpt: 'Hoạt động tri ân ngày thương binh liệt sĩ và chăm sóc sức khỏe cựu chiến binh bị di chứng vết thương chiến tranh và đau thần kinh tọa.'
  },
  {
    title: 'Quảng Ninh: Chi hội Y tế Than Cẩm Phả tập huấn phòng chống bụi phổi và bệnh nghề nghiệp cho công nhân lò',
    category: 'Hoạt động Địa phương',
    date: '23/09/2026',
    featured: false,
    excerpt: 'Phổ biến bài tập thở thanh lọc đường hô hấp và cung cấp khẩu trang đạt chuẩn chống bụi than mịn N95 cho các phân xưởng khai thác hầm lò.'
  },
  {
    title: 'Phú Thọ: Phát triển vườn cây thuốc nam gia đình tại các xã miền núi huyện Thanh Sơn',
    category: 'Hoạt động Địa phương',
    date: '21/09/2026',
    featured: false,
    excerpt: 'Hướng dẫn bà con trồng cây xạ đen, cà gai leo, khôi nhung và hoàn ngọc để vừa làm thuốc tự chữa bệnh vừa phát triển kinh tế gia đình.'
  },
  {
    title: 'Thừa Thiên Huế: Chi hội Dưỡng sinh Y học Cổ truyền tổ chức Hội diễn Khí công dưỡng sinh bên bờ sông Hương',
    category: 'Hoạt động Địa phương',
    date: '19/09/2026',
    featured: false,
    excerpt: 'Gần 1.000 hội viên cao tuổi đồng diễn bài Thái Cực Quyền 24 thức và Bát Đoạn Cẩm, tạo nét đẹp văn hóa thể thao nâng cao tuổi thọ xứ kinh kỳ.'
  },
  {
    title: 'Kiên Giang: Đoàn y tế thiện nguyện vượt biển khám bệnh, cấp thuốc cho quân và dân đảo Nam Du và Phú Quốc',
    category: 'Hoạt động Địa phương',
    date: '17/09/2026',
    featured: false,
    excerpt: 'Mang trang thiết bị siêu âm màu xách tay, điện tim vượt sóng ra hải đảo xa xôi phục vụ chiến sĩ biên phòng và ngư dân bám biển.'
  },
  {
    title: 'Lâm Đồng: Khởi động Mô hình Làng Sinh thái Dưỡng sinh Nghỉ dưỡng Sức khỏe tại huyện Lạc Dương',
    category: 'Hoạt động Địa phương',
    date: '15/09/2026',
    featured: false,
    excerpt: 'Tận dụng khí hậu trong lành và rừng thông Đà Lạt để phát triển liệu pháp tắm rừng (Shinrin-yoku) giúp thanh lọc phổi và tái tạo năng lượng thể chất.'
  },
  {
    title: 'Bình Dương: Hội thảo Phòng ngừa Thoái hóa Cột sống và Hội chứng ống cổ tay cho nữ công nhân may mặc',
    category: 'Hoạt động Địa phương',
    date: '13/09/2026',
    featured: false,
    excerpt: 'Hướng dẫn các động tác kéo giãn cơ tại chỗ trong giờ giải lao 5 phút giúp phòng tránh đau mỏi vai gáy kinh niên cho người lao động dây chuyền.'
  },
  {
    title: 'Đồng Nai: Lễ công bố Quyết định kết nạp 150 hội viên mới thuộc Chi hội Dưỡng sinh Biên Hòa',
    category: 'Hoạt động Địa phương',
    date: '11/09/2026',
    featured: false,
    excerpt: 'Ghi nhận sự lớn mạnh nhanh chóng của phong trào rèn luyện sức khỏe cơ sở với 12 câu lạc bộ đi bộ và dưỡng sinh hoạt động đều đặn mỗi sáng.'
  },
  {
    title: 'Thái Nguyên: Khám phát hiện sớm ung thư vú và ung thư cổ tử cung cho 600 phụ nữ vùng chè Tân Cương',
    category: 'Hoạt động Địa phương',
    date: '09/09/2026',
    featured: false,
    excerpt: 'Chương trình hợp tác giữa Chi hội tỉnh và Bệnh viện Trung ương Thái Nguyên mang lại sự an tâm cho chị em phụ nữ nông thôn vùng sâu.'
  },
  {
    title: 'Lào Cai: Trao tặng 500 chăn ấm và tủ thuốc y tế học đường cho các điểm trường mầm non Sa Pa',
    category: 'Hoạt động Địa phương',
    date: '07/09/2026',
    featured: false,
    excerpt: 'Chuẩn bị điều kiện giữ ấm cho học sinh dân tộc Mông, Dao trước mùa đông băng giá vùng cao Hoàng Liên Sơn.'
  },
  {
    title: 'Hà Tĩnh: Chi hội Giáo dục Sức khỏe Hồng Lĩnh trao 50 xe lăn cho người khuyết tật và nạn nhân chất độc da cam',
    category: 'Hoạt động Địa phương',
    date: '05/09/2026',
    featured: false,
    excerpt: 'Hỗ trợ phương tiện đi lại giúp các mảnh đời kém may mắn hòa nhập cộng đồng và tự chủ hơn trong sinh hoạt thường nhật.'
  },
  {
    title: 'Quảng Nam: Khánh thành Nhà văn hóa dưỡng sinh cộng đồng tại xã đảo Tam Hải huyện Núi Thành',
    category: 'Hoạt động Địa phương',
    date: '03/09/2026',
    featured: false,
    excerpt: 'Công trình do nguồn quỹ xã hội hóa của Hội tài trợ, là điểm hẹn rèn luyện sức khỏe, đo huyết áp định kỳ của ngư dân địa phương.'
  },
  {
    title: 'An Giang: Mô hình Chăm sóc Sức khỏe Dân số Vùng Biên giới Tịnh Biên đạt hiệu quả tích cực',
    category: 'Hoạt động Địa phương',
    date: '01/09/2026',
    featured: false,
    excerpt: 'Phối hợp với lực lượng quân y biên phòng tuyên truyền kế hoạch hóa gia đình và tiêm chủng mở rộng đầy đủ cho con em đồng bào Khmer.'
  },
  {
    title: 'Sơn La: Tuyên truyền phòng chống ngộ độc nấm rừng và cây độc tự nhiên tại các bản vùng cao Mộc Châu',
    category: 'Hoạt động Địa phương',
    date: '28/08/2026',
    featured: false,
    excerpt: 'Phát tờ rơi hình ảnh minh họa nhận diện nấm độc bằng tiếng phổ thông và tiếng Thái, ngăn ngừa tai nạn thương tâm trong mùa mưa.'
  },
  {
    title: 'Bà Rịa - Vũng Tàu: Giải bơi lội dưỡng sinh người cao tuổi trên biển thu hút 400 vận động viên tham gia',
    category: 'Hoạt động Địa phương',
    date: '26/08/2026',
    featured: false,
    excerpt: 'Khẳng định tinh thần sống vui, sống khỏe, sống có ích, khích lệ phong trào thể thao dưới nước rèn luyện tim mạch dẻo dai.'
  },
  {
    title: 'Nam Định: Chi hội Hải Hậu xây dựng mô hình "Gia đình không có người nghiện rượu và thuốc lá"',
    category: 'Hoạt động Địa phương',
    date: '24/08/2026',
    featured: false,
    excerpt: 'Gắn tiêu chí sống khỏe vào phong trào xây dựng Nông thôn mới kiểu mẫu, tạo chuyển biến rõ nét trong nếp sống văn minh làng quê.'
  },
  {
    title: 'Khánh Hòa: Tư vấn dinh dưỡng và tặng sữa dinh dưỡng cho trẻ em nghèo huyện miền núi Khánh Sơn',
    category: 'Hoạt động Địa phương',
    date: '22/08/2026',
    featured: false,
    excerpt: 'Góp phần giảm tỷ lệ suy dinh dưỡng thấp còi ở trẻ em người Raglai thông qua can thiệp dinh dưỡng vi chất sớm 1.000 ngày đầu đời.'
  },
  {
    title: 'Gia Lai: Chi hội Pleiku phát động chiến dịch Đo huyết áp miễn phí tại các chợ truyền thống và bến xe',
    category: 'Hoạt động Địa phương',
    date: '20/08/2026',
    featured: false,
    excerpt: 'Phát hiện sớm hàng trăm trường hợp huyết áp cao kịch phát không có triệu chứng, kịp thời chuyển tuyến điều trị an toàn.'
  },
  {
    title: 'Cà Mau: Đưa y tế lưu động bằng vỏ lãi xuồng máy đến khám bệnh cho nhân dân vùng rừng đước Đất Mũi',
    category: 'Hoạt động Địa phương',
    date: '18/08/2026',
    featured: false,
    excerpt: 'Không ngại sông nước cách trở, các thầy thuốc áo trắng mang niềm vui và sức khỏe đến tận chòi canh tôm xa xôi nơi cực Nam Tổ quốc.'
  },
  {
    title: 'Tiền Giang: Chi hội Mỹ Tho tổ chức chuyên đề Thực dưỡng thanh lọc cơ thể bằng ngũ cốc hữu cơ',
    category: 'Hoạt động Địa phương',
    date: '16/08/2026',
    featured: false,
    excerpt: 'Hướng dẫn phương pháp ăn thực dưỡng cân bằng âm dương, sử dụng gạo lứt tím than và các loại hạt sen, đậu quê giải độc gan.'
  },

  // --- NHÓM 4: VIỆN, TRƯỜNG ĐÀO TẠO & SỨC KHỎE HỌC ĐƯỜNG ("TRƯỜNG") (20 BÀI) ---
  {
    title: 'Viện Nghiên cứu ICHC ký kết hợp tác Đào tạo Kỹ thuật Chăm sóc Sức khỏe với Trường Đại học Y Hà Nội',
    category: 'Viện - Trường Đào tạo',
    date: '10/10/2026',
    featured: true,
    excerpt: 'Hai đơn vị phối hợp xây dựng khung chương trình bồi dưỡng thực hành cấp chứng chỉ Chăm sóc Sức khỏe Ban đầu và Phục hồi Chức năng tại cộng đồng.'
  },
  {
    title: 'Bộ Y tế phối hợp Trung ương Hội VACHE phát động Chương trình "Sức khỏe học đường và Dinh dưỡng thế hệ tương lai"',
    category: 'Viện - Trường Đào tạo',
    date: '09/10/2026',
    featured: true,
    excerpt: 'Đề án hướng tới mục tiêu 100% học sinh các trường tiểu học, THCS được kiểm tra thị lực, cột sống và hướng dẫn bữa ăn học đường cân đối vi chất dinh dưỡng.'
  },
  {
    title: 'Trường Đại học Y Dược TP. Hồ Chí Minh phối hợp tổ chức Hội thảo Khoa học: Y học Lối sống và Sức khỏe Cộng đồng',
    category: 'Viện - Trường Đào tạo',
    date: '07/10/2026',
    featured: false,
    excerpt: 'Các giáo sư, tiến sĩ chia sẻ bằng chứng lâm sàng về vai trò của dinh dưỡng thực vật, giấc ngủ và vận động trong đảo ngược bệnh lý tim mạch.'
  },
  {
    title: 'Viện Nấm Dược liệu chuyển giao công nghệ nuôi cấy Đông trùng hạ thảo cho các hợp tác xã thanh niên khởi nghiệp',
    category: 'Viện - Trường Đào tạo',
    date: '04/10/2026',
    featured: false,
    excerpt: 'Mở ra hướng phát triển kinh tế dược liệu sạch giá trị cao, tạo nguồn nguyên liệu chuẩn hóa cho các sản phẩm bồi bổ sức khỏe cộng đồng.'
  },
  {
    title: 'Học viện Y Dược học Cổ truyền Việt Nam bồi dưỡng kỹ thuật Châm cứu không dùng kim cho 120 hội viên Trung ương Hội',
    category: 'Viện - Trường Đào tạo',
    date: '02/10/2026',
    featured: false,
    excerpt: 'Ứng dụng từ trường và quang học hồng ngoại tác động huyệt đạo an toàn, không đau, phù hợp triển khai tại các câu lạc bộ dưỡng sinh cơ sở.'
  },
  {
    title: 'Hội nghị Khoa học Trẻ: Sáng kiến Chăm sóc Sức khỏe Học sinh Sinh viên trong kỷ nguyên số tại ĐH Quốc gia Hà Nội',
    category: 'Viện - Trường Đào tạo',
    date: '30/09/2026',
    featured: false,
    excerpt: 'Các bạn sinh viên y khoa trình bày giải pháp ứng dụng trí tuệ nhân tạo phát hiện sớm hội chứng bàn tay chữ nhật và mỏi mắt do máy tính.'
  },
  {
    title: 'Trường Đại học Y Dược Cần Thơ khai giảng Khóa tập huấn Kỹ năng Tư vấn Sức khỏe Người cao tuổi vùng Mekong',
    category: 'Viện - Trường Đào tạo',
    date: '28/09/2026',
    featured: false,
    excerpt: 'Trang bị kiến thức tâm lý người già, chế độ dinh dưỡng cho người suy tim và kỹ năng giao tiếp truyền cảm cho các tình nguyện viên cơ sở.'
  },
  {
    title: 'Chiến dịch Khám Mắt học đường: Đo tật khúc xạ và tặng 1.500 cặp kính thuốc cho học sinh nghèo tỉnh Thái Bình',
    category: 'Viện - Trường Đào tạo',
    date: '26/09/2026',
    featured: false,
    excerpt: 'Kịp thời can thiệp cận thị tiến triển, giúp các em học sinh có thị lực sáng rõ để tiếp thu bài giảng tốt trong năm học mới.'
  },
  {
    title: 'Trường THPT Chuyên Hà Nội - Amsterdam hưởng ứng Ngày hội Thể thao và Sức khỏe Học đường VACHE 2026',
    category: 'Viện - Trường Đào tạo',
    date: '24/09/2026',
    featured: false,
    excerpt: 'Hơn 2.000 học sinh tham gia chạy tiếp sức, kiểm tra thể lực định kỳ và nghe chuyên gia tâm lý tư vấn giải tỏa áp lực mùa thi cử.'
  },
  {
    title: 'Viện Nghiên cứu Đào tạo ICHC tổ chức Khóa cấp chứng chỉ Kỹ thuật viên Dưỡng sinh Trị liệu Khóa 18',
    category: 'Viện - Trường Đào tạo',
    date: '22/09/2026',
    featured: false,
    excerpt: 'Học viên được đào tạo chuyên sâu về giải phẫu sinh lý cơ bản, 14 đường kinh lạc và các thủ thuật xoa bóp bấm huyệt phục hồi cơ bắp.'
  },
  {
    title: 'Đề án Sữa học đường an toàn: Kiểm tra chất lượng vi chất và an toàn vệ sinh thực phẩm tại các trường mầm non',
    category: 'Viện - Trường Đào tạo',
    date: '20/09/2026',
    featured: false,
    excerpt: 'Đoàn kiểm tra liên ngành khẳng định nguồn sữa học đường đạt tiêu chuẩn dinh dưỡng quốc gia, bổ sung canxi và vitamin D3 đúng tỷ lệ.'
  },
  {
    title: 'Trường Đại học Y Dược Huế mở lớp bồi dưỡng Kiến thức Dược lý Cây thuốc dân gian Miền Trung',
    category: 'Viện - Trường Đào tạo',
    date: '18/09/2026',
    featured: false,
    excerpt: 'Hệ thống hóa kinh nghiệm sử dụng các bài thuốc quý của đồng bào dân tộc Pa Cô, Cơ Tu trong điều trị sốt rét rừng và vết thương khớp.'
  },
  {
    title: 'Hội thảo Sức khỏe Cột sống Học đường: Báo động tình trạng cong vẹo cột sống do cặp sách quá nặng',
    category: 'Viện - Trường Đào tạo',
    date: '16/09/2026',
    featured: false,
    excerpt: 'Chuyên gia cơ xương khớp khuyến cáo phụ huynh chọn cặp quai đeo trợ lực hai bên và giữ trọng lượng cặp không vượt quá 10% cân nặng trẻ.'
  },
  {
    title: 'Viện Y học Bản địa Việt Nam hợp tác nghiên cứu bảo tồn gen quý Sâm Ngọc Linh và Sâm Bố Chính',
    category: 'Viện - Trường Đào tạo',
    date: '14/09/2026',
    featured: false,
    excerpt: 'Ứng dụng nuôi cấy mô tế bào thực vật để nhân giống vô tính sâm quý, bảo vệ nguồn gen thảo dược quốc gia trước nguy cơ tuyệt chủng.'
  },
  {
    title: 'Khóa Huấn luyện Cấp cứu Ngừng tuần hoàn cơ bản (BLS) cho 300 sinh viên Đại học Bách khoa Hà Nội',
    category: 'Viện - Trường Đào tạo',
    date: '12/09/2026',
    featured: false,
    excerpt: 'Thực hành ép tim ngoài lồng ngực và sử dụng máy khử rung tim tự động (AED) giúp sinh viên sẵn sàng cứu người trong tình huống khẩn cấp.'
  },
  {
    title: 'Trường Đại học Điều dưỡng Nam Định phối hợp triển khai Mô hình Chăm sóc Sức khỏe Người cao tuổi tại nhà',
    category: 'Viện - Trường Đào tạo',
    date: '10/09/2026',
    featured: false,
    excerpt: 'Sinh viên năm cuối thực tập cộng đồng bằng việc đến tận nhà đo huyết áp, thay băng vết loét và tư vấn tâm lý cho các cụ già neo đơn.'
  },
  {
    title: 'Phát động Phong trào "10.000 Bước chân Mỗi ngày - Trường học Xanh, Khỏe mạnh" tại Đại học Quốc gia TP.HCM',
    category: 'Viện - Trường Đào tạo',
    date: '08/09/2026',
    featured: false,
    excerpt: 'Khuyến khích sinh viên và giảng viên đi bộ trong khuôn viên ký túc xá, giảm sử dụng xe máy cá nhân và nâng cao sức bền thể lực.'
  },
  {
    title: 'Viện Nghiên cứu Chăm sóc Sức khỏe ICHC công bố Tài liệu Hướng dẫn Chăm sóc Giảm nhẹ cho Bệnh nhân Ung thư giai đoạn cuối',
    category: 'Viện - Trường Đào tạo',
    date: '06/09/2026',
    featured: false,
    excerpt: 'Cẩm nang hướng dẫn kiểm soát cơn đau, dinh dưỡng dễ tiêu và chăm sóc tinh thần giúp người bệnh an tâm, thanh thản bên gia đình.'
  },
  {
    title: 'Hợp tác Đào tạo Quốc tế: 20 cán bộ Hội tham gia Khóa tu nghiệp Dưỡng sinh Người cao tuổi tại Nhật Bản',
    category: 'Viện - Trường Đào tạo',
    date: '04/09/2026',
    featured: false,
    excerpt: 'Học tập mô hình viện dưỡng lão sinh thái Kaigo và công nghệ robot hỗ trợ vận động cho người già yếu của xứ sở hoa anh đào.'
  },
  {
    title: 'Tổng kết Đề án Kiểm tra Thể lực Học sinh Toàn quốc: Nâng cao tầm vóc thanh thiếu niên Việt Nam đến năm 2030',
    category: 'Viện - Trường Đào tạo',
    date: '02/09/2026',
    featured: false,
    excerpt: 'Dữ liệu đo đạc cho thấy chiều cao trung bình của học sinh tham gia đề án tăng 1,8cm so với cùng kỳ, khẳng định hiệu quả can thiệp dinh dưỡng học đường.'
  },

  // --- NHÓM 5: THIỆN NGUYỆN VÀ CHÍNH SÁCH BHYT (15 BÀI) ---
  {
    title: 'Chương trình "Mắt sáng cho Người cao tuổi": Phẫu thuật Phaco miễn phí đem lại ánh sáng cho 300 cụ già nghèo',
    category: 'Thiện nguyện vì sức khỏe',
    date: '09/10/2026',
    featured: true,
    excerpt: 'Quỹ Thiện nguyện Trung ương Hội phối hợp Bệnh viện Mắt Quốc tế tài trợ 100% chi phí mổ đục thủy tinh thể, mang lại niềm vui nhìn thấy mặt con cháu.'
  },
  {
    title: 'Phổ biến Luật Khám bệnh, chữa bệnh mới và các chính sách bảo hiểm y tế toàn dân trong hệ thống Hội',
    category: 'Chính sách & Pháp luật',
    date: '04/10/2026',
    featured: false,
    excerpt: 'Cập nhật các điểm mới trong thông tư hướng dẫn về công tác y tế dự phòng, chính sách BHYT hộ gia đình và quyền lợi được bảo vệ nâng cao thể chất cộng đồng.'
  },
  {
    title: 'Đoàn Y bác sĩ Tình nguyện Trung ương Hội khám bệnh, cấp phát thuốc miễn phí cho 1.500 đồng bào Mèo Vạc (Hà Giang)',
    category: 'Thiện nguyện vì sức khỏe',
    date: '01/10/2026',
    featured: false,
    excerpt: 'Vượt qua những cung đường đèo hiểm trở của cao nguyên đá, mang theo tình cảm ấm áp và những liều thuốc bổ điều trị bệnh đường ruột, hô hấp.'
  },
  {
    title: 'Tặng 2.000 Thẻ Bảo hiểm Y tế cho người có hoàn cảnh khó khăn tại các tỉnh Tây Nam Bộ',
    category: 'Chính sách & Pháp luật',
    date: '28/09/2026',
    featured: false,
    excerpt: 'Tấm thẻ BHYT là điểm tựa an sinh vững chắc, giúp bà con nghèo yên tâm đi khám chữa bệnh tại các cơ sở y tế khi chẳng may ốm đau.'
  },
  {
    title: 'Chuyến xe "Trái Tim Cho Em": Khám sàng lọc tim bẩm sinh miễn phí cho 3.000 trẻ em vùng sâu tỉnh Quảng Trị',
    category: 'Thiện nguyện vì sức khỏe',
    date: '25/09/2026',
    featured: false,
    excerpt: 'Phát hiện 28 cháu nhỏ mắc dị tật tim bẩm sinh phức tạp và tài trợ toàn bộ kinh phí phẫu thuật tại Bệnh viện Trung ương Huế.'
  },
  {
    title: 'Bàn giao 10 Giếng nước khoan sạch và Nhà vệ sinh tự hoại cho các trường mầm non huyện Mù Cang Chải (Yên Bái)',
    category: 'Thiện nguyện vì sức khỏe',
    date: '22/09/2026',
    featured: false,
    excerpt: 'Giải quyết triệt để tình trạng thiếu nước sinh hoạt vào mùa khô, nâng cao điều kiện vệ sinh phòng dịch bệnh tiêu chảy cho các bé thơ vùng cao.'
  },
  {
    title: 'Hội nghị Báo cáo Tài chính Công khai: Minh bạch 100% nguồn thu ủng hộ Quỹ Thiện nguyện qua Napas VietQR',
    category: 'Chính sách & Pháp luật',
    date: '19/09/2026',
    featured: false,
    excerpt: 'Mọi khoản đóng góp của các nhà hảo tâm đều được sao kê tự động theo thời gian thực, đảm bảo nguồn tiền đến đúng đối tượng thụ hưởng.'
  },
  {
    title: 'Chương trình Bữa cơm Dinh dưỡng 0 đồng cho bệnh nhân nghèo chạy thận nhân tạo tại Bệnh viện Bạch Mai',
    category: 'Thiện nguyện vì sức khỏe',
    date: '16/09/2026',
    featured: false,
    excerpt: 'Mỗi tuần trao 1.000 suất cơm nóng đủ chất đạm và rau xanh, xoa dịu nỗi đau bệnh tật dai dẳng của những mảnh đời xóm chạy thận.'
  },
  {
    title: 'Tuyên truyền Chính sách Bảo hiểm Xã hội Tự nguyện và Bảo hiểm Y tế Hộ gia đình cho tiểu thương chợ đầu mối',
    category: 'Chính sách & Pháp luật',
    date: '13/09/2026',
    featured: false,
    excerpt: 'Giúp người lao động tự do hiểu rõ quyền lợi lương hưu và chăm sóc y tế khi về già để chủ động tham gia lưới an sinh xã hội nhà nước.'
  },
  {
    title: 'Trao 50 Suất Học bổng Sức khỏe Vươn lên cho con em cựu chiến binh và gia đình liệt sĩ tỉnh Điện Biên',
    category: 'Thiện nguyện vì sức khỏe',
    date: '10/09/2026',
    featured: false,
    excerpt: 'Mỗi suất học bổng trị giá 2.000.000 đồng kèm sữa bột bổ sung canxi giúp các em có thêm nghị lực vượt khó học giỏi.'
  },
  {
    title: 'Tổ chức Bếp ăn Tình thương và Khám bệnh lưu động cho người vô gia cư tại TP. Hồ Chí Minh',
    category: 'Thiện nguyện vì sức khỏe',
    date: '07/09/2026',
    featured: false,
    excerpt: 'Các bác sĩ trẻ tình nguyện cắt tóc, đo huyết áp, phát thuốc da liễu và tặng suất ăn ấm nóng trong đêm mưa Sài Gòn.'
  },
  {
    title: 'Đối thoại Pháp lý: Quyền lợi của Bệnh nhân theo Luật Khám bệnh, chữa bệnh năm 2023 có hiệu lực thi hành',
    category: 'Chính sách & Pháp luật',
    date: '04/09/2026',
    featured: false,
    excerpt: 'Làm rõ các quyền được bảo mật thông tin hồ sơ bệnh án, quyền được tôn trọng danh dự và quyền được giải thích rõ phác đồ điều trị.'
  },
  {
    title: 'Hội Chữ Thập Đỏ và Hội VACHE phát động Chiến dịch Hiến máu Tình nguyện "Giọt hồng vì sức khỏe cộng đồng"',
    category: 'Thiện nguyện vì sức khỏe',
    date: '01/09/2026',
    featured: false,
    excerpt: 'Thu nhận được 850 đơn vị máu quý giá tiếp viện cho các ngân hàng máu bệnh viện điều trị cấp cứu cho các nạn nhân tai nạn giao thông.'
  },
  {
    title: 'Trao tặng Thiết bị Phục hồi Chức năng cho Trung tâm Nuôi dưỡng Người già Neo đơn tỉnh Vĩnh Long',
    category: 'Thiện nguyện vì sức khỏe',
    date: '27/08/2026',
    featured: false,
    excerpt: 'Các máy tập đạp xe, bàn kéo giãn cột sống và máy mát-xa chân giúp các cụ già yếu cải thiện khả năng vận động và tuần hoàn huyết dịch.'
  },
  {
    title: 'Tuyên truyền Luật An toàn Thực phẩm: Xử lý nghiêm tình trạng sử dụng hóa chất cấm trong ngâm ủ giá đỗ và nông sản',
    category: 'Chính sách & Pháp luật',
    date: '24/08/2026',
    featured: false,
    excerpt: 'Cảnh báo nguy cơ ung thư gan và suy thận từ hóa chất tẩy trắng công nghiệp, hướng dẫn nhận biết thực phẩm màu sắc tự nhiên an toàn.'
  }
];

// Ensure we have exactly 100 items by adding IDs and linking images
const MOCK_NEWS_100 = rawArticles.map((art, index) => {
  const idNum = (index + 1).toString().padStart(3, '0');
  return {
    id: `news-${idNum}`,
    title: art.title,
    excerpt: art.excerpt,
    category: art.category,
    date: art.date,
    image: getImage(index),
    featured: art.featured || index < 6,
  };
});

// Rich schedule items
const MOCK_SCHEDULE = [
  {
    date: 'Thứ Hai, 12/10/2026',
    time: '08:30',
    content: 'Chủ trì cuộc họp Thường trực Ban Lãnh đạo Hội rà soát kế hoạch chuẩn bị Đại hội đại biểu toàn quốc nhiệm kỳ V',
    chairperson: 'Chủ tịch Nguyễn Hồng Quân',
    location: 'Phòng họp số 1, Tầng 5 Cung Trí Thức Hà Nội'
  },
  {
    date: 'Thứ Hai, 12/10/2026',
    time: '14:00',
    content: 'Làm việc với Ban Tổ chức & Kiểm tra về thẩm định danh sách đề nghị kết nạp đợt 4/2026 cho 180 hội viên mới',
    chairperson: 'Phó Chủ tịch kiêm Tổng Thư ký Tạ Quang Vinh',
    location: 'Văn phòng Trung ương Hội'
  },
  {
    date: 'Thứ Ba, 13/10/2026',
    time: '09:00',
    content: 'Hội nghị trực tuyến toàn quốc với Ban Giám đốc các Viện, Trung tâm trực thuộc về đề tài khoa học y sinh',
    chairperson: 'Phó Chủ tịch Thường trực Lê Đình Tiến',
    location: 'Phòng họp trực tuyến Trung ương Hội'
  },
  {
    date: 'Thứ Ba, 13/10/2026',
    time: '14:30',
    content: 'Họp với Bộ Y tế về triển khai Đề án Chăm sóc Sức khỏe Học đường và Dinh dưỡng thế hệ tương lai',
    chairperson: 'Phó Chủ tịch TS. Vũ Việt Anh',
    location: 'Trụ sở Bộ Y tế, 138A Giảng Võ, Ba Đình, Hà Nội'
  },
  {
    date: 'Thứ Tư, 14/10/2026',
    time: '08:30',
    content: 'Chuyến công tác kiểm tra hoạt động chi hội và phong trào tự chăm sóc sức khỏe tại TP. Hải Phòng',
    chairperson: 'Chủ tịch Nguyễn Hồng Quân & Đoàn Thường trực',
    location: 'Trụ sở Chi hội Lê Tiến, Quận Ngô Quyền, Hải Phòng'
  },
  {
    date: 'Thứ Tư, 14/10/2026',
    time: '14:00',
    content: 'Làm việc với Đoàn công tác Viện Nghiên cứu Đào tạo ICHC về dự án phổ biến kiến thức phòng chống đột quỵ mùa đông',
    chairperson: 'Phó Chủ tịch TS.BS. Lê Thị Hằng',
    location: 'Viện ICHC, 120 Hoàng Quốc Việt, Cầu Giấy, Hà Nội'
  },
  {
    date: 'Thứ Năm, 15/10/2026',
    time: '09:00',
    content: 'Dự Tọa đàm hợp tác Đào tạo Kỹ thuật Chăm sóc Sức khỏe Cộng đồng với Trường Đại học Y Hà Nội',
    chairperson: 'Phó Chủ tịch Thường trực Lê Đình Tiến',
    location: 'Hội trường Lớn, ĐH Y Hà Nội, Số 1 Tôn Thất Tùng'
  },
  {
    date: 'Thứ Năm, 15/10/2026',
    time: '15:00',
    content: 'Giao ban công tác xuất bản Tạp chí Sức Khỏe Cộng Đồng số đặc biệt chào mừng ngày Người cao tuổi',
    chairperson: 'Phó Chủ tịch TS. Vương Văn Việt',
    location: 'Tòa soạn Tạp chí Sức Khỏe Cộng Đồng, Hà Nội'
  },
  {
    date: 'Thứ Sáu, 16/10/2026',
    time: '08:30',
    content: 'Chủ trì Lễ Ký kết bản ghi nhớ tài trợ Chương trình Mổ mắt Phaco miễn phí cho bà con nghèo các tỉnh phía Nam',
    chairperson: 'Phó Chủ tịch Thường trực phía Nam Đặng Văn Khoa',
    location: 'Văn phòng Thường trực phía Nam, 67 Bình Lợi, TP.HCM'
  },
  {
    date: 'Thứ Sáu, 16/10/2026',
    time: '14:00',
    content: 'Kiểm tra công tác chuẩn bị Đại hội Chi hội Giáo dục Chăm sóc Sức khỏe Người cao tuổi TP. Đà Nẵng',
    chairperson: 'Phó Chủ tịch kiêm Tổng Thư ký Tạ Quang Vinh',
    location: 'Cơ quan Thường trực Miền Trung, TP. Đà Nẵng'
  },
  {
    date: 'Thứ Bảy, 17/10/2026',
    time: '08:00',
    content: 'Phát động Giải chạy Dưỡng sinh và Thể thao Cộng đồng "Vì Một Việt Nam Khỏe Mạnh" tại Hồ Tây',
    chairperson: 'Chủ tịch Nguyễn Hồng Quân',
    location: 'Vườn hoa Lý Tự Trọng, Đường Thanh Niên, Hà Nội'
  },
  {
    date: 'Thứ Bảy, 17/10/2026',
    time: '15:00',
    content: 'Tọa đàm trực tuyến với Cơ quan Thường trực Tây Nguyên về phát triển vườn bảo tồn cây thuốc nam buôn làng',
    chairperson: 'Phó Chủ tịch Nguyễn Thị Chính & Đại diện Đắk Lắk',
    location: 'Hệ thống Zoom trực tuyến Trung ương Hội'
  },
  {
    date: 'Chủ Nhật, 18/10/2026',
    time: '07:30',
    content: 'Dự và chỉ đạo Lễ Khám bệnh, cấp thuốc thiện nguyện cho 1.000 gia đình chính sách tại huyện Ba Vì, Hà Nội',
    chairperson: 'Phó Chủ tịch Nguyễn Mạnh Thản',
    location: 'Trạm Y tế xã Tản Lĩnh, Huyện Ba Vì, Hà Nội'
  },
  {
    date: 'Thứ Hai, 19/10/2026',
    time: '09:00',
    content: 'Họp Hội đồng Khoa học nghiệm thu quy chuẩn bài tập dưỡng sinh phòng thoái hóa cột sống cổ',
    chairperson: 'Chủ tịch Hội đồng Khoa học Trung ương Hội',
    location: 'Viện Nghiên cứu Chăm sóc Sức khỏe ICHC'
  },
  {
    date: 'Thứ Ba, 20/10/2026',
    time: '09:00',
    content: 'Gặp mặt nữ cán bộ, y bác sĩ và hội viên tiêu biểu nhân Kỷ niệm Ngày Phụ nữ Việt Nam 20/10',
    chairperson: 'Chủ tịch Nguyễn Hồng Quân & Thường trực Hội',
    location: 'Hội trường Cung Trí Thức Hà Nội'
  },
  {
    date: 'Thứ Năm, 22/10/2026',
    time: '08:30',
    content: 'Khảo sát thực địa mô hình làng sinh thái dưỡng sinh và phục hồi chức năng người già tại tỉnh Lâm Đồng',
    chairperson: 'Đoàn công tác Thường trực Hội & Ban Chuyên môn',
    location: 'Huyện Lạc Dương, Tỉnh Lâm Đồng'
  }
];

const fileContent = `/* ==========================================================================
   HỆ THỐNG DỮ LIỆU TIN TỨC, THỜI SỰ 24/7, KHỐI VIỆN - TRƯỜNG & LỊCH CÔNG TÁC
   (Gồm 100 bài viết toàn quốc và lịch công tác tuần chi tiết)
   ========================================================================== */

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  featured: boolean;
}

export interface ScheduleItem {
  date: string;
  time: string;
  content: string;
  chairperson: string;
  location?: string;
}

export const MOCK_NEWS_EXPANDED: NewsItem[] = ${JSON.stringify(MOCK_NEWS_100, null, 2)};

export const MOCK_SCHEDULE_EXPANDED: ScheduleItem[] = ${JSON.stringify(MOCK_SCHEDULE, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'mock-news-data.ts'), fileContent, 'utf8');
console.log('Successfully generated lib/mock-news-data.ts with', MOCK_NEWS_100.length, 'articles and', MOCK_SCHEDULE.length, 'schedules!');
