import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY ?? "";

interface UnitInput {
  code: string;
  name: string;
  unitType: string;
  province?: string;
  contactEmail?: string;
  annualFee?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const units: UnitInput[] = body.units ?? [];

    if (!Array.isArray(units) || units.length === 0) {
      return NextResponse.json(
        { success: false, message: "Không có đơn vị nào để import" },
        { status: 400 }
      );
    }

    if (!ADMIN_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Server chưa cấu hình ADMIN_API_KEY" },
        { status: 500 }
      );
    }

    const results: Array<{
      code: string;
      name: string;
      success: boolean;
      error?: string;
    }> = [];

    for (const u of units) {
      try {
        const res = await fetch(
          API_URL + "/finance/admin/units/" + u.code.toUpperCase(),
          {
            method: "PUT",
            headers: {
              "x-api-key": ADMIN_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: u.name,
              unitType: u.unitType,
              province: u.province,
              contactEmail: u.contactEmail || undefined,
              annualFee: u.annualFee ?? 0,
              active: true,
            }),
          }
        );

        if (res.ok) {
          results.push({ code: u.code, name: u.name, success: true });
        } else {
          const err = await res.text();
          results.push({
            code: u.code,
            name: u.name,
            success: false,
            error: "HTTP " + res.status + ": " + err.slice(0, 100),
          });
        }
      } catch (e: any) {
        results.push({
          code: u.code,
          name: u.name,
          success: false,
          error: e.message ?? "Lỗi không xác định",
        });
      }
    }

    const okCount = results.filter((r) => r.success).length;
    const failCount = results.length - okCount;

    let obligations: any = null;
    if (okCount > 0) {
      try {
        const year = new Date().getFullYear();
        const genRes = await fetch(
          API_URL + "/finance/admin/obligations/generate",
          {
            method: "POST",
            headers: {
              "x-api-key": ADMIN_API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ year }),
          }
        );
        obligations = await genRes.json();
      } catch {
        /* noop */
      }
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      ok: okCount,
      fail: failCount,
      results,
      obligations,
    });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message ?? "Lỗi xử lý" },
      { status: 500 }
    );
  }
}