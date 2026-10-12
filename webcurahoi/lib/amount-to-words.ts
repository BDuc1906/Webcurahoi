/**
 * Đọc số nguyên thành chữ tiếng Việt — thuật toán tổng quát.
 * Hỗ trợ số từ 0 đến hàng nghìn tỷ, KHÔNG dùng preset cố định.
 *
 * Quy tắc áp dụng (chuẩn văn bản hành chính VN):
 *  - "mốt" thay "một" khi đơn vị = 1 và chục ≥ 2   (21 → "hai mươi mốt")
 *  - "lăm" thay "năm" khi đơn vị = 5 và chục ≥ 1   (15 → "mười lăm")
 *  - "tư"  thay "bốn" khi đơn vị = 4 và chục ≥ 2   (24 → "hai mươi tư")
 *  - "linh" chèn khi hàng chục = 0 mà hàng đơn vị > 0
 *  - "không trăm" chèn khi block có trăm = 0 nhưng có chục/đơn vị
 *    và đã có block cao hơn được đọc  (1.005 → "một nghìn không trăm linh năm")
 */

const DIGITS = [
  "không", // 0
  "một",   // 1
  "hai",   // 2
  "ba",    // 3
  "bốn",   // 4
  "năm",   // 5
  "sáu",   // 6
  "bảy",   // 7
  "tám",   // 8
  "chín",  // 9
];

// Đơn vị scale cho từng block 3 chữ số
const SCALES = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

/**
 * Đọc 1 block 3 chữ số (0 – 999).
 * @param n              số cần đọc, 0 ≤ n ≤ 999
 * @param hasHigherBlock có block cao hơn đã được đọc trước đó hay chưa
 */
function readThreeDigits(n: number, hasHigherBlock: boolean): string {
  const hundred = Math.floor(n / 100);
  const ten = Math.floor((n % 100) / 10);
  const unit = n % 10;

  const parts: string[] = [];

  // --- Hàng trăm ---
  if (hundred > 0) {
    parts.push(`${DIGITS[hundred]} trăm`);
  } else if (hasHigherBlock && (ten > 0 || unit > 0)) {
    // VD: 1.005 → block "005" cần đọc "không trăm linh năm"
    parts.push("không trăm");
  }

  // --- Hàng chục ---
  if (ten > 1) {
    parts.push(`${DIGITS[ten]} mươi`);
  } else if (ten === 1) {
    parts.push("mười");
  } else if (ten === 0 && unit > 0 && (hundred > 0 || hasHigherBlock)) {
    // VD: 105 → "một trăm linh năm"; 1.005 → "… không trăm linh năm"
    parts.push("linh");
  }

  // --- Hàng đơn vị ---
  if (unit > 0) {
    if (unit === 1 && ten > 1) {
      parts.push("mốt");          // 21, 31, … → "… mươi mốt"
    } else if (unit === 5 && ten > 0) {
      parts.push("lăm");          // 15, 25, … → "… mươi lăm"
    } else if (unit === 4 && ten > 1) {
      parts.push("tư");           // 24, 34, … → "… mươi tư"
    } else {
      parts.push(DIGITS[unit]);
    }
  }

  return parts.join(" ");
}

/**
 * Đọc số nguyên thành chữ.
 * @param num     số nguyên bất kỳ (âm hoặc dương)
 * @param options.currencySuffix có gắn "đồng chẵn" ở cuối hay không (mặc định: false)
 *
 * @example
 *   readNumber(1234567)
 *   // "một triệu hai trăm ba mươi tư nghìn năm trăm sáu mươi bảy"
 *
 *   readNumber(500000, { currencySuffix: true })
 *   // "năm trăm nghìn đồng chẵn"
 */
export function readNumber(
  num: number,
  options: { currencySuffix?: boolean } = {}
): string {
  const { currencySuffix = false } = options;

  if (!Number.isFinite(num)) return "";
  if (num === 0) {
    return currencySuffix ? "không đồng" : "không";
  }

  const isNegative = num < 0;
  let n = Math.abs(Math.floor(num));

  // --- Chia thành các block 3 chữ số, từ phải sang trái ---
  const blocks: number[] = [];
  while (n > 0) {
    blocks.push(n % 1000);
    n = Math.floor(n / 1000);
  }

  // --- Duyệt từ block cao nhất xuống thấp ---
  const parts: string[] = [];
  let hasReadHigher = false;

  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    if (block === 0) continue;

    parts.push(readThreeDigits(block, hasReadHigher));

    const scale = SCALES[i];
    if (scale) parts.push(scale);

    hasReadHigher = true;
  }

  let result = parts.join(" ").replace(/\s+/g, " ").trim();

  if (isNegative) result = "âm " + result;

  if (currencySuffix) {
    result = result + " đồng";
    // Nếu số tròn (không có "linh", "mươi", "mốt", "lăm", "tư") → thêm "chẵn"
    if (!/(mươi|mốt|lăm|tư|linh)\s*đồng$/.test(result)) {
      result = result.replace(/\sđồng$/, " đồng chẵn");
    }
  }

  return result;
}

/**
 * Wrapper dùng cho biên lai — viết hoa chữ cái đầu.
 * @example amountToVietnameseWords(123456)
 *   → "Một trăm hai mươi ba nghìn bốn trăm năm mươi sáu đồng chẵn"
 */
export function amountToVietnameseWords(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) return "Không đồng";
  const s = readNumber(amount, { currencySuffix: true });
  return s.charAt(0).toUpperCase() + s.slice(1);
}