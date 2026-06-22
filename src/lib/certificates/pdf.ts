import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { formatNaira } from "@/lib/utils";
import { SPONSORSHIP_TIERS, type SponsorshipTier } from "@/lib/constants";

export type CertificateData = {
  sponsorName: string;
  pledgeId: string;
  tier: SponsorshipTier;
  amountKobo: number;
  bedLabel?: string;
  blockName?: string;
  issuedAt: Date;
};

export async function buildCertificatePdf(data: CertificateData): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);

  const tierLabel = SPONSORSHIP_TIERS[data.tier].label;
  const emerald = rgb(0.02, 0.45, 0.34);

  page.drawRectangle({ x: 40, y: 40, width: 515, height: 762, borderColor: emerald, borderWidth: 2 });
  page.drawText("OnCampus · Sponsor a Bed", { x: 60, y: 760, size: 14, font: fontBold, color: emerald });
  page.drawText("Certificate of Sponsorship", { x: 60, y: 720, size: 28, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
  page.drawText("Federal University of Technology, Akure", { x: 60, y: 695, size: 12, font, color: rgb(0.4, 0.4, 0.4) });

  page.drawText("This certifies that", { x: 60, y: 640, size: 12, font });
  page.drawText(data.sponsorName, { x: 60, y: 615, size: 22, font: fontBold, color: emerald });
  page.drawText(`has sponsored through the OnCampus initiative at FUTA.`, { x: 60, y: 585, size: 12, font });

  const lines = [
    `Pledge reference: ${data.pledgeId}`,
    `Sponsorship tier: ${tierLabel}`,
    `Amount: ${formatNaira(data.amountKobo)}`,
  ];
  if (data.bedLabel && data.blockName) {
    lines.push(`Bed: ${data.blockName} · Bed ${data.bedLabel}`);
  }
  lines.push(`Issued: ${data.issuedAt.toLocaleDateString("en-NG", { dateStyle: "long" })}`);

  let y = 540;
  for (const line of lines) {
    page.drawText(line, { x: 60, y, size: 11, font });
    y -= 22;
  }

  page.drawText("Thank you for giving a student a safe place to call home.", {
    x: 60,
    y: 120,
    size: 11,
    font,
    color: rgb(0.3, 0.3, 0.3),
  });

  return doc.save();
}
