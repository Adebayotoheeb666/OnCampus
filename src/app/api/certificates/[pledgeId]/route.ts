import { NextResponse } from "next/server";
import { getCertificatePdfBytes } from "@/modules/sponsor/certificate";

type Params = Promise<{ pledgeId: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { pledgeId } = await params;
  const pdfBytes = await getCertificatePdfBytes(pledgeId);

  if (!pdfBytes) {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
  }

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="oncampus-certificate-${pledgeId}.pdf"`,
    },
  });
}
