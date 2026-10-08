import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tutorId, tutorName, price, tutorEmail } = body;

    if (!tutorId || !price) {
      return NextResponse.json(
        { error: "Missing tutorId or price" },
        { status: 400 }
      );
    }

    // price cents e hobe (100 = $1.00)
    const amountInCents = Math.round(Number(price) * 100);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // ba "bdt" jodi support kore
            product_data: {
              name: `Tutor Session - ${tutorName || "MediQueue"}`,
              description: `Booking with ${tutorName}`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/payment-cancel`,
      metadata: {
        tutorId: String(tutorId),
        userId: session.user.id,
        userEmail: session.user.email,
        tutorName: tutorName || "",
        tutorEmail: tutorEmail || "",
      },
      customer_email: session.user.email,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}