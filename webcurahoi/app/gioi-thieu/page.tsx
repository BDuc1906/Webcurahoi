"use client";

import React, { useState, useEffect, Suspense } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  ShieldCheck,
  Award,
  BookOpen,
  FileText,
  Users,
  CheckCircle2,
} from "lucide-react";


// Nội dung biên tập mở rộng, không phải trích dẫn điều lệ hoặc xác nhận hoạt động thực tế.
const EXTENDED_TOPICS = [
  {title:"Lịch sử hình thành và phát triển", items:["Giới thiệu bối cảnh nhu cầu giáo dục và chăm sóc sức khỏe cộng đồng; các mốc thành lập chính thức cần được đối chiếu quyết định gốc.","Từng giai đoạn phát triển nên được mô tả bằng thời gian, cơ cấu tổ chức, nhiệm vụ trọng tâm và tài liệu minh chứng.","Khi có báo cáo tổng kết được phê duyệt, có thể cập nhật thành tựu và bài học kinh nghiệm theo từng nhiệm kỳ."]},
  {title:"Tôn chỉ và mục đích",items:["Tập hợp, đoàn kết hội viên và hỗ trợ hoạt động giáo dục, chăm sóc sức khỏe cộng đồng theo điều lệ được phê duyệt.","Góp phần nâng cao nhận thức, phát triển thói quen chăm sóc sức khỏe chủ động và lan tỏa thông tin có trách nhiệm.","Bảo vệ quyền và lợi ích hợp pháp của hội viên trong phạm vi quy định và điều lệ."]},
  {title:"Chức năng của Hội",items:["Kết nối tổ chức, cá nhân quan tâm đến giáo dục và chăm sóc sức khỏe cộng đồng.","Phối hợp truyền thông, phổ biến kiến thức và trao đổi kinh nghiệm trong phạm vi hoạt động hợp pháp.","Tổng hợp đề xuất, phản ánh nhu cầu hội viên và hỗ trợ liên hệ với các đơn vị phù hợp."]},
  {title:"Nhiệm vụ trọng tâm",items:["Xây dựng nội dung phổ biến kiến thức rõ ràng, dễ tiếp cận và có nguồn tham khảo.","Đề xuất tọa đàm, sinh hoạt chuyên đề, trao đổi chuyên môn và hoạt động cộng đồng phù hợp.","Nâng cao năng lực tổ chức, phối hợp, quản lý thông tin và tiếp nhận phản hồi.","Thực hiện chế độ báo cáo, lưu trữ và công khai thông tin theo quy định áp dụng."]},
  {title:"Quyền hạn và phạm vi hoạt động",items:["Các quyền và phạm vi đại diện của Hội cần được xác định theo Điều lệ đã được phê duyệt và quy định hiện hành.","Các đơn vị, hội viên chỉ thực hiện hoạt động chuyên môn và phát ngôn trong phạm vi được phân công.","Không đồng nhất hoạt động truyền thông sức khỏe với hoạt động khám chữa bệnh cần giấy phép chuyên ngành."]},
  {title:"Cơ cấu tổ chức",items:["Đại hội, Ban Chấp hành, Ban Thường vụ và các chức danh lãnh đạo được mô tả theo điều lệ và quyết định nhân sự.","Văn phòng, ban chuyên môn, chi hội và đơn vị trực thuộc (nếu có) cần kèm căn cứ thành lập và đầu mối phụ trách.","Danh sách tổ chức nên ghi rõ trạng thái hoạt động và thời điểm cập nhật."]},
  {title:"Trách nhiệm của lãnh đạo",items:["Lãnh đạo định hướng chương trình, phân công nhiệm vụ và theo dõi kết quả thực hiện theo thẩm quyền.","Các vị trí phụ trách phối hợp liên ngành, tổ chức họp và báo cáo theo quy chế.","Hồ sơ nhân sự cần thể hiện chức vụ, nhiệm kỳ và nguồn xác minh; không công khai dữ liệu cá nhân ngoài phạm vi cho phép."]},
  {title:"Nguyên tắc tổ chức và hoạt động",items:["Tuân thủ pháp luật, điều lệ và các quyết định có hiệu lực.","Khuyến khích tinh thần tự nguyện, hợp tác, trách nhiệm và minh bạch trong thông tin công khai.","Tôn trọng bằng chứng khoa học, bảo vệ dữ liệu cá nhân và quyền tiếp cận thông tin phù hợp."]},
  {title:"Định hướng phát triển",items:["Chuẩn hóa kho kiến thức sức khỏe, phân loại theo chủ đề và nhóm đối tượng.","Phát triển phương thức truyền thông trực tuyến kết hợp hoạt động cộng đồng phù hợp nguồn lực.","Tăng cường kiểm chứng, cập nhật và đo lường phản hồi của người đọc."]},
  {title:"Lĩnh vực hoạt động chuyên môn",items:["Sức khỏe học đường, gia đình và người cao tuổi; giáo dục dự phòng và thói quen lành mạnh.","Dinh dưỡng, an toàn thực phẩm, vệ sinh môi trường và sức khỏe tinh thần ở mức thông tin giáo dục.","Tọa đàm chuyên đề, nâng cao năng lực hội viên và kết nối nguồn lực cộng đồng."]},
  {title:"Quyền lợi hội viên",items:["Tìm hiểu và tham gia hoạt động phù hợp theo điều lệ, quy chế và điều kiện thực tế.","Tiếp cận thông tin công khai, trao đổi chuyên môn và đóng góp sáng kiến.","Quyền biểu quyết, ứng cử, đề cử và các quyền khác phải căn cứ điều lệ chính thức."]},
  {title:"Nghĩa vụ hội viên",items:["Tôn trọng điều lệ, quy chế và quyết định hợp pháp của tổ chức.","Tham gia sinh hoạt, phối hợp hoạt động phù hợp và bảo vệ uy tín tổ chức.","Thực hiện nghĩa vụ tài chính hoặc báo cáo chỉ khi có căn cứ từ quy định chính thức áp dụng."]},
  {title:"Hợp tác và kết nối cộng đồng",items:["Khuyến khích trao đổi với cơ sở giáo dục, tổ chức xã hội, chuyên gia và các đơn vị y tế có thẩm quyền.","Mỗi chương trình phối hợp cần xác định mục tiêu, đầu mối, trách nhiệm, phạm vi và hình thức đánh giá.","Thông tin về đối tác, thỏa thuận và kết quả chỉ công bố khi được phép và có chứng cứ."]},
  {title:"Hệ thống văn bản và quản trị",items:["Nhóm văn bản nền tảng gồm quyết định thành lập, điều lệ và sửa đổi (nếu có).","Nhóm quản trị có thể gồm nghị quyết, quy chế, quyết định tổ chức, thông báo và báo cáo được phép công khai.","Từng tài liệu cần có số hiệu, ngày ban hành, đơn vị ký, hiệu lực và bản đính kèm xác thực."]},
  {title:"Giải đáp và hướng dẫn tra cứu",items:["Người đọc có thể chuyển giữa ba thẻ Giới thiệu, Ban lãnh đạo và Điều lệ – Quyết định thành lập.","Thông tin về nhân sự và văn bản phải được đối chiếu với tài liệu chính thức trước khi sử dụng.","Nội dung giáo dục sức khỏe không thay thế tư vấn, chẩn đoán hay điều trị của nhân viên y tế."]}
];
const DOCUMENT_CATEGORIES = [
  {category:"Thành lập và điều lệ",description:"Quyết định cho phép thành lập; điều lệ được phê duyệt; văn bản sửa đổi, bổ sung",status:"Chờ đối chiếu bản gốc"},
  {category:"Đại hội",description:"Nghị quyết, biên bản, báo cáo nhiệm kỳ được phép công khai",status:"Chờ bổ sung tài liệu"},
  {category:"Ban Chấp hành",description:"Nghị quyết, kết luận và quyết định theo thẩm quyền",status:"Chờ bổ sung tài liệu"},
  {category:"Ban Thường vụ",description:"Quy chế, quyết định điều hành và thông báo",status:"Chờ bổ sung tài liệu"},
  {category:"Tổ chức nhân sự",description:"Quyết định kiện toàn, bổ nhiệm và phân công nhiệm vụ",status:"Chờ bổ sung tài liệu"},
  {category:"Hội viên",description:"Quy định kết nạp, quyền lợi, nghĩa vụ và quản lý hội viên",status:"Chờ bổ sung tài liệu"},
  {category:"Chuyên môn",description:"Kế hoạch, hướng dẫn, tài liệu chương trình và báo cáo",status:"Chờ bổ sung tài liệu"},
  {category:"Công khai và báo cáo",description:"Báo cáo định kỳ, tổng kết và thông tin được phép công bố",status:"Chờ bổ sung tài liệu"}
];
// Chỉ đăng ký tệp PDF thật đã được phép công khai, đặt trong public/van-ban/.
// Ví dụ sau khi nhận tài liệu: { category: "Đại hội", title: "Nghị quyết Đại hội ...", file: "/van-ban/nghi-quyet.pdf" }
// Không thêm đường dẫn cho tệp chưa tồn tại.
type PublicPdf = { category: string; title: string; file: string };
const PUBLIC_PDFS: PublicPdf[] = [];
const pdfsForCategory = (category: string) => PUBLIC_PDFS.filter((pdf) => pdf.category === category && /^\/van-ban\/[a-zA-Z0-9._/-]+\.pdf$/i.test(pdf.file) && !pdf.file.includes(".."));

const FAQ_EXTENDED = [
 ["Hội có phải cơ sở khám chữa bệnh không?","Chức năng hoạt động của Hội cần căn cứ Điều lệ. Thông tin giới thiệu trên website không đồng nghĩa với giấy phép khám chữa bệnh."],
 ["Làm sao xác minh một quyết định?","Đối chiếu số ký hiệu, cơ quan ban hành, ngày ký, người ký và bản gốc từ nguồn có thẩm quyền."],
 ["Làm thế nào biết lãnh đạo đương nhiệm?","Kiểm tra quyết định nhân sự, nhiệm kỳ và ngày cập nhật hồ sơ; không chỉ dựa vào dữ liệu mẫu trên website."],
 ["Hội viên có thể đóng góp sáng kiến không?","Có thể gửi đề xuất qua kênh tiếp nhận chính thức khi được công bố; việc xem xét thực hiện tuân theo quy chế của Hội."],
 ["Tài liệu trên website có thể dùng làm căn cứ pháp lý không?","Chỉ sử dụng bản chính thức đã được xác minh về nguồn, nội dung và hiệu lực; bản giới thiệu không thay thế văn bản gốc."],
 ["Thông tin sức khỏe có thay thế lời khuyên bác sĩ?","Không. Đây là nội dung giáo dục, tham khảo và không thay thế tư vấn chuyên môn cá nhân."],
 ["Vì sao một số tài liệu chưa có PDF?","Website chưa có tệp đã được xác minh và được phép công khai, nên không tạo tài liệu giả."],
 ["Các lĩnh vực chuyên đề có phải chương trình đang triển khai?","Không nhất thiết. Những lĩnh vực mô tả trong phần mở rộng là đề xuất biên tập, chưa phải danh sách chương trình đã được phê duyệt."],
 ["Làm sao đề nghị chỉnh sửa thông tin?","Liên hệ đầu mối quản trị được công bố trên website và cung cấp tài liệu chứng minh nội dung cần sửa."],
 ["Có thể tải văn bản ở đâu?","Chỉ những văn bản có bản đính kèm được xác thực và được phép công khai mới nên có nút xem hoặc tải."],
 ["Có được chia sẻ ảnh và số điện thoại lãnh đạo?","Chỉ nên chia sẻ thông tin và hình ảnh đã được phép công bố, đúng mục đích và phù hợp quy định bảo vệ dữ liệu."],
 ["Có thể tham gia hoạt động Hội như thế nào?","Tra cứu thông báo, quy định hội viên và kênh liên hệ chính thức khi được công bố; không tự suy đoán điều kiện tham gia."]
];

function AboutPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [documentQuery, setDocumentQuery] = useState("");
  const [documentCategory, setDocumentCategory] = useState("Tất cả");
  const [faqQuery, setFaqQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"INTRO" | "LEADERS" | "CHARTER">(() => {
    if (tabParam === "LEADERS") return "LEADERS";
    if (tabParam === "CHARTER") return "CHARTER";
    return "INTRO";
  });

  useEffect(() => {
    if (tabParam === "LEADERS") setActiveTab("LEADERS");
    else if (tabParam === "CHARTER") setActiveTab("CHARTER");
    else if (tabParam === "INTRO") setActiveTab("INTRO");
  }, [tabParam]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-8 font-gov">
        {/* Header Breadcrumb & Title */}
        <div>
          <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
            Mảng I: Thông Tin Chung Về Hội
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
            GIỚI THIỆU TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tôn chỉ mục đích, Thường trực Ban Lãnh đạo Hội, Quyết định thành lập và Điều lệ Hội được Bộ trưởng Bộ Nội vụ phê duyệt.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab("INTRO")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "INTRO"
                ? "border-red-700 text-red-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1. Giới Thiệu Chung và Quá Trình Phát Triển
          </button>
          <button
            onClick={() => setActiveTab("LEADERS")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "LEADERS"
                ? "border-red-700 text-red-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4" /> 2. Ban Thường Trực Lãnh Đạo Trung Ương Hội
          </button>
          <button
            onClick={() => setActiveTab("CHARTER")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "CHARTER"
                ? "border-red-700 text-red-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" /> 3. Điều Lệ và Quyết Định Thành Lập
          </button>
        </div>

        {/* TAB 1: GIỚI THIỆU CHUNG */}
        {activeTab === "INTRO" && (
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2 font-serif">
                <ShieldCheck className="w-5 h-5 text-red-700" /> Tôn Chỉ và Mục Đích Hoạt Động
              </h3>
              <p className="text-left leading-relaxed font-serif text-slate-800 text-[15px]">
                <strong>Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam</strong> là tổ chức xã hội - nghề nghiệp của các tổ chức, cá nhân Việt Nam tự nguyện thành lập, nhằm mục đích tập hợp, đoàn kết hội viên, bảo vệ quyền, lợi ích hợp pháp của hội viên; hỗ trợ nhau hoạt động có hiệu quả trong việc giáo dục nâng cao nhận thức và chăm sóc sức khỏe cộng đồng, góp phần vào sự nghiệp chăm sóc, bảo vệ và nâng cao sức khỏe nhân dân.
              </p>
              <p className="text-left leading-relaxed text-slate-700 text-sm">
                Hội hoạt động trên phạm vi cả nước, theo Điều lệ Hội được Bộ trưởng Bộ Nội vụ phê duyệt, tuân thủ quy định của pháp luật Việt Nam, chịu sự quản lý nhà nước của Bộ Nội vụ, sự quản lý về lĩnh vực hoạt động chính của Bộ Y tế và các Bộ, ngành có liên quan.
              </p>

            </div>

            <section className="space-y-5 pt-5 border-t border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 font-serif">Giới thiệu tổng quan về Hội</h3>
              <p>Giáo dục và chăm sóc sức khỏe cộng đồng là công việc lâu dài, cần sự phối hợp giữa gia đình, nhà trường, cơ sở y tế và các tổ chức xã hội. Trong bối cảnh nhu cầu tiếp cận thông tin sức khỏe ngày càng lớn, Hội hướng tới việc kết nối nguồn lực chuyên môn, chia sẻ kiến thức thiết thực và khuyến khích mỗi người chủ động bảo vệ sức khỏe bản thân cũng như những người xung quanh.</p>
              <p>Thông qua các hoạt động truyền thông, hội thảo, trao đổi chuyên môn và kết nối hội viên, Hội góp phần xây dựng môi trường thuận lợi để kiến thức chăm sóc sức khỏe được phổ biến theo cách dễ hiểu, phù hợp với từng nhóm đối tượng. Những nội dung này mang tính giới thiệu định hướng, không thay thế Điều lệ hoặc các văn bản chính thức của Hội.</p>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Sứ mệnh và tầm nhìn</h3>
              <p><strong>Sứ mệnh:</strong> Góp phần nâng cao nhận thức về sức khỏe, lan tỏa kiến thức phòng bệnh, khuyến khích lối sống lành mạnh và kết nối những cá nhân, tổ chức cùng quan tâm đến sức khỏe cộng đồng.</p>
              <p><strong>Tầm nhìn:</strong> Hướng tới một cộng đồng có khả năng tiếp cận thông tin sức khỏe đáng tin cậy, chủ động thực hành chăm sóc sức khỏe và tăng cường tinh thần tương trợ trong các hoạt động vì cộng đồng.</p>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Giá trị cốt lõi</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ["Vì cộng đồng", "Đặt lợi ích và nhu cầu chăm sóc sức khỏe của người dân ở vị trí trung tâm."],
                  ["Trách nhiệm", "Khuyến khích chia sẻ thông tin thận trọng, có cơ sở và phù hợp với pháp luật."],
                  ["Hợp tác", "Tăng cường kết nối giữa chuyên gia, hội viên, cơ sở giáo dục và các tổ chức liên quan."],
                  ["Bền vững", "Chú trọng hoạt động giáo dục, dự phòng và hình thành thói quen chăm sóc sức khỏe lâu dài."],
                ].map(([title, description]) => <div key={title} className="rounded-lg bg-red-50/50 border border-red-100 p-4"><h4 className="font-bold text-red-800">{title}</h4><p className="mt-1 text-sm">{description}</p></div>)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Các lĩnh vực hoạt động trọng tâm</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Truyền thông, giáo dục kiến thức sức khỏe và nâng cao nhận thức phòng bệnh.</li>
                <li>Khuyến khích dinh dưỡng hợp lý, vận động thể chất và lối sống tích cực.</li>
                <li>Quan tâm đến nhu cầu chăm sóc sức khỏe của trẻ em, người cao tuổi và các nhóm cần hỗ trợ.</li>
                <li>Tổ chức giao lưu, tọa đàm, hội thảo và chia sẻ kinh nghiệm trong phạm vi hoạt động phù hợp.</li>
                <li>Kết nối hội viên, chuyên gia và các tổ chức để trao đổi thông tin, phối hợp hoạt động cộng đồng.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 font-serif">Vai trò của giáo dục sức khỏe trong đời sống</h3>
              <p>Giáo dục sức khỏe không chỉ là truyền đạt kiến thức về bệnh tật mà còn giúp người dân nhận diện các yếu tố ảnh hưởng đến sức khỏe, biết lựa chọn nguồn thông tin phù hợp và hình thành hành vi có lợi. Những hoạt động truyền thông cần sử dụng ngôn ngữ gần gũi, thông tin rõ ràng, có sự tham gia của chuyên gia và phù hợp với điều kiện của từng địa phương.</p>
              <p>Trong gia đình, giáo dục sức khỏe có thể bắt đầu từ thói quen vệ sinh, dinh dưỡng đa dạng, vận động phù hợp và theo dõi sức khỏe định kỳ. Ở trường học, nội dung có thể chú trọng kỹ năng tự chăm sóc, an toàn thực phẩm, sức khỏe tinh thần và môi trường học đường lành mạnh. Tại cộng đồng, các buổi trao đổi chuyên đề và tài liệu hướng dẫn có thể hỗ trợ người dân chủ động tiếp cận các dịch vụ chăm sóc sức khỏe khi cần.</p>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Nhóm đối tượng được quan tâm</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ["Trẻ em và học sinh", "Khuyến khích kiến thức vệ sinh, dinh dưỡng, vận động, phòng tránh tai nạn và kỹ năng tìm kiếm sự hỗ trợ."],
                  ["Gia đình và người chăm sóc", "Chia sẻ thông tin chăm sóc sức khỏe tại nhà, nhận biết khi nào cần đến cơ sở y tế và xây dựng thói quen tích cực."],
                  ["Người cao tuổi", "Quan tâm đến hoạt động thể chất phù hợp, kết nối xã hội, quản lý sức khỏe theo hướng dẫn của nhân viên y tế."],
                  ["Người lao động", "Tăng cường hiểu biết về môi trường làm việc an toàn, nghỉ ngơi hợp lý và phòng ngừa nguy cơ sức khỏe nghề nghiệp."],
                  ["Cán bộ, hội viên", "Khuyến khích trao đổi chuyên môn, chia sẻ mô hình hữu ích và nâng cao chất lượng hoạt động truyền thông."],
                  ["Cộng đồng địa phương", "Ưu tiên cách truyền đạt dễ hiểu, tiếp cận được nhiều nhóm dân cư và tôn trọng sự đa dạng của nhu cầu."],
                ].map(([name, detail]) => <article key={name} className="border border-slate-200 rounded-lg p-4 bg-slate-50"><h4 className="font-bold text-red-800">{name}</h4><p className="mt-2 text-sm">{detail}</p></article>)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Hình thức hoạt động có thể triển khai</h3>
              <div className="space-y-3">
                {[
                  ["Truyền thông cộng đồng", "Biên soạn bài viết phổ biến kiến thức, tài liệu hỏi đáp và nội dung truyền thông phù hợp với từng đối tượng."],
                  ["Hội thảo và tọa đàm", "Tổ chức không gian trao đổi về các chủ đề sức khỏe, có sự tham gia của người làm chuyên môn và đại diện cộng đồng."],
                  ["Kết nối hội viên", "Giới thiệu sáng kiến, chia sẻ kinh nghiệm tổ chức hoạt động và thúc đẩy phối hợp giữa các đơn vị."],
                  ["Ứng dụng công nghệ", "Xây dựng thư viện tài liệu số, chuyên mục tin tức và hệ thống tra cứu nội dung thuận tiện trên điện thoại."],
                  ["Đánh giá và cải tiến", "Thu thập phản hồi sau các chương trình để điều chỉnh cách tổ chức và chất lượng tài liệu truyền thông."],
                ].map(([name, detail], index) => <div key={name} className="flex gap-4 border-b border-slate-100 pb-3"><span className="shrink-0 font-bold text-red-800">{String(index + 1).padStart(2, "0")}</span><div><h4 className="font-bold text-slate-900">{name}</h4><p className="mt-1">{detail}</p></div></div>)}
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Nguyên tắc cung cấp thông tin</h3>
              <p>Website ưu tiên thông tin có nguồn gốc rõ ràng, được trình bày dễ đọc và cập nhật khi có thay đổi. Các bài viết mang tính giáo dục, tham khảo; không thay thế chẩn đoán, tư vấn hay điều trị của người hành nghề y tế. Thông tin về cơ cấu, nhân sự, số liệu hoạt động và văn bản pháp lý chỉ được công bố chính thức sau khi được kiểm chứng.</p>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Câu hỏi thường gặp</h3>
              <div className="space-y-3">
                {[
                  ["Hội hướng tới mục tiêu gì?", "Tăng cường giáo dục, chia sẻ kiến thức và kết nối các nguồn lực phục vụ chăm sóc sức khỏe cộng đồng."],
                  ["Người dân có thể tìm thông tin ở đâu?", "Có thể tham khảo chuyên mục giới thiệu, tin tức, hoạt động và thư viện văn bản trên website."],
                  ["Nội dung sức khỏe trên website có thay thế bác sĩ không?", "Không. Nội dung mang tính tham khảo, người đọc cần liên hệ cơ sở y tế khi cần tư vấn chuyên môn."],
                  ["Làm thế nào để xác nhận một văn bản của Hội?", "Đối chiếu số hiệu, ngày ban hành, cơ quan ký và bản gốc được công bố qua kênh chính thức."],
                ].map(([q, a]) => <details key={q} className="rounded-lg border border-slate-200 p-4"><summary className="font-bold text-slate-900 cursor-pointer">{q}</summary><p className="mt-2">{a}</p></details>)}
              </div>
              <p className="text-xs text-slate-500 italic">Các đoạn mô tả mở rộng trong mục này là nội dung biên tập đề xuất cho website, không phải trích dẫn nguyên văn Điều lệ hoặc báo cáo hoạt động chính thức.</p>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Định hướng phát triển</h3>
              <p>Trong thời gian tới, các nội dung có thể được chú trọng gồm nâng cao chất lượng truyền thông số, phát triển kho tài liệu tham khảo dễ tra cứu, tăng cường kết nối mạng lưới hội viên, giới thiệu những mô hình giáo dục sức khỏe hữu ích và đẩy mạnh ứng dụng công nghệ trong phổ biến thông tin. Đây là các định hướng nội dung đề xuất cho website, không phải cam kết hay kế hoạch đã được Hội phê duyệt.</p>
            </section>
            <section className="pt-6 border-t border-slate-200 space-y-5">
              <h3 className="text-lg font-bold text-slate-900 font-serif">15 chuyên mục thông tin chuyên sâu</h3>
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3">Đây là nội dung biên tập mở rộng, phục vụ giới thiệu và tham khảo; những vấn đề pháp lý, tổ chức và nhân sự phải đối chiếu văn bản chính thức.</p>
              {EXTENDED_TOPICS.map((topic,index) => <article key={topic.title} className="space-y-2 border-b border-slate-200 pb-4"><h4 className="font-bold text-slate-900">{index+1}. {topic.title}</h4><ul className="list-disc pl-6 space-y-1">{topic.items.map(item=><li key={item}>{item}</li>)}</ul></article>)}
              <h3 className="text-lg font-bold text-slate-900 font-serif">Tra cứu câu hỏi thường gặp</h3>
              <input aria-label="Tìm câu hỏi thường gặp" value={faqQuery} onChange={e=>setFaqQuery(e.target.value)} placeholder="Nhập từ khóa câu hỏi..." className="w-full border border-slate-300 rounded p-3 text-sm" />
              {FAQ_EXTENDED.filter(([q,a])=>(q+" "+a).toLocaleLowerCase('vi').includes(faqQuery.trim().toLocaleLowerCase('vi'))).map(([q,a])=><details key={q} className="border border-slate-200 rounded p-3"><summary className="cursor-pointer font-bold">{q}</summary><p className="mt-2">{a}</p></details>)}
              {FAQ_EXTENDED.filter(([q,a])=>(q+" "+a).toLocaleLowerCase('vi').includes(faqQuery.trim().toLocaleLowerCase('vi'))).length===0 && <p>Không tìm thấy câu hỏi phù hợp.</p>}
            </section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 space-y-2">
                <div className="text-red-700 font-bold text-sm flex items-center gap-2 font-gov">
                  <Award className="w-4 h-4" /> Sứ Mệnh Cao Cả
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Lan tỏa kiến thức y tế dự phòng, dinh dưỡng hợp lý, rèn luyện thể chất đến từng gia đình, trường học và khu dân cư trên toàn quốc.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 space-y-2">
                <div className="text-red-700 font-bold text-sm flex items-center gap-2 font-gov">
                  <Users className="w-4 h-4" /> Mạng Lưới Rộng Khắp
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Hướng tới kết nối đội ngũ chuyên môn, hội viên và những cá nhân quan tâm đến giáo dục, chăm sóc sức khỏe cộng đồng; quy mô thực tế cần căn cứ báo cáo của Hội.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 space-y-2">
                <div className="text-red-700 font-bold text-sm flex items-center gap-2 font-gov">
                  <CheckCircle2 className="w-4 h-4" /> Trọng Tâm Hành Động
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Chăm sóc sức khỏe người cao tuổi, phụ nữ, trẻ em; phát triển y học cổ truyền kết hợp y học hiện đại và ứng dụng khoa học công nghệ.
                </p>
              </div>
            </div>

            <section className="mt-8 pt-6 border-t border-slate-200 space-y-5">
              <h3 className="text-xl font-bold text-red-800 font-serif">Chương trình nội dung mở rộng về giáo dục sức khỏe cộng đồng</h3>
              <p className="text-xs bg-amber-50 border border-amber-200 p-3 rounded">Các nội dung dưới đây là đề xuất biên tập để giới thiệu định hướng hoạt động, không phải danh sách chương trình đã được Hội phê duyệt hoặc triển khai.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ["Giáo dục sức khỏe học đường", "Chia sẻ kiến thức vệ sinh cá nhân, dinh dưỡng, vận động, sức khỏe tinh thần, kỹ năng nhận biết nguồn thông tin đáng tin cậy và phối hợp giữa gia đình với nhà trường."],
                  ["Chăm sóc sức khỏe người cao tuổi", "Tuyên truyền về vận động phù hợp, phòng ngừa té ngã, theo dõi sức khỏe định kỳ, sử dụng thuốc theo hướng dẫn chuyên môn và duy trì kết nối xã hội."],
                  ["Dinh dưỡng và an toàn thực phẩm", "Phổ biến nguyên tắc ăn uống đa dạng, vệ sinh trong chế biến và bảo quản thực phẩm, đọc nhãn sản phẩm và xây dựng thói quen ăn uống phù hợp."],
                  ["Sức khỏe gia đình", "Khuyến khích chủ động phòng bệnh, giữ gìn môi trường sống, cân bằng học tập và nghỉ ngơi, quan tâm sức khỏe tinh thần và tìm kiếm hỗ trợ y tế khi cần."],
                  ["Truyền thông sức khỏe số", "Phát triển bài viết dễ đọc, hỏi đáp, tài liệu hướng dẫn và nội dung trực quan; nhắc người đọc kiểm chứng thông tin với nguồn y tế chính thống."],
                  ["Kết nối chuyên môn và cộng đồng", "Tạo điều kiện cho hội viên, chuyên gia, trường học và tổ chức xã hội trao đổi kinh nghiệm, đề xuất sáng kiến và phối hợp hoạt động phù hợp."],
                  ["Môi trường sống lành mạnh", "Khuyến khích nước sạch, vệ sinh môi trường, phân loại rác, không gian vận động an toàn và sự tham gia của người dân vào các hoạt động cộng đồng."],
                  ["Nâng cao năng lực hội viên", "Đề xuất tập huấn kỹ năng truyền thông, tổ chức sự kiện, quản lý thông tin và phối hợp liên ngành trên cơ sở quy định hiện hành."]
                ].map(([name, desc]) => <article key={name} className="border border-slate-200 rounded-lg p-4 bg-slate-50"><h4 className="font-bold text-red-800 mb-2">{name}</h4><p>{desc}</p></article>)}
              </div>
              <h3 className="text-lg font-bold font-serif">Nguyên tắc triển khai hoạt động hướng tới cộng đồng</h3>
              <p>Trong quá trình xây dựng các chương trình giáo dục sức khỏe, nội dung truyền thông cần xác định rõ nhóm đối tượng tiếp cận, nhu cầu thông tin, khả năng áp dụng và phương thức tiếp nhận phản hồi. Thông điệp nên được diễn đạt dễ hiểu, tránh gây hiểu lầm hoặc đưa ra cam kết hiệu quả không có căn cứ.</p>
              <p>Hoạt động phối hợp có thể được tổ chức theo từng chuyên đề, kết hợp hình thức trực tiếp và trực tuyến. Tài liệu phổ biến cần có đơn vị biên soạn, nguồn tham khảo và thời điểm cập nhật; các nội dung chuyên môn cần được người có năng lực phù hợp rà soát trước khi công bố.</p>
              <h3 className="text-lg font-bold font-serif">Các nhóm đối tượng tiếp cận thông tin</h3>
              <p><strong>Người dân và hộ gia đình:</strong> tiếp cận kiến thức phòng bệnh, vệ sinh, dinh dưỡng và cách tìm kiếm dịch vụ y tế phù hợp. <strong>Học sinh và phụ huynh:</strong> quan tâm đến sức khỏe học đường, an toàn sinh hoạt và thói quen lành mạnh. <strong>Người cao tuổi:</strong> chú trọng vận động phù hợp, phòng ngừa rủi ro sinh hoạt và duy trì kết nối xã hội. <strong>Hội viên và cộng tác viên:</strong> tham khảo tài liệu, trao đổi kinh nghiệm và phương pháp truyền thông có trách nhiệm.</p>
              <h3 className="text-lg font-bold font-serif">Tiêu chí đánh giá chất lượng nội dung</h3>
              <p>Để việc phổ biến kiến thức có giá trị thực tiễn, mỗi chuyên đề có thể được rà soát theo các tiêu chí: tính chính xác, tính cập nhật, mức độ dễ hiểu, sự phù hợp với nhóm độc giả, nguồn trích dẫn và khả năng tiếp nhận phản hồi. Những thông tin có thay đổi theo hướng dẫn chuyên môn cần được cập nhật hoặc ghi chú phiên bản rõ ràng.</p>
              <h3 className="text-lg font-bold font-serif">Định hướng phát triển nội dung website</h3>
              <p>Website được định hướng trở thành kênh thông tin có cấu trúc rõ ràng, thuận tiện cho người dân, hội viên và các đơn vị phối hợp. Nội dung nên được phân loại theo đối tượng, lĩnh vực và thời gian; có tác giả hoặc đơn vị phụ trách, ngày cập nhật và nguồn tham khảo khi cần.</p>
              <p>Đối với các hoạt động thực tế, mỗi bài đăng nên thể hiện mục tiêu, địa điểm, thời gian, đơn vị tổ chức, nội dung chính, kết quả được xác nhận và hình ảnh được phép sử dụng. Việc công khai thông tin cá nhân phải tuân thủ quy định bảo vệ dữ liệu.</p>
              <h3 className="text-lg font-bold font-serif">Các câu hỏi thường gặp</h3>
              {[
                ["Người dân có thể tìm thông tin gì trên website?", "Các bài giới thiệu về Hội, thông tin hoạt động, văn bản công khai, tin tức và nội dung giáo dục sức khỏe đã được biên tập."],
                ["Thông tin sức khỏe trên website có thay thế tư vấn bác sĩ không?", "Không. Nội dung mang tính giáo dục và tham khảo, không thay thế việc thăm khám, chẩn đoán hoặc điều trị của nhân viên y tế."],
                ["Làm thế nào để kiểm tra tính chính thức của văn bản?", "Đối chiếu số ký hiệu, ngày ban hành, cơ quan ban hành và bản PDF gốc hoặc nguồn công bố có thẩm quyền."],
                ["Thông tin lãnh đạo được cập nhật ra sao?", "Hồ sơ cần được kiểm tra theo quyết định nhân sự, nhiệm kỳ và sự đồng ý công khai thông tin liên hệ trước khi xuất bản."]
              ].map(([q,a]) => <details key={q} className="border rounded-lg p-4"><summary className="cursor-pointer font-semibold text-slate-900">{q}</summary><p className="mt-3">{a}</p></details>)}
            </section>
          </div>
        )}

        {/* TAB 2: BAN THƯỜNG TRỰC LÃNH ĐẠO */}
        {activeTab === "LEADERS" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xs border border-slate-300 shadow-xs p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3 mb-6 gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif">
                  Giới Thiệu Cơ Cấu Lãnh Đạo Trung Ương Hội
                </h3>
                <Link
                  href="/nhan-su"
                  className="text-xs font-bold text-[#991b1b] hover:underline flex items-center gap-1 font-gov"
                >
                  Xem thông tin tổ chức &raquo;
                </Link>
              </div>

              <div className="mb-6 space-y-3 text-sm text-slate-700 leading-relaxed">
                <h4 className="font-bold text-base text-slate-900">Vai trò của bộ máy lãnh đạo Hội</h4>
                <p>Ban lãnh đạo có vai trò định hướng hoạt động, tổ chức triển khai các nhiệm vụ theo Điều lệ và phối hợp giữa các bộ phận của Hội. Việc phân công chức trách, thẩm quyền và nhiệm kỳ của từng vị trí cần căn cứ vào văn bản tổ chức, nhân sự đã được xác nhận.</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {[["Định hướng", "Thảo luận mục tiêu và chương trình hoạt động theo thẩm quyền."], ["Điều phối", "Phối hợp hoạt động giữa các đơn vị và hội viên."], ["Giám sát", "Theo dõi việc thực hiện nhiệm vụ, chế độ thông tin và báo cáo."]].map(([title, desc]) => <div key={title} className="p-4 bg-slate-50 border border-slate-200 rounded-lg"><h5 className="font-bold text-red-800">{title}</h5><p className="mt-1 text-xs">{desc}</p></div>)}
                </div>
                <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded">Các thẻ bên dưới chỉ giới thiệu vị trí, không đại diện cho danh sách nhân sự đương nhiệm. Họ tên, nhiệm kỳ, ảnh và thông tin liên hệ chỉ được bổ sung khi có nguồn xác minh và quyền công bố.</p>
              </div>

                <div className="mt-5 space-y-4">
                  <h4 className="font-bold text-base text-slate-900">Cơ cấu và nhiệm vụ tham khảo</h4>
                  <p>Trong mô hình tổ chức hội, các bộ phận lãnh đạo, điều hành và chuyên môn có thể được phân công nhiệm vụ khác nhau. Cơ cấu cụ thể của Hội phải được xác định theo Điều lệ và quyết định nhân sự có hiệu lực.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      ["Ban Chấp hành", "Thảo luận các vấn đề thuộc thẩm quyền; định hướng và theo dõi việc thực hiện nghị quyết."],
                      ["Ban Thường vụ", "Phối hợp xử lý công việc giữa các kỳ họp theo phạm vi được Điều lệ quy định."],
                      ["Chủ tịch và các Phó Chủ tịch", "Thực hiện trách nhiệm lãnh đạo, đại diện và các nhiệm vụ được phân công."],
                      ["Văn phòng và bộ phận chuyên môn", "Hỗ trợ hành chính, tổng hợp, truyền thông và phối hợp hoạt động theo phân công."],
                    ].map(([name, detail]) => <div key={name} className="border border-slate-200 p-4 rounded-lg"><h5 className="font-bold text-red-800">{name}</h5><p className="mt-2 text-xs">{detail}</p></div>)}
                  </div>
                  <h4 className="font-bold text-base text-slate-900">Thông tin cần công khai cho mỗi hồ sơ</h4>
                  <p>Họ tên, chức danh, đơn vị công tác, nhiệm kỳ, lĩnh vực phụ trách, ảnh chân dung được phép sử dụng và thông tin liên hệ công vụ (nếu được công bố). Không sử dụng số điện thoại cá nhân hay email chưa được đồng ý.</p>
                  <h4 className="font-bold text-base text-slate-900">Quy trình cập nhật nhân sự</h4>
                  <p>Khi có thay đổi nhân sự, quản trị viên nên đối chiếu văn bản bổ nhiệm hoặc kiện toàn, cập nhật hồ sơ, ghi nhận thời điểm thay đổi và lưu trữ thông tin nhiệm kỳ cũ để thuận tiện tra cứu.</p>
                </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ["Chủ tịch Hội", "Định hướng, đại diện và điều hành theo Điều lệ và phân công hợp lệ."],
                  ["Phó Chủ tịch Hội", "Phối hợp điều hành và phụ trách lĩnh vực theo quyết định phân công."],
                  ["Ban Thường vụ", "Thực hiện nhiệm vụ quản trị theo Điều lệ và nghị quyết có hiệu lực."],
                ].map(([position, description]) => (
                  <div key={position} className="bg-slate-50 rounded-xs p-5 border border-slate-200 text-center space-y-3 shadow-xs">
                    <div className="w-24 h-24 rounded-full mx-auto border-2 border-[#991b1b] bg-slate-100 flex items-center justify-center text-slate-400"><Users className="w-10 h-10" aria-hidden="true" /></div>
                    <h4 className="font-bold text-base text-slate-900 font-serif">{position}</h4>
                    <p className="text-xs text-slate-600">{description}</p>
                    <p className="text-xs text-amber-800">Hồ sơ nhân sự chính thức đang chờ xác minh</p>
                  </div>
                ))}
              </div>
            </div>

            <section className="bg-white border border-slate-300 rounded-lg p-6 space-y-5">
              <h3 className="text-xl font-bold font-serif text-red-800">Giới thiệu cơ cấu quản lý và phối hợp</h3>
              <p className="text-sm text-slate-700">Phần dưới mô tả vai trò tham khảo của các bộ phận thường gặp trong một tổ chức hội; cơ cấu, thẩm quyền và nhân sự chính thức phải đối chiếu Điều lệ và quyết định hiện hành.</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  ["Ban Chấp hành", "Thảo luận định hướng hoạt động, triển khai nghị quyết đại hội, theo dõi việc thực hiện các nhiệm vụ theo Điều lệ."],
                  ["Ban Thường vụ", "Phối hợp xử lý công việc thường xuyên theo phân công, chuẩn bị nội dung trình cấp có thẩm quyền và giám sát tiến độ."],
                  ["Chủ tịch và các Phó Chủ tịch", "Đại diện, điều phối các lĩnh vực được phân công và tổ chức thực hiện chương trình công tác trong phạm vi thẩm quyền."],
                  ["Văn phòng Hội", "Hỗ trợ hành chính, lưu trữ hồ sơ, tổng hợp báo cáo, tiếp nhận thông tin và kết nối giữa các đơn vị."],
                  ["Ban chuyên môn", "Tham mưu nội dung chuyên ngành, tổ chức trao đổi kinh nghiệm và hỗ trợ hoạt động truyền thông phù hợp."],
                  ["Đơn vị trực thuộc", "Thực hiện nhiệm vụ được giao theo quyết định thành lập, quy chế hoạt động và quy định pháp luật có liên quan."]
                ].map(([title,body]) => <div key={title} className="p-4 border border-slate-200 rounded-lg bg-slate-50"><h4 className="font-bold text-red-800">{title}</h4><p className="text-sm text-slate-700 mt-2">{body}</p></div>)}
              </div>
              <h4 className="font-bold text-slate-900">Nguyên tắc công khai thông tin nhân sự</h4>
              <p className="text-sm text-slate-700">Thông tin chức vụ và nhiệm kỳ nên được cập nhật khi có quyết định mới. Khi một cá nhân thay đổi vị trí công tác, hồ sơ cần thể hiện rõ thời điểm cập nhật để người đọc không nhầm lẫn giữa các nhiệm kỳ. Chỉ sử dụng ảnh và thông tin liên hệ đã được phép công khai; tránh công bố dữ liệu cá nhân không phục vụ mục đích giới thiệu tổ chức.</p>
              <h4 className="font-bold text-slate-900">Phối hợp giữa các cấp và đơn vị</h4>
              <p className="text-sm text-slate-700">Việc phối hợp công việc cần dựa trên phân công nhiệm vụ, chế độ báo cáo và đầu mối tiếp nhận thông tin. Những nội dung liên quan đến thẩm quyền ký văn bản, đại diện tổ chức và trách nhiệm của từng bộ phận phải đối chiếu Điều lệ, quy chế và quyết định hiện hành của Hội.</p>
              <h4 className="font-bold text-slate-900">Tiêu chuẩn hiển thị hồ sơ lãnh đạo</h4>
              <p className="text-sm text-slate-700">Mỗi hồ sơ nên có họ tên, chức vụ, nhiệm kỳ, lĩnh vực phụ trách, ảnh được phép sử dụng và nguồn xác minh. Số điện thoại, email cá nhân và dữ liệu chưa xác thực không nên công khai. Các thẻ phía trên mô tả chức danh, không phải danh sách nhân sự chính thức.</p>
            </section>
          </div>
        )}

        {/* TAB 3: ĐIỀU LỆ VÀ QUYẾT ĐỊNH THÀNH LẬP */}
        {activeTab === "CHARTER" && (
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs p-6 sm:p-8 space-y-6 text-xs text-slate-700">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 font-serif">
              Văn Bản Pháp Lý Nền Tảng Của Hội
            </h3>

            <p className="text-sm leading-relaxed">Hệ thống văn bản là cơ sở để người xem tìm hiểu quá trình thành lập, nguyên tắc tổ chức và hoạt động của Hội. Nội dung được chia thành nhóm văn bản nền tảng và nhóm văn bản quản trị, giúp tra cứu thuận tiện hơn.</p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200"><h4 className="font-bold text-red-800 mb-2">Văn bản nền tảng</h4><p>Quyết định cho phép thành lập, Điều lệ Hội và các văn bản sửa đổi, bổ sung nếu có.</p></div>
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200"><h4 className="font-bold text-red-800 mb-2">Văn bản quản trị</h4><p>Nghị quyết, quy chế, quyết định, thông báo của Ban Chấp hành và Ban Thường vụ theo từng thời kỳ.</p></div>
            </div>
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded">Thông tin số hiệu và ngày ban hành bên dưới là dữ liệu hiện có trong mã nguồn, chưa được đối chiếu với bản gốc. Chỉ đăng tải hoặc mở PDF khi đã có tệp văn bản được xác thực.</p>

            <section className="space-y-4 text-sm">
              <h3 className="font-bold text-lg text-slate-900">Danh mục văn bản và mục đích tra cứu</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  ["Quyết định thành lập", "Xác định căn cứ pháp lý về việc cho phép thành lập Hội; cần bản sao đúng nguồn."],
                  ["Điều lệ Hội", "Quy định về tôn chỉ, mục đích, nguyên tắc hoạt động, hội viên và cơ cấu tổ chức."],
                  ["Văn bản sửa đổi Điều lệ", "Làm rõ những nội dung được điều chỉnh, bổ sung và thời điểm áp dụng (nếu có)."],
                  ["Nghị quyết Ban Chấp hành", "Tra cứu các nội dung được thông qua tại các kỳ họp theo thẩm quyền."],
                  ["Quyết định Ban Thường vụ", "Theo dõi các quyết định thuộc phạm vi trách nhiệm của Ban Thường vụ."],
                  ["Quy chế hoạt động", "Tìm hiểu quy trình phối hợp, chế độ làm việc và phân công trách nhiệm."],
                  ["Thông báo và hướng dẫn", "Theo dõi các thông tin điều hành, hướng dẫn thực hiện và lịch hoạt động."],
                  ["Báo cáo tổng kết", "Tham khảo kết quả hoạt động theo từng giai đoạn khi có báo cáo được phê duyệt."],
                ].map(([name, desc]) => <article key={name} className="rounded-lg p-4 border border-slate-200 bg-slate-50"><h4 className="font-bold text-red-800">{name}</h4><p className="mt-2">{desc}</p></article>)}
              </div>
              <h3 className="font-bold text-lg text-slate-900">Thông tin nên có trên mỗi văn bản</h3>
              <p>Mỗi hồ sơ văn bản nên thể hiện: tên văn bản, số ký hiệu, cơ quan ban hành, người ký, ngày ký, ngày có hiệu lực (nếu xác định), lĩnh vực, tóm tắt nội dung, tình trạng hiệu lực và tệp đính kèm được xác thực.</p>
              <h3 className="font-bold text-lg text-slate-900">Nguyên tắc lưu trữ và cập nhật</h3>
              <p>Văn bản được công khai nên có bản điện tử rõ ràng, tên tệp thống nhất, ngày cập nhật và thông tin nguồn. Nếu có văn bản thay thế hoặc sửa đổi, cần ghi chú quan hệ giữa các phiên bản để người xem không sử dụng nhầm tài liệu cũ. Với tài liệu chưa đủ căn cứ xác thực, chỉ nên để trạng thái chờ bổ sung thay vì tạo tệp PDF giả.</p>
              <h3 className="font-bold text-lg text-slate-900">Phân biệt tài liệu công khai và tài liệu nội bộ</h3>
              <p>Không phải mọi tài liệu quản trị đều được phép đăng công khai. Trước khi xuất bản, bộ phận phụ trách cần rà soát quyền công bố, thông tin cá nhân, chữ ký, phụ lục và các nội dung cần bảo mật theo quy định. Người xem chỉ nên được truy cập những tệp đã được phê duyệt công khai.</p>
              <h3 className="font-bold text-lg text-slate-900">Hướng dẫn tra cứu</h3>
              <ol className="list-decimal pl-5 space-y-2"><li>Chọn nhóm văn bản phù hợp với nội dung cần tìm.</li><li>Đối chiếu tên văn bản và số ký hiệu, ưu tiên bản được đăng tải bởi nguồn chính thức.</li><li>Kiểm tra thời điểm ban hành và hiệu lực trước khi sử dụng.</li><li>Liên hệ bộ phận phụ trách nếu chưa có tệp đính kèm hoặc thông tin chưa được xác nhận.</li></ol>
              <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">Các nhóm trên là danh mục gợi ý để tổ chức nội dung website, không có nghĩa Hội đã ban hành đầy đủ các văn bản tương ứng.</p>
            </section>
            <section className="space-y-3 text-sm border-t border-slate-200 pt-5">
              <h3 className="font-bold text-lg text-slate-900">Tra cứu danh mục văn bản theo nhóm</h3>
              <p className="text-xs text-amber-800">Danh mục bên dưới là khung dữ liệu chờ tài liệu chính thức, không phải danh sách văn bản đã ban hành.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input aria-label="Tìm văn bản" value={documentQuery} onChange={e=>setDocumentQuery(e.target.value)} placeholder="Tìm nhóm hoặc nội dung văn bản..." className="border border-slate-300 rounded p-3 flex-1" />
                <select aria-label="Lọc nhóm văn bản" value={documentCategory} onChange={e=>setDocumentCategory(e.target.value)} className="border border-slate-300 rounded p-3"><option>Tất cả</option>{DOCUMENT_CATEGORIES.map(doc=><option key={doc.category}>{doc.category}</option>)}</select>
              </div>
              <div className="space-y-2">{DOCUMENT_CATEGORIES.filter(doc=>(documentCategory==="Tất cả"||documentCategory===doc.category)&&(doc.category+" "+doc.description).toLocaleLowerCase('vi').includes(documentQuery.trim().toLocaleLowerCase('vi'))).map(doc=><div key={doc.category} className="border border-slate-200 bg-slate-50 p-4"><h4 className="font-bold text-red-800">{doc.category}</h4><p className="mt-1">{doc.description}</p>{pdfsForCategory(doc.category).length > 0 ? (
                    <div className="mt-3 space-y-2">{pdfsForCategory(doc.category).map(pdf => (
                      <div key={pdf.file} className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="font-medium">{pdf.title}</span>
                        <a href={pdf.file} target="_blank" rel="noopener noreferrer" className="text-red-800 underline">Xem PDF</a>
                        <a href={pdf.file} download className="text-red-800 underline">Tải PDF</a>
                      </div>
                    ))}</div>
                  ) : <p className="text-xs text-amber-800 mt-2">{doc.status} — chưa có tệp PDF xác thực</p>}</div>)}</div>
              {DOCUMENT_CATEGORIES.filter(doc=>(documentCategory==="Tất cả"||documentCategory===doc.category)&&(doc.category+" "+doc.description).toLocaleLowerCase('vi').includes(documentQuery.trim().toLocaleLowerCase('vi'))).length===0&&<p>Không tìm thấy danh mục phù hợp.</p>}
            </section>
            <div className="space-y-4">
              {[
                { title: "Quyết định cho phép thành lập Hội", detail: "Số ký hiệu, ngày ban hành, cơ quan ký và bản PDF: chờ xác minh từ nguồn chính thức." },
                { title: "Điều lệ Hội và các văn bản sửa đổi (nếu có)", detail: "Phiên bản, cơ quan phê duyệt, hiệu lực và bản PDF: chờ xác minh từ nguồn chính thức." },
              ].map((doc) => (
                <div key={doc.title} className="p-4 bg-slate-50 rounded-xs border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-slate-900 font-serif">{doc.title}</h4>
                    <p className="text-slate-500">{doc.detail}</p>
                  </div>
                  <span className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-xs font-bold self-start sm:self-auto shrink-0">Chưa có PDF xác thực</span>
                </div>
              ))}
            </div>

            <section className="mt-7 pt-6 border-t border-slate-200 space-y-4">
              <h3 className="text-lg font-bold font-serif text-red-800">Danh mục văn bản cần hoàn thiện</h3>
              <p className="text-sm">Đây là danh mục nhóm tài liệu đề xuất để bổ sung, không phải xác nhận rằng các văn bản cụ thể đã được ban hành.</p>
              <div className="overflow-x-auto"><table className="min-w-full text-left text-sm border-collapse"><thead className="bg-red-50"><tr><th className="p-3 border">Nhóm văn bản</th><th className="p-3 border">Nội dung cần công khai</th><th className="p-3 border">Tình trạng</th></tr></thead><tbody>
                {[
                  ["Thành lập và điều lệ", "Quyết định thành lập, điều lệ và các lần sửa đổi"],
                  ["Đại hội", "Nghị quyết, biên bản, chương trình nhiệm kỳ"],
                  ["Ban Chấp hành", "Nghị quyết, quyết định, kết luận theo thẩm quyền"],
                  ["Ban Thường vụ", "Quy chế, thông báo và quyết định điều hành"],
                  ["Tổ chức bộ máy", "Quyết định thành lập, kiện toàn và phân công"],
                  ["Hội viên", "Quy định kết nạp, quyền lợi, nghĩa vụ và quản lý hội viên"],
                  ["Hoạt động chuyên môn", "Kế hoạch, hướng dẫn và báo cáo chương trình"],
                  ["Báo cáo và công khai", "Báo cáo định kỳ, tổng kết, thông tin công khai phù hợp"]
                ].map(([name,description]) => <tr key={name}><td className="p-3 border font-semibold">{name}</td><td className="p-3 border">{description}</td><td className="p-3 border text-amber-800">Chờ xác minh / bổ sung</td></tr>)}
              </tbody></table></div>
              <h4 className="font-bold">Quy trình kiểm tra trước khi đăng tải</h4>
              <ol className="list-decimal pl-6 text-sm space-y-2"><li>Tiếp nhận bản gốc hoặc bản sao được phép công khai.</li><li>Kiểm tra cơ quan ban hành, số ký hiệu, ngày ban hành và hiệu lực.</li><li>Đặt tên tệp thống nhất, bổ sung mô tả và phân loại.</li><li>Kiểm tra nội dung nhạy cảm và quyền công khai.</li><li>Đăng bản PDF hợp lệ, thử chức năng xem và tải, cập nhật khi có thay đổi.</li></ol>
            </section>
          </div>
        )}
      </main>
  );
}

export default function AboutPage() {
  return (
    <>
      <PublicHeader />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-gov">Đang tải trang giới thiệu...</div>}>
        <AboutPageContent />
      </Suspense>
      <PublicFooter />
    </>
  );
}

