import { NextResponse } from "next/server";
import { z } from "zod";

// Zod validation schema for appointment bookings
const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\s-]{10,16}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
  condition: z.string().min(1, "Please select a condition or concern"),
  preferredDate: z.string().min(1, "Please choose an appointment date"),
  preferredTime: z.string().min(1, "Please choose a time slot"),
  serviceType: z.enum(["home-visit", "clinic"]),
  address: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Generate unique clinical booking reference
    const bookingId = `OP-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    /* =========================================================================
     * INTEGRATION HOOKS (Ready for production activation)
     * =========================================================================
     * 1. EMAIL NOTIFICATION (e.g. Resend, Sendgrid, Nodemailer):
     *    await resend.emails.send({
     *      from: 'appointments@onlyphysio.com',
     *      to: validatedData.email,
     *      bcc: 'care@onlyphysio.com',
     *      subject: `Appointment Confirmed: ${bookingId} - OnlyPhysio`,
     *      react: AppointmentEmail({ bookingId, ...validatedData }),
     *    });
     *
     * 2. WHATSAPP CONFIRMATION (e.g. Twilio, Interakt, AISensy):
     *    await sendWhatsAppTemplate({
     *      to: validatedData.phone,
     *      templateName: 'booking_confirmed',
     *      parameters: [validatedData.fullName, bookingId, validatedData.preferredDate],
     *    });
     *
     * 3. GOOGLE SHEETS / CRM CRM (e.g. Google Sheets API, Zoho CRM):
     *    await appendToGoogleSheet('Bookings', [
     *      bookingId,
     *      new Date().toISOString(),
     *      validatedData.fullName,
     *      validatedData.phone,
     *      validatedData.email,
     *      validatedData.condition,
     *      validatedData.serviceType,
     *      validatedData.preferredDate,
     *      validatedData.preferredTime,
     *      validatedData.notes || '',
     *    ]);
     * ========================================================================= */

    console.log(`[OnlyPhysio Booking Received] Ref: ${bookingId}`, validatedData);

    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: "Your appointment request has been scheduled successfully.",
        data: validatedData,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed. Please verify the submitted details.",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("[Booking API Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal error occurred. Please contact our helpline directly.",
      },
      { status: 500 }
    );
  }
}
