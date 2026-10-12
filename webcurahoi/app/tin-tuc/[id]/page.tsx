"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_NEWS } from "@/lib/mock-data";
import {
  getDetailedArticle,
  getArticleViews,
  getArticleReads,
  getArticleReadTime,
  getNewsGroup,
  DetailedArticle,
} from "@/lib/news-helper";
import {
  Calendar,
  ChevronLeft,
  Share2,
  User,
  Eye,
  Clock,
  Printer,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bookmark,
  Check,
  MessageSquare,
  Send,
  Sparkles,
  Quote,
  ShieldCheck,
  CornerDownRight,
  ExternalLink,
  ChevronRight,
  Tag,
  ThumbsUp,
} from "lucide-react";

export default function NewsDetailPage() {
  const routerParams = useParams();
  const articleId = typeof routerParams?.id === "string" ? routerParams.id : "news-001";
  const articleItem = MOCK_NEWS.find((n) => n.id === articleId) || MOCK_NEWS[0];
  const article: DetailedArticle = useMemo(() => getDetailedArticle(articleItem), [articleItem]);
  const articleGroup = useMemo(() => getNewsGroup(article.category), [article.category]);

  // Cỡ chữ tùy chỉnh cho người cao tuổi và bạn đọc (A- / A / A+)
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  // Giả lập lượt xem realtime (tăng khi xem bài)
  const [currentViews, setCurrentViews] = useState<number>(article.views);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(article.views * 0.08) + 15);
  const [bookmarked, setBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Trình nghe đọc bài viết AI (Audio Player)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [voiceGender, setVoiceGender] = useState<"bac" | "nam">("bac");

  // Danh sách bình luận bạn đọc mẫu
  const [comments, setComments] = useState([
    {
      id: "cm-1",
      author: "BS. Nguyễn Văn Hùng",
      role: "Chi hội trưởng Chi hội Y tế Ba Đình, Hà Nội",
      date: "10/10/2026 11:20",
      content:
        "Nội dung hội nghị rất kịp thời và thiết thực! Các Chi hội cơ sở chúng tôi hoàn toàn nhất trí với phương hướng triển khai đề án chăm sóc sức khỏe ban đầu và chuyển đổi số quản lý hội viên đến năm 2030.",
    },
    {
      id: "cm-2",
      author: "Hội viên Trần Thị Mai",
      role: "Câu lạc bộ Dưỡng sinh Hải Phòng",
      date: "10/10/2026 14:45",
      content:
        "Rất mong Trung ương Hội tiếp tục nhân rộng các lớp bồi dưỡng thực hành dưỡng sinh không dùng thuốc để người cao tuổi ở các tỉnh thuận tiện tham gia rèn luyện hàng ngày.",
    },
  ]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Tăng lượt xem thực tế và lưu local
  useEffect(() => {
    try {
      const storageKey = `news_views_${article.id}`;
      const viewed = sessionStorage.getItem(storageKey);
      if (!viewed) {
        sessionStorage.setItem(storageKey, "1");
        setCurrentViews((prev) => prev + 1);
      }
    } catch {
      // Ignored
    }
  }, [article.id]);

  // Bộ đếm giả lập cho trình phát audio AI
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAudio) {
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio, playbackSpeed]);

  // Xử lý sao chép link
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Xử lý gửi bình luận
  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newCm = {
      id: `cm-${Date.now()}`,
      author: newCommentName.trim(),
      role: "Bạn đọc Cổng TTĐT",
      date: "Vừa xong",
      content: newCommentText.trim(),
    };
    setComments([newCm, ...comments]);
    setNewCommentName("");
    setNewCommentText("");
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  // Tin liên quan (3 bài viết khác trong cùng danh mục hoặc nổi bật)
  const relatedNews = useMemo(() => {
    return MOCK_NEWS.filter((n) => n.id !== article.id).slice(0, 3);
  }, [article.id]);

  // Lớp CSS cỡ chữ bài viết
  const textClass =
    fontSize === "sm"
      ? "text-[14px] leading-relaxed"
      : fontSize === "lg"
      ? "text-[17.5px] leading-loose"
      : "text-[15.5px] leading-relaxed";

  return (
    <>
      <PublicHeader />

      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 space-y-6 font-gov">
        {/* BREADCRUMB BÁO CHÍ */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-gov flex-wrap">
          <Link href="/" className="hover:text-[#991b1b]">Trang chủ</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/tin-tuc" className="hover:text-[#991b1b]">Tin tức - Sự kiện</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href={articleGroup.path} className="text-[#991b1b] font-medium hover:underline">
            {articleGroup.shortName}
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 line-clamp-1">{article.title}</span>
        </nav>

        {/* NÚT QUAY LẠI */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={articleGroup.path}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#991b1b] hover:bg-red-100/70 bg-red-50 px-3 py-1.5 rounded-xs border border-red-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Quay lại chuyên mục: {articleGroup.shortName}
          </Link>
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#991b1b] hover:underline"
          >
            Tất cả 100 bài viết tin tức →
          </Link>
        </div>

        {/* KHỐI NỘI DUNG BÀI VIẾT CHÍNH */}
        <article className="bg-white rounded-xs border border-slate-300 shadow-sm p-4 sm:p-8 lg:p-10 space-y-6">
          {/* HEADER BÀI VIẾT: DANH MỤC, TIÊU ĐỀ & METADATA */}
          <div className="space-y-3.5 border-b border-slate-200 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block px-3 py-1 bg-[#991b1b] text-white rounded-xs text-[11px] font-bold uppercase tracking-wider font-gov">
                {article.category}
              </span>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-xs text-[11px] font-semibold">
                {article.groupName}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug font-serif">
              {article.title}
            </h1>

            {/* DÒNG THÔNG TIN: NGÀY, TÁC GIẢ, LƯỢT XEM/ĐỌC, THỜI GIAN ĐỌC */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs text-slate-500 font-mono border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1 text-[#991b1b] font-bold">
                  <Calendar className="w-3.5 h-3.5" /> {article.publishedTime}
                </span>
                <span className="hidden sm:inline text-slate-300">|</span>
                <span className="flex items-center gap-1 text-slate-700">
                  <User className="w-3.5 h-3.5 text-slate-400" /> {article.author}
                </span>
              </div>

              {/* LƯỢT XEM / LƯỢT ĐỌC & NGUỒN CHUYỂN HƯỚNG BÁO CHÍ */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-2xs border border-emerald-200">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" /> {currentViews.toLocaleString("vi-VN")} lượt đọc
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {article.readTime}
                </span>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xs text-[11px] font-bold font-gov transition-colors"
                  title={`Mở bài viết gốc trên ${article.sourceDomain}`}
                >
                  <ExternalLink className="w-3 h-3 text-blue-600" />
                  Mở trang báo gốc ↗
                </a>
              </div>
            </div>
          </div>

          {/* THANH CÔNG CỤ ĐỌC BÁO & TIỆN ÍCH BÁO CHÍ NHÀ NƯỚC (ĐỀ XUẤT MỚI) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xs p-3 sm:p-4 space-y-3">
            {/* 1. Trình phát Audio AI / Nghe đọc bài viết */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xs border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all shadow-xs shrink-0 cursor-pointer ${
                    isPlayingAudio ? "bg-amber-600 hover:bg-amber-700" : "bg-[#991b1b] hover:bg-red-800"
                  }`}
                  title={isPlayingAudio ? "Tạm dừng đọc" : "Bấm để nghe đọc bài viết bằng AI"}
                >
                  {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1 font-gov">
                      <Volume2 className="w-3.5 h-3.5 text-[#991b1b]" /> Nghe đọc bài viết (Giọng đọc AI)
                    </span>
                    {isPlayingAudio && (
                      <span className="text-[10px] text-emerald-600 font-bold animate-pulse font-mono">
                        ● Đang phát
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 block font-gov">
                    Thời lượng ước tính: {article.readTime} • Giọng đọc: {voiceGender === "bac" ? "Hà Nội" : "TP.HCM"}
                  </span>
                </div>
              </div>

              {/* Điều khiển tốc độ và giọng đọc */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <select
                  value={voiceGender}
                  onChange={(e) => setVoiceGender(e.target.value as any)}
                  className="px-2 py-1 border border-slate-200 rounded-2xs bg-slate-50 text-[11px] text-slate-700"
                >
                  <option value="bac">Giọng Bắc</option>
                  <option value="nam">Giọng Nam</option>
                </select>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-2xs">
                  {[1, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-1.5 py-0.5 rounded-2xs text-[10px] font-bold ${
                        playbackSpeed === speed
                          ? "bg-[#991b1b] text-white"
                          : "text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Thanh tiến trình Audio giả lập */}
            {isPlayingAudio && (
              <div className="space-y-1">
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#991b1b] h-full transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Tiến trình đọc: {audioProgress}%</span>
                  <span>Tự động cuộn theo giọng đọc</span>
                </div>
              </div>
            )}

            {/* 2. Các công cụ tiện ích bạn đọc */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/80 text-xs text-slate-600">
              {/* Tùy chỉnh kích thước chữ */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500 font-gov">Cỡ chữ:</span>
                <button
                  onClick={() => setFontSize("sm")}
                  className={`px-2 py-0.5 border rounded-2xs font-bold text-[11px] ${
                    fontSize === "sm" ? "bg-[#991b1b] text-white border-[#991b1b]" : "bg-white text-slate-700"
                  }`}
                  title="Chữ nhỏ"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("base")}
                  className={`px-2 py-0.5 border rounded-2xs font-bold text-[11px] ${
                    fontSize === "base" ? "bg-[#991b1b] text-white border-[#991b1b]" : "bg-white text-slate-700"
                  }`}
                  title="Chữ chuẩn"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`px-2 py-0.5 border rounded-2xs font-bold text-[11px] ${
                    fontSize === "lg" ? "bg-[#991b1b] text-white border-[#991b1b]" : "bg-white text-slate-700"
                  }`}
                  title="Chữ lớn (dễ đọc cho người cao tuổi)"
                >
                  A+
                </button>
              </div>

              {/* Các nút tác vụ: In bài viết, Bookmark, Thích, Chia sẻ */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-xs text-[11px] font-medium text-slate-700 transition-colors cursor-pointer"
                  title="In bản in lưu trữ"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" /> In bài viết
                </button>

                <button
                  onClick={() => {
                    setLiked(!liked);
                    setLikesCount((c) => (liked ? c - 1 : c + 1));
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1 border rounded-xs text-[11px] font-medium transition-colors cursor-pointer ${
                    liked
                      ? "bg-red-50 text-[#991b1b] border-red-200"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" /> Hữu ích ({likesCount})
                </button>

                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center gap-1 px-2.5 py-1 border rounded-xs text-[11px] font-medium transition-colors cursor-pointer ${
                    bookmarked
                      ? "bg-amber-50 text-amber-800 border-amber-300"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" /> {bookmarked ? "Đã lưu" : "Lưu bài"}
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-300 rounded-xs text-[11px] font-medium text-slate-700 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Đã chép link</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#991b1b]" />
                      <span>Chia sẻ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ẢNH ĐẠI DIỆN BÀI VIẾT VÀ CHÚ THÍCH */}
          <div className="space-y-2">
            <div className="rounded-xs overflow-hidden shadow-xs border border-slate-200 bg-slate-100">
              <img
                src={article.image}
                alt={article.title}
                className="w-full object-cover max-h-[460px] mx-auto"
              />
            </div>
            <p className="text-xs text-center text-slate-500 italic font-serif">
              {article.imageCaption}
            </p>
          </div>

          {/* ĐOẠN SA-PÔ (LEAD PARAGRAPH) ĐẶC TRƯNG BÁO CHÍ */}
          <div className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed bg-amber-50/60 p-4 sm:p-5 rounded-xs border-l-4 border-[#991b1b] font-serif text-justify shadow-2xs">
            {article.excerpt}
          </div>

          {/* HỘP ĐIỂM TIN CHÍNH (KEY TAKEAWAYS) */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-slate-50 rounded-xs p-4 border border-slate-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#991b1b] uppercase tracking-wide font-gov">
                <Sparkles className="w-3.5 h-3.5" /> Điểm tin chính cần nắm rõ:
              </div>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-slate-700 font-serif">
                {article.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b] mt-1.5 shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* NỘI DUNG CHI TIẾT BÀI VIẾT (FAKE INFO DÀI DẶN, ĐẦY ĐỦ BỐ CỤC) */}
          <div className={`space-y-5 text-slate-800 font-serif text-justify ${textClass}`}>
            {article.blocks.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="text-base sm:text-lg font-bold text-slate-900 pt-3 pb-1 border-b border-slate-200 font-serif"
                  >
                    {block.title}
                  </h2>
                );
              }

              if (block.type === "quote") {
                return (
                  <div
                    key={index}
                    className="my-4 p-4 sm:p-5 bg-red-50/50 rounded-xs border-l-4 border-[#991b1b] space-y-2"
                  >
                    <Quote className="w-5 h-5 text-[#991b1b]/50" />
                    <p className="italic text-slate-800 font-serif leading-relaxed text-sm sm:text-[15px]">
                      "{block.text}"
                    </p>
                    <div className="pt-1 text-xs text-right font-gov">
                      <strong className="text-slate-900 block">{block.author}</strong>
                      <span className="text-slate-500 text-[11px]">{block.role}</span>
                    </div>
                  </div>
                );
              }

              if (block.type === "list" && block.items) {
                return (
                  <ul key={index} className="space-y-2 pl-4 list-disc text-slate-800 my-3">
                    {block.items.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === "callout") {
                return (
                  <div
                    key={index}
                    className="my-4 p-4 bg-emerald-50/60 border border-emerald-200 rounded-xs space-y-1.5 text-xs sm:text-sm"
                  >
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5 font-gov">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      {block.title}
                    </div>
                    <p className="text-emerald-950 font-serif leading-relaxed">{block.text}</p>
                  </div>
                );
              }

              return (
                <p key={index} className="leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* THẺ TAGS / TỪ KHÓA BÀI VIẾT */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 font-gov">
                <Tag className="w-3.5 h-3.5 text-slate-400" /> Từ khóa:
              </span>
              {article.tags.map((tag, idx) => (
                <Link
                  key={idx}
                  href={`/tin-tuc?q=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs text-[11px] font-medium font-gov transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* HỘP NGUỒN TIN ĐẦY ĐỦ THEO YÊU CẦU FILE WORD VÀ QUY ĐỊNH BÁO CHÍ */}
          <div className="pt-5 border-t border-slate-300 space-y-3 bg-slate-50 p-4 sm:p-5 rounded-xs border">
            <div className="space-y-1 text-xs text-slate-600 font-gov">
              <p>
                Nguồn: <strong className="text-slate-900">{article.source}</strong>
              </p>
              <p>
                Cơ quan chủ quản: <strong className="text-slate-900">Ban Thường trực Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam (VACHE)</strong>
              </p>
              <p className="text-[11px] text-slate-500">
                Xuất bản và phát hành theo Giấy phép thành lập Hội số 128/QĐ-BNV của Bộ Nội vụ và quy chế hoạt động thông tin truyền thông của Trung ương Hội. Bản quyền nội dung thuộc Cổng Thông tin điện tử VACHE.
              </p>

              {/* NÚT CHUYỂN HƯỚNG SANG TRANG BÁO CHÍ GỐC / WEB BÁO NHÀ NƯỚC */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs transition-colors shadow-2xs font-gov"
                  title="Mở bài viết trên trang báo chính thức"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Mở bài viết trên {article.sourceDomain} ↗
                </a>
                <a
                  href="https://suckhoecongdong.net.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-medium font-gov"
                >
                  Tạp chí Sức Khỏe Cộng Đồng ↗
                </a>
                <a
                  href="https://baochinhphu.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-medium font-gov"
                >
                  Cổng TTĐT Chính phủ ↗
                </a>
                <a
                  href="https://moh.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs text-xs font-medium font-gov"
                >
                  Cổng TTĐT Bộ Y tế ↗
                </a>
              </div>
            </div>

            {/* Các nút chia sẻ mạng xã hội */}
            <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 font-gov">Chia sẻ bài viết:</span>
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
                  }}
                  className="px-2.5 py-1 bg-[#1877f2] text-white rounded-xs text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  Facebook
                </button>
                <button
                  onClick={() => {
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://zalo.me/share?url=${url}`, "_blank");
                  }}
                  className="px-2.5 py-1 bg-[#0068ff] text-white rounded-xs text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  Zalo
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xs text-xs font-bold transition-colors"
                >
                  Sao chép liên kết
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-mono">
                {article.shares} lượt chia sẻ
              </span>
            </div>
          </div>

          {/* KHỐI Ý KIẾN BẠN ĐỌC & PHẢN HỒI (ĐỀ XUẤT MỚI CHUẨN CỔNG TTĐT) */}
          <section className="pt-6 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#991b1b]" />
                Ý KIẾN BẠN ĐỌC VÀ HỘI VIÊN ({comments.length})
              </h3>
              <span className="text-xs text-slate-500 font-gov">Tuân thủ quy chế ứng xử trực tuyến</span>
            </div>

            {/* Form gửi bình luận */}
            <form onSubmit={handleSendComment} className="bg-slate-50 p-4 rounded-xs border border-slate-200 space-y-3">
              {commentSuccess && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xs text-xs flex items-center gap-1.5 font-gov">
                  <Check className="w-4 h-4 text-emerald-600" /> Ý kiến của bạn đã được gửi thành công và đang chờ kiểm duyệt hiển thị!
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Họ và tên bạn đọc / Hội viên (*)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  required
                  className="p-2 bg-white border border-slate-300 rounded-xs text-xs font-gov focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
                />
                <input
                  type="email"
                  placeholder="Email liên hệ (được bảo mật)"
                  className="p-2 bg-white border border-slate-300 rounded-xs text-xs font-gov focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
                />
              </div>

              <textarea
                placeholder="Nội dung ý kiến đóng góp, phản hồi về bài viết..."
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                required
                className="w-full p-2 bg-white border border-slate-300 rounded-xs text-xs font-gov focus:outline-none focus:ring-1 focus:ring-[#991b1b]"
              ></textarea>

              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-slate-500 font-gov">Ý kiến sẽ được biên tập trước khi đăng.</span>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white font-bold rounded-xs text-xs flex items-center gap-1.5 transition-colors font-gov cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Gửi ý kiến
                </button>
              </div>
            </form>

            {/* Danh sách bình luận */}
            <div className="space-y-3 divide-y divide-slate-100">
              {comments.map((cm) => (
                <div key={cm.id} className="pt-3 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <strong className="text-slate-900 font-gov">{cm.author}</strong>
                      <span className="text-slate-400 text-[11px] ml-2">({cm.role})</span>
                    </div>
                    <span className="text-[10.5px] text-slate-400 font-mono">{cm.date}</span>
                  </div>
                  <p className="text-slate-700 font-serif leading-relaxed">{cm.content}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* TIN CÙNG CHUYÊN MỤC / BÀI VIẾT LIÊN QUAN */}
        <section className="bg-white rounded-xs border border-slate-300 shadow-xs p-4 sm:p-6 space-y-4">
          <div className="border-b border-slate-200 pb-2.5 flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif uppercase text-[#991b1b]">
              TIN TỨC CÙNG CHUYÊN MỤC & ĐỀ XUẤT
            </h3>
            <Link href="/tin-tuc" className="text-xs font-bold text-[#991b1b] hover:underline flex items-center gap-1 font-gov">
              Xem tất cả <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedNews.map((rel) => {
              const relViews = getArticleViews(rel);
              const relReadTime = getArticleReadTime(rel);
              return (
                <Link
                  key={rel.id}
                  href={`/tin-tuc/${rel.id}`}
                  className="group bg-slate-50 border border-slate-200 rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#991b1b] transition-all"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-slate-200 relative">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-[#991b1b] text-white text-[9.5px] font-bold rounded-2xs">
                        {rel.category}
                      </span>
                    </div>

                    <div className="p-3 space-y-1.5">
                      <div className="flex items-center justify-between text-[10.5px] text-slate-400 font-mono">
                        <span>{rel.date}</span>
                        <span>{relViews.toLocaleString("vi-VN")} đọc</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#991b1b] transition-colors line-clamp-2 leading-snug font-serif">
                        {rel.title}
                      </h4>
                    </div>
                  </div>

                  <div className="px-3 py-2 border-t border-slate-200/80 text-[11px] text-[#991b1b] font-bold flex items-center justify-between font-gov">
                    <span>Đọc tiếp</span>
                    <span className="text-[10px] text-slate-400 font-mono">{relReadTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
