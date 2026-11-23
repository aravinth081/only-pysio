/**
 * OnlyPhysio - Official Medical Slip & Bill Image Generator
 * Generates high-resolution PNG receipt cards for appointments & callbacks.
 */

export interface SlipData {
  type: "appointment" | "callback";
  refId: string;
  fullName: string;
  phone: string;
  age?: string;
  gender?: string;
  serviceMode?: string;
  condition?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
  address?: string;
  medicalHistory?: string;
  createdAt?: string;
}

export async function createSlipCanvas(data: SlipData): Promise<HTMLCanvasElement> {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");

  // High-resolution canvas for crisp display & printing
  canvas.width = 900;
  canvas.height = 1150;

  // Background - Crisp White
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Outer border - Soft Medical Emerald
  ctx.strokeStyle = "#10B981";
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

  // 1. Top Header Banner - Deep Forest Green (#0c2e1b)
  ctx.fillStyle = "#0c2e1b";
  ctx.fillRect(6, 6, canvas.width - 12, 170);

  // Accent Gold/Emerald stripe
  ctx.fillStyle = "#10B981";
  ctx.fillRect(6, 172, canvas.width - 12, 6);

  // Load & Draw Official OnlyPhysio Logo
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.src = "/images/logo.jpg";
    await new Promise((resolve) => {
      logoImg.onload = resolve;
      logoImg.onerror = resolve;
    });

    if (logoImg.complete && logoImg.naturalWidth > 0) {
      // Circular logo badge
      ctx.save();
      ctx.beginPath();
      ctx.arc(100, 90, 52, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(logoImg, 48, 38, 104, 104);
      ctx.restore();

      // Golden ring around logo
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(100, 90, 52, 0, Math.PI * 2);
      ctx.stroke();
    }
  } catch (e) {
    console.warn("Logo draw error:", e);
  }

  // Header Typography
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("ONLY PHYSIO CHENNAI", 175, 80);

  ctx.fillStyle = "#34D399";
  ctx.font = "bold 15px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("EXPERT HOMECARE PHYSIOTHERAPIST · HELPLINE +91 90427 18811", 175, 110);

  // 2. Document Title & Reference Banner
  const isBooking = data.type === "appointment";
  const docTitle = isBooking ? "OFFICIAL APPOINTMENT RECEIPT" : "CLINICAL CALLBACK REQUEST SLIP";

  ctx.fillStyle = "#F8FAFC";
  ctx.fillRect(20, 200, canvas.width - 40, 90);
  ctx.strokeStyle = "#E2E8F0";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, 200, canvas.width - 40, 90);

  // Document Title Left
  ctx.fillStyle = "#0F172A";
  ctx.font = "bold 20px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(docTitle, 45, 238);

  ctx.fillStyle = "#64748B";
  ctx.font = "13px 'Plus Jakarta Sans', Arial, sans-serif";
  const issueDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  ctx.fillText(`Issued: ${issueDate} · Chennai Clinical Centre`, 45, 265);

  // Reference ID Badge Right
  ctx.fillStyle = "#ECFDF5";
  ctx.fillRect(canvas.width - 270, 218, 225, 52);
  ctx.strokeStyle = "#059669";
  ctx.lineWidth = 2;
  ctx.strokeRect(canvas.width - 270, 218, 225, 52);

  ctx.fillStyle = "#047857";
  ctx.font = "bold 13px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("REFERENCE ID:", canvas.width - 255, 238);

  ctx.fillStyle = "#065F46";
  ctx.font = "bold 22px 'Plus Jakarta Sans', monospace";
  ctx.fillText(data.refId, canvas.width - 255, 262);

  // 3. Clinical Data Table (Rows with zebra striping)
  const rows: { label: string; value: string }[] = isBooking
    ? [
        { label: "Patient Full Name", value: data.fullName },
        { label: "Contact Phone", value: data.phone },
        { label: "Age & Gender", value: `${data.age ? data.age + " yrs" : "N/A"} · ${data.gender || "Patient"}` },
        { label: "Consultation Mode", value: data.serviceMode || "Home Visit (Chennai)" },
        { label: "Clinical Condition / Concern", value: data.condition || "Physiotherapy Assessment" },
        { label: "Scheduled Date & Time", value: `${data.preferredDate || "Upcoming"} (${data.preferredTimeSlot || "Flexible"})` },
        { label: "Chennai Address / Location", value: data.address || "Chennai" },
        ...(data.medicalHistory ? [{ label: "Medical History / Note", value: data.medicalHistory }] : []),
      ]
    : [
        { label: "Caller / Patient Name", value: data.fullName },
        { label: "Contact Phone", value: data.phone },
        { label: "Chennai Area / Locality", value: data.address || "Chennai" },
        { label: "Primary Health Concern", value: data.condition || "General Physio Inquiry" },
        { label: "Preferred Call Window", value: data.preferredTimeSlot || "Immediately" },
      ];

  let startY = 315;
  const rowHeight = 48;

  rows.forEach((row, i) => {
    // Zebra background
    if (i % 2 === 0) {
      ctx.fillStyle = "#F8FAFC";
      ctx.fillRect(20, startY, canvas.width - 40, rowHeight);
    }

    // Border line
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, startY + rowHeight);
    ctx.lineTo(canvas.width - 20, startY + rowHeight);
    ctx.stroke();

    // Field Label
    ctx.fillStyle = "#64748B";
    ctx.font = "bold 14px 'Plus Jakarta Sans', Arial, sans-serif";
    ctx.fillText(row.label.toUpperCase(), 45, startY + 30);

    // Field Value
    ctx.fillStyle = "#0F172A";
    ctx.font = "600 15px 'Plus Jakarta Sans', Arial, sans-serif";
    
    // Truncate if too long
    let val = row.value;
    if (val.length > 45) {
      val = val.substring(0, 42) + "...";
    }
    ctx.fillText(val, 340, startY + 30);

    startY += rowHeight;
  });

  // 4. Status Confirmation Banner
  startY += 25;
  ctx.fillStyle = "#F0FDF4";
  ctx.fillRect(20, startY, canvas.width - 40, 95);
  ctx.strokeStyle = "#86EFAC";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(20, startY, canvas.width - 40, 95);

  ctx.fillStyle = "#15803D";
  ctx.font = "bold 16px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("✔ STATUS: CONFIRMED & REGISTERED IN CLINICAL SYSTEM", 45, startY + 34);

  ctx.fillStyle = "#166534";
  ctx.font = "14px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText(
    "A senior physiotherapist coordinator from OnlyPhysio will connect directly with you to confirm.",
    45,
    startY + 62
  );
  ctx.fillText("Direct Coordinator Helpline: +91 90427 18811", 45, startY + 82);

  // 5. Official Stamp & Verified Seal (Bottom Right)
  const stampX = canvas.width - 220;
  const stampY = startY + 160;

  try {
    const sealImg = new Image();
    sealImg.crossOrigin = "anonymous";
    sealImg.src = "/images/official-seal.png";
    await new Promise((resolve) => {
      sealImg.onload = resolve;
      sealImg.onerror = resolve;
    });

    if (sealImg.complete && sealImg.naturalWidth > 0) {
      const sealSize = 136;
      ctx.drawImage(sealImg, stampX - sealSize / 2, stampY - sealSize / 2, sealSize, sealSize);
    } else {
      ctx.save();
      ctx.strokeStyle = "#059669";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(stampX, stampY, 52, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(stampX, stampY, 46, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = "#047857";
      ctx.font = "bold 11px 'Plus Jakarta Sans', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ONLYPHYSIO", stampX, stampY - 14);
      ctx.fillText("VERIFIED", stampX, stampY + 4);
      ctx.fillText("CHENNAI", stampX, stampY + 22);
      ctx.restore();
    }
  } catch (e) {
    console.warn("Seal draw error:", e);
  }

  // 6. Barcode & Bottom Strip
  const footerY = canvas.height - 75;
  ctx.fillStyle = "#0F172A";
  ctx.fillRect(20, footerY, canvas.width - 40, 2);

  // Simulated Barcode
  const barcodeX = 45;
  const barcodeY = footerY + 15;
  ctx.fillStyle = "#1E293B";
  for (let b = 0; b < 120; b += 4) {
    const barW = (b % 3 === 0) ? 2.5 : 1.5;
    ctx.fillRect(barcodeX + b * 2, barcodeY, barW, 28);
  }

  ctx.fillStyle = "#64748B";
  ctx.font = "11px 'Plus Jakarta Sans', monospace";
  ctx.fillText(`AUTH CODE: OP-SEC-${data.refId}-${Date.now().toString().slice(-6)}`, barcodeX, barcodeY + 42);

  ctx.fillStyle = "#047857";
  ctx.font = "bold 13px 'Plus Jakarta Sans', Arial, sans-serif";
  ctx.fillText("ONLYPHYSIO · RESTORING STRENGTH · RELIEVING PAIN", 380, barcodeY + 22);

  return canvas;
}

/**
 * Downloads the generated clinical slip directly as a PNG image file
 */
export async function downloadSlipAsImage(data: SlipData): Promise<void> {
  try {
    const canvas = await createSlipCanvas(data);
    const dataUrl = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `OnlyPhysio_${data.type === "appointment" ? "Receipt" : "Callback"}_${data.refId}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    console.error("Failed to download slip image:", e);
    alert("Could not download receipt image. Please try taking a screenshot or sharing.");
  }
}

/**
 * Generates image blob and shares to WhatsApp or downloads on desktop
 */
export async function shareSlipOnWhatsApp(data: SlipData, textMessage: string): Promise<void> {
  try {
    const canvas = await createSlipCanvas(data);

    canvas.toBlob(async (blob) => {
      if (!blob) {
        window.open(`https://wa.me/919042718811?text=${encodeURIComponent(textMessage)}`, "_blank");
        return;
      }

      const file = new File([blob], `OnlyPhysio_Receipt_${data.refId}.png`, { type: "image/png" });

      // If browser supports native Web Share API with files (Android, iOS Chrome/Safari)
      if (typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: `OnlyPhysio Receipt ${data.refId}`,
            text: textMessage,
            files: [file],
          });
          return;
        } catch (shareErr) {
          console.warn("Native share canceled or failed, falling back to download + WhatsApp URL:", shareErr);
        }
      }

      // Fallback: Download the receipt image and open WhatsApp
      downloadSlipAsImage(data);
      setTimeout(() => {
        window.open(`https://wa.me/919042718811?text=${encodeURIComponent(textMessage)}`, "_blank");
      }, 400);
    }, "image/png");
  } catch (e) {
    console.error("WhatsApp share slip error:", e);
    window.open(`https://wa.me/919042718811?text=${encodeURIComponent(textMessage)}`, "_blank");
  }
}
