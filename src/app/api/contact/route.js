import { NextResponse } from "next/server";
import { BRAND } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      brand: BRAND.name,
      tagline: BRAND.tagline,
      phones: BRAND.phones,
      instagram: BRAND.instagram,
      email: BRAND.email,
      showroom: BRAND.showroom,
      whatsapp: {
        primary: `https://wa.me/${BRAND.whatsapp.primaryNumber}`,
        secondary: `https://wa.me/${BRAND.whatsapp.secondaryNumber}`,
      },
    },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, role, date, materials, notes, materialId, squareFeet } = body;

    // Basic server validation
    if (!name && !phone) {
      return NextResponse.json(
        { success: false, error: "Name or phone number is required." },
        { status: 400 }
      );
    }

    const inquiryRecord = {
      id: `INQ-${Date.now()}`,
      receivedAt: new Date().toISOString(),
      name: name || "Anonymous Client",
      phone: phone || "Not Provided",
      role: role || "Homeowner",
      date: date || "Flexible",
      materials: Array.isArray(materials) ? materials : materialId ? [materialId] : [],
      notes: notes || "",
      squareFeet: squareFeet || null,
      assignedLines: [
        { name: "Direct Concierge", phone: "+91 94792 72520", wa: "https://wa.me/919479272520" },
        { name: "Showroom Desk", phone: "+91 98938 39456", wa: "https://wa.me/919893839456" },
      ],
      instagram: "https://www.instagram.com/ashirwad_stone/",
    };

    // In a production backend, this would persist to a database or trigger an SMS/WhatsApp webhook
    console.log("[Ashirwaad Stone Backend] New Inquiry Received:", inquiryRecord);

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully received by Ashirwaad Stone concierge.",
        inquiry: inquiryRecord,
        contact: {
          primaryPhone: "+91 94792 72520",
          secondaryPhone: "+91 98938 39456",
          instagram: "https://www.instagram.com/ashirwad_stone/",
          whatsappUrl: `https://wa.me/919479272520?text=${encodeURIComponent(
            `Inquiry ${inquiryRecord.id} from ${inquiryRecord.name}`
          )}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Ashirwaad Stone Backend] Contact POST error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing consultation request." },
      { status: 500 }
    );
  }
}
