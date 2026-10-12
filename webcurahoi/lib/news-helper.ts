import { NewsItem } from "./mock-news-data";

export interface ArticleParagraphBlock {
  type: "paragraph" | "heading" | "quote" | "callout" | "list";
  text?: string;
  items?: string[];
  author?: string;
  role?: string;
  title?: string;
}

export interface DetailedArticle {
  id: string;
  title: string;
  category: string;
  groupName: string;
  date: string;
  publishedTime: string;
  image: string;
  imageCaption: string;
  excerpt: string;
  views: number;
  reads: number;
  shares: number;
  readTime: string;
  author: string;
  source: string;
  sourceUrl: string;
  sourceDomain: string;
  editor: string;
  tags: string[];
  keyTakeaways: string[];
  blocks: ArticleParagraphBlock[];
}

export interface NewsGroup {
  id: string;
  slug: string;
  path: string;
  name: string;
  shortName: string;
  docOrder: number;
  description: string;
  subCategories: string[];
}

export const OFFICIAL_NEWS_GROUPS: NewsGroup[] = [
  {
    id: "GROUP_1_CHINH_SACH",
    slug: "chinh-sach-phap-luat",
    path: "/tin-tuc/chinh-sach-phap-luat",
    name: "1. Các chính sách, chiến lược, luật pháp về bảo vệ, chăm sóc, nâng cao sức khỏe nhân dân",
    shortName: "Chính sách & Pháp luật sức khỏe",
    docOrder: 1,
    description: "Văn bản quy phạm pháp luật, chiến lược quốc gia về y tế công cộng và giáo dục sức khỏe nhân dân",
    subCategories: ["Chính sách & Pháp luật"],
  },
  {
    id: "GROUP_2_SU_KIEN_TW",
    slug: "su-kien-trung-uong",
    path: "/tin-tuc/su-kien-trung-uong",
    name: "2. Các sự kiện lớn của Hội (Đại Hội; Hội nghị BCH, Ban Thường vụ, Ban Thường trực; Hội thảo, Tọa đàm khoa học...)",
    shortName: "Sự kiện lớn Trung ương Hội",
    docOrder: 2,
    description: "Các hoạt động lãnh đạo, chỉ đạo, đại hội nhiệm kỳ, hội thảo khoa học và ký kết hợp tác cấp Trung ương",
    subCategories: ["Sự kiện Trung ương Hội"],
  },
  {
    id: "GROUP_3_DON_VI",
    slug: "hoat-dong-don-vi",
    path: "/tin-tuc/hoat-dong-don-vi",
    name: "3. Các hoạt động quan trọng của các đơn vị thuộc Hội (Thành lập mới, các sự kiện, Viện - Trường, Chi hội...)",
    shortName: "Hoạt động Đơn vị thuộc Hội",
    docOrder: 3,
    description: "Phong trào tại 63 tỉnh thành, các Viện nghiên cứu, Trung tâm ứng dụng và khối trường đào tạo trực thuộc",
    subCategories: ["Hoạt động Địa phương", "Viện - Trường Đào tạo"],
  },
  {
    id: "GROUP_4_LIEN_QUAN",
    slug: "hoat-dong-khac",
    path: "/tin-tuc/hoat-dong-khac",
    name: "4. Các hoạt động liên quan khác (Thiện nguyện, Thể thao - Văn nghệ, Thời sự y tế 24/7...)",
    shortName: "Hoạt động Liên quan khác",
    docOrder: 4,
    description: "Phong trào thiện nguyện vì sức khỏe cộng đồng, cẩm nang y tế thường thức và thông tin thời sự 24/7",
    subCategories: ["Thời sự 24/7", "Thiện nguyện vì sức khỏe"],
  },
];

/**
 * Lấy thông tin nhóm theo mã định danh (id)
 */
export function getNewsGroupById(id: string): NewsGroup | undefined {
  return OFFICIAL_NEWS_GROUPS.find((g) => g.id === id);
}

/**
 * Lấy thông tin nhóm theo đường dẫn slug
 */
export function getNewsGroupBySlug(slug: string): NewsGroup | undefined {
  return OFFICIAL_NEWS_GROUPS.find((g) => g.slug === slug);
}

/**
 * Xác định nhóm chính theo nội dung file Word của bài viết
 */
export function getNewsGroup(category: string): NewsGroup {
  const cat = category.toLowerCase();
  if (cat.includes("chính sách") || cat.includes("pháp luật")) {
    return OFFICIAL_NEWS_GROUPS[0];
  }
  if (cat.includes("trung ương hội") || cat.includes("đại hội") || cat.includes("sự kiện lớn")) {
    return OFFICIAL_NEWS_GROUPS[1];
  }
  if (cat.includes("địa phương") || cat.includes("viện") || cat.includes("trường") || cat.includes("chi hội")) {
    return OFFICIAL_NEWS_GROUPS[2];
  }
  return OFFICIAL_NEWS_GROUPS[3];
}

/**
 * Tính số lượt xem giả lập nhưng ổn định theo mã bài viết
 */
export function getArticleViews(item: NewsItem): number {
  const numericId = parseInt(item.id.replace(/\D/g, "") || "1", 10);
  const baseViews = 1850 + ((numericId * 137) % 3600);
  return item.featured ? baseViews + 1450 : baseViews;
}

export function getArticleReads(item: NewsItem): number {
  const views = getArticleViews(item);
  return Math.floor(views * 0.82);
}

export function getArticleReadTime(item: NewsItem): string {
  const numericId = parseInt(item.id.replace(/\D/g, "") || "1", 10);
  const minutes = 3 + (numericId % 4);
  return `${minutes} phút đọc`;
}

/**
 * Lấy nội dung chi tiết bài viết (Fake info chuẩn văn phong báo chí nhà nước)
 */
export function getDetailedArticle(item: NewsItem): DetailedArticle {
  const group = getNewsGroup(item.category);
  const views = getArticleViews(item);
  const reads = getArticleReads(item);
  const readTime = getArticleReadTime(item);

  // Nếu là bài viết số news-001 (Bài trong ảnh chụp từ file Word)
  if (item.id === "news-001") {
    return {
      id: item.id,
      title: item.title,
      category: item.category,
      groupName: group.shortName,
      date: item.date,
      publishedTime: `${item.date} - 08:30 (GMT+7)`,
      image: item.image,
      imageCaption: "Toàn cảnh Hội nghị Ban Thường vụ Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam diễn ra tại Hà Nội.",
      excerpt: item.excerpt,
      views,
      reads,
      shares: 142,
      readTime: "6 phút đọc",
      author: "Phóng viên Hoàng Nam - Ban Tuyên giáo & Truyền thông",
      source: "Văn phòng Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam",
      sourceUrl: "https://suckhoecongdong.net.vn",
      sourceDomain: "suckhoecongdong.net.vn (Tạp chí Sức Khỏe Cộng Đồng)",
      editor: "Ban Biên tập Cổng Thông tin điện tử VACHE",
      tags: ["Trung ương Hội", "Chiến lược 2030", "Chăm sóc sức khỏe cộng đồng", "Y tế cơ sở", "Hội nghị Ban Thường vụ"],
      keyTakeaways: [
        "Hội nghị thống nhất 5 nhóm giải pháp đột phá thực hiện Chiến lược Chăm sóc Sức khỏe Cộng đồng đến năm 2030.",
        "Mục tiêu 100% các Chi hội địa phương ứng dụng nền tảng số hóa trong quản lý hội viên và phổ biến kiến thức.",
        "Mở rộng mô hình 'Mỗi hội viên là một tuyên truyền viên tự chăm sóc sức khỏe' đến toàn bộ 63 tỉnh, thành phố.",
        "Thành lập thêm 20 trung tâm nghiên cứu và thực hành dưỡng sinh sinh thái phục vụ người cao tuổi và đối tượng yếu thế.",
      ],
      blocks: [
        {
          type: "paragraph",
          text: "Sáng ngày 10/10/2026, tại Cung Trí thức TP. Hà Nội, Ban Thường trực Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam (VACHE) đã long trọng tổ chức Hội nghị Ban Thường vụ định kỳ nhằm đánh giá toàn diện kết quả công tác 9 tháng đầu năm và thảo luận, thông qua dự thảo Kế hoạch hành động triển khai Chiến lược Chăm sóc và Nâng cao Sức khỏe Nhân dân giai đoạn 2026 - 2030, tầm nhìn đến năm 2045.",
        },
        {
          type: "heading",
          title: "1. Đánh giá kết quả công tác và bối cảnh y tế cộng đồng hiện nay",
        },
        {
          type: "paragraph",
          text: "Chủ trì hội nghị có đồng chí Nguyễn Hồng Quân - Nguyên Ủy viên Ban Chấp hành Trung ương Đảng, Nguyên Bộ trưởng Bộ Xây dựng, Chủ tịch Trung ương Hội; cùng dự có TS. Lê Đình Tiến - Phó Chủ tịch Thường trực Trung ương Hội, PGS.TS. Nguyễn Thị Chính - Phó Chủ tịch Hội, TS. Vũ Việt Anh - Phó Chủ tịch Hội, Đại tá Tạ Quang Vinh - Phó Chủ tịch kiêm Tổng Thư ký Trung ương Hội và đông đủ các đồng chí Ủy viên Ban Thường vụ Trung ương Hội.",
        },
        {
          type: "quote",
          text: "Chăm sóc sức khỏe cộng đồng không chỉ là nhiệm vụ riêng của ngành y tế điều trị mà là sự nghiệp của toàn dân. Trong kỷ nguyên mới, Hội phải đóng vai trò là cầu nối vững chắc, chuyển hóa chủ trương xã hội hóa y tế của Đảng và Nhà nước thành hành động cụ thể, giúp mỗi người dân có đủ kiến thức, kỹ năng tự phòng bệnh và nâng cao thể trạng ngay tại mái ấm gia đình.",
          author: "Đồng chí Nguyễn Hồng Quân",
          role: "Chủ tịch Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam",
        },
        {
          type: "paragraph",
          text: "Báo cáo tại hội nghị, Tổng Thư ký Tạ Quang Vinh cho biết, tính đến hết tháng 9/2026, tổ chức Hội đã có mặt tại 63 tỉnh, thành phố trực thuộc Trung ương với hơn 1.200 Chi hội cơ sở và trên 180.000 hội viên hoạt động tích cực. Trong 9 tháng qua, các cấp Hội đã tổ chức hơn 3.500 buổi truyền thông giáo dục sức khỏe, khám sàng lọc và cấp phát thuốc miễn phí cho trên 250.000 lượt người có công, người cao tuổi và đồng bào vùng sâu, vùng xa.",
        },
        {
          type: "heading",
          title: "2. 5 nhóm nhiệm vụ trọng tâm của Chiến lược đến năm 2030",
        },
        {
          type: "paragraph",
          text: "Hội nghị đã dành nhiều thời gian thảo luận sâu sắc về các giải pháp tháo gỡ khó khăn tại cơ sở và thống nhất biểu quyết thông qua 5 nhóm giải pháp then chốt:",
        },
        {
          type: "list",
          items: [
            "Kiện toàn mạng lưới tổ chức Hội từ Trung ương đến xã, phường, thị trấn; chuẩn hóa quy trình kết nạp và quản lý hội viên trên nền tảng cơ sở dữ liệu số quốc gia.",
            "Phối hợp chặt chẽ với Bộ Y tế, Tổng hội Y học Việt Nam và các Viện - Trường y dược triển khai đề án 'Sức khỏe học đường và Dinh dưỡng thế hệ tương lai', chú trọng kiểm soát tật khúc xạ, cong vẹo cột sống và dinh dưỡng học đường.",
            "Đẩy mạnh mô hình dưỡng sinh y học cổ truyền, phát triển vùng trồng dược liệu sạch chuẩn GACP-WHO, kết hợp tinh hoa nam dược với y học hiện đại trong phòng ngừa bệnh mạn tính không lây (tim mạch, đái tháo đường, xương khớp).",
            "Nâng cao năng lực truyền thông số: Đưa Cổng thông tin điện tử của Hội và Tạp chí Sức Khỏe Cộng Đồng thành kênh thông tin tin cậy, chính thống, đấu tranh phản bác các luận điệu sai trái, quảng cáo thực phẩm chức năng giả mạo gây hại cho nhân dân.",
            "Tăng cường công tác kiểm tra, giám sát tài chính và vận động quỹ thiện nguyện; đảm bảo 100% các nguồn thu chi phí hội và tài trợ được công khai minh bạch qua hệ thống tài khoản chuyên dụng và quét mã VietQR tự động.",
          ],
        },
        {
          type: "callout",
          title: "Thông điệp hành động của Hội nghị",
          text: "Mỗi Chi hội là một pháo đài sống khỏe, mỗi hội viên là một tuyên truyền viên gương mẫu, quyết tâm xây dựng một cộng đồng người Việt có thể lực sung mãn, tinh thần minh mẫn và tuổi thọ khỏe mạnh bền vững.",
        },
        {
          type: "heading",
          title: "3. Tăng cường phối hợp liên ngành và chuyển giao khoa học công nghệ",
        },
        {
          type: "paragraph",
          text: "Phát biểu tại phiên bế mạc, TS. Lê Đình Tiến - Phó Chủ tịch Thường trực Trung ương Hội nhấn mạnh: Trong thời gian tới, Trung ương Hội sẽ đẩy mạnh ký kết hợp tác với các đơn vị trực thuộc như Viện Nghiên cứu Đào tạo và Chăm sóc Sức khỏe ICHC, Viện Nghiên cứu Nấm Dược liệu, các bệnh viện chuyên khoa tuyến đầu để chuyển giao các phác đồ chăm sóc sức khỏe không dùng thuốc, ứng dụng trí tuệ nhân tạo (AI) trong phân tích nguy cơ sức khỏe sớm cho cộng đồng.",
        },
        {
          type: "paragraph",
          text: "Hội nghị kêu gọi toàn thể cán bộ, hội viên, tình nguyện viên các cấp phát huy cao độ tinh thần trách nhiệm, chủ động đổi mới sáng tạo, đoàn kết một lòng, chung tay vì sự nghiệp bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân trong tình hình mới.",
        },
      ],
    };
  }

  // Nội dung chi tiết chuẩn phong cách báo điện tử nhà nước cho các bài viết khác
  return {
    id: item.id,
    title: item.title,
    category: item.category,
    groupName: group.shortName,
    date: item.date,
    publishedTime: `${item.date} - 09:15 (GMT+7)`,
    image: item.image,
    imageCaption: `Hình ảnh hoạt động thực tế: ${item.title}.`,
    excerpt: item.excerpt,
    views,
    reads,
    shares: Math.floor(views * 0.04) + 12,
    readTime,
    author: "Ban Biên Tập Cổng TTĐT Trung ương Hội",
    source: "Văn phòng Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam",
    sourceUrl: item.category.includes("Chính sách")
      ? "https://baochinhphu.vn"
      : item.category.includes("Thời sự")
      ? "https://suckhoedoisong.vn"
      : "https://suckhoecongdong.net.vn",
    sourceDomain: item.category.includes("Chính sách")
      ? "baochinhphu.vn (Cổng Thông tin điện tử Chính phủ)"
      : item.category.includes("Thời sự")
      ? "suckhoedoisong.vn (Báo Sức khỏe & Đời sống - Bộ Y tế)"
      : "suckhoecongdong.net.vn (Tạp chí Sức Khỏe Cộng Đồng)",
    editor: "Cổng Thông tin điện tử VACHE",
    tags: [
      item.category,
      "Trung ương Hội",
      "Sức khỏe cộng đồng",
      "Y tế nhân dân",
      "Hoạt động 2026",
    ],
    keyTakeaways: [
      item.excerpt,
      "Thực hiện nghiêm túc chỉ đạo của Ban Thường vụ Trung ương Hội về nâng cao chất lượng hoạt động cơ sở.",
      "Tăng cường tính chủ động, gắn kết giữa cán bộ y tế, tình nguyện viên và nhân dân tại địa bàn.",
    ],
    blocks: [
      {
        type: "paragraph",
        text: item.excerpt,
      },
      {
        type: "paragraph",
        text: `Nhằm cụ thể hóa các mục tiêu của ${group.name}, Ban Thường trực Trung ương Hội phối hợp cùng các cơ quan, đơn vị liên quan đã chỉ đạo quyết liệt các giải pháp đồng bộ, bảo đảm tính thiết thực, kịp thời và hiệu quả cao nhất phục vụ đời sống nhân dân.`,
      },
      {
        type: "heading",
        title: "Triển khai đồng bộ các giải pháp chuyên môn",
      },
      {
        type: "paragraph",
        text: `Tại cơ sở, các đơn vị đã tập trung đổi mới nội dung và phương thức hoạt động, gắn việc tuyên truyền giáo dục sức khỏe với các phong trào thi đua yêu nước, xây dựng nông thôn mới kiểu mẫu và đô thị văn minh. Việc áp dụng các tiến bộ khoa học kỹ thuật trong phòng ngừa bệnh mạn tính không lây, bảo tồn cây thuốc quý và rèn luyện thân thể đã nhận được sự hưởng ứng nhiệt tình từ đông đảo hội viên.`,
      },
      {
        type: "quote",
        text: "Sức khỏe là vốn quý nhất của con người và của toàn xã hội. Nâng cao sức khỏe nhân dân là mục tiêu hàng đầu, là động lực để xây dựng đất nước phồn vinh và hạnh phúc.",
        author: "Thông điệp Ban Thường trực Trung ương Hội",
        role: "Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam",
      },
      {
        type: "heading",
        title: "Phương hướng và nhiệm vụ trong thời gian tới",
      },
      {
        type: "paragraph",
        text: `Thời gian tới, các cấp Hội tiếp tục quán triệt sâu sắc các chủ trương của Đảng, chính sách pháp luật của Nhà nước về y tế công cộng, tăng cường bồi dưỡng kỹ năng cho đội ngũ tuyên truyền viên, đồng thời mở rộng các chương trình thiện nguyện, hỗ trợ tối đa cho các đối tượng chính sách, người già neo đơn và trẻ em có hoàn cảnh khó khăn trên địa bàn cả nước.`,
      },
      {
        type: "callout",
        title: "Liên hệ và đăng ký hoạt động",
        text: "Các tập thể, cá nhân mong muốn tìm hiểu thông tin chi tiết hoặc phối hợp triển khai hoạt động có thể liên hệ trực tiếp với Văn phòng Trung ương Hội qua đường dây nóng: 024.3782.3556 hoặc gửi văn bản qua Cổng điều hành nội bộ.",
      },
    ],
  };
}
