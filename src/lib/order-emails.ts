import nodemailer from "nodemailer";
import type Stripe from "stripe";
import { CONTACT_EMAIL, formatPrice } from "@/lib/products";

function getTransporter() {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS must be configured");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user, pass },
  });
}

function getShippingDetails(session: Stripe.Checkout.Session) {
  return session.collected_information?.shipping_details ?? null;
}

function formatAddress(
  address: Stripe.Address | null | undefined,
  name?: string | null,
): string {
  if (!address) return "Not provided";

  const lines = [
    name,
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code].filter(Boolean).join(" "),
    address.country,
  ].filter(Boolean);

  return lines.join("\n");
}

function getLineItems(session: Stripe.Checkout.Session): string {
  const items = session.line_items?.data ?? [];

  if (!items.length) return "No items listed";

  return items
    .map((item) => {
      const name = item.description || "Item";
      const qty = item.quantity ?? 1;
      const total = formatPrice(item.amount_total ?? 0);
      return `• ${name} × ${qty} — ${total}`;
    })
    .join("\n");
}

function buildCustomerEmail(session: Stripe.Checkout.Session) {
  const orderRef = session.id.slice(-8).toUpperCase();
  const items = getLineItems(session);
  const total = formatPrice(session.amount_total ?? 0);
  const shippingDetails = getShippingDetails(session);
  const shipping = formatAddress(
    shippingDetails?.address,
    shippingDetails?.name ?? session.customer_details?.name,
  );

  const subject = `Your Staunch order confirmation (${orderRef})`;
  const text = `Thanks for your order.

Order reference: ${orderRef}

${items}

Total: ${total}

Shipping to:
${shipping}

We'll dispatch your order within 2–3 working days.

Staunch. Wear the ox. Wear it hard.

Questions? Reply to this email or contact us at ${CONTACT_EMAIL}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h1 style="font-size: 20px; text-transform: uppercase; letter-spacing: 0.08em;">Order confirmed</h1>
      <p>Thanks for your order.</p>
      <p><strong>Order reference:</strong> ${orderRef}</p>
      <pre style="font-family: inherit; white-space: pre-wrap; margin: 16px 0;">${items}</pre>
      <p><strong>Total:</strong> ${total}</p>
      <p><strong>Shipping to:</strong><br>${shipping.replace(/\n/g, "<br>")}</p>
      <p>We'll dispatch your order within 2–3 working days.</p>
      <p style="margin-top: 24px;"><strong>Staunch. Wear the ox. Wear it hard.</strong></p>
      <p style="color: #666; font-size: 14px;">Questions? Contact us at ${CONTACT_EMAIL}</p>
    </div>
  `;

  return { subject, text, html };
}

function buildBusinessEmail(session: Stripe.Checkout.Session) {
  const orderRef = session.id.slice(-8).toUpperCase();
  const customerName = session.customer_details?.name ?? "Not provided";
  const customerEmail = session.customer_details?.email ?? "Not provided";
  const customerPhone = session.customer_details?.phone ?? "Not provided";
  const items = getLineItems(session);
  const total = formatPrice(session.amount_total ?? 0);
  const shippingDetails = getShippingDetails(session);
  const shipping = formatAddress(
    shippingDetails?.address,
    shippingDetails?.name ?? session.customer_details?.name,
  );

  const subject = `New Staunch order ${orderRef}`;
  const text = `New order received.

Order reference: ${orderRef}
Stripe session: ${session.id}

Customer
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}

Ship to
${shipping}

Items
${items}

Total paid: ${total}`;

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
      <h1 style="font-size: 20px;">New Staunch order</h1>
      <p><strong>Order reference:</strong> ${orderRef}</p>
      <p><strong>Stripe session:</strong> ${session.id}</p>
      <h2 style="font-size: 16px; margin-top: 24px;">Customer</h2>
      <p><strong>Name:</strong> ${customerName}<br>
      <strong>Email:</strong> ${customerEmail}<br>
      <strong>Phone:</strong> ${customerPhone}</p>
      <h2 style="font-size: 16px; margin-top: 24px;">Ship to</h2>
      <p>${shipping.replace(/\n/g, "<br>")}</p>
      <h2 style="font-size: 16px; margin-top: 24px;">Items</h2>
      <pre style="font-family: inherit; white-space: pre-wrap;">${items}</pre>
      <p><strong>Total paid:</strong> ${total}</p>
    </div>
  `;

  return { subject, text, html };
}

export async function sendOrderEmails(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_details?.email;

  if (!customerEmail) {
    throw new Error("Checkout session is missing customer email");
  }

  const from = process.env.SMTP_FROM?.trim() || CONTACT_EMAIL;
  const businessEmail = process.env.BUSINESS_EMAIL?.trim() || CONTACT_EMAIL;
  const transporter = getTransporter();

  const customerMail = buildCustomerEmail(session);
  const businessMail = buildBusinessEmail(session);

  await transporter.sendMail({
    from: `Staunch <${from}>`,
    to: customerEmail,
    replyTo: CONTACT_EMAIL,
    subject: customerMail.subject,
    text: customerMail.text,
    html: customerMail.html,
  });

  await transporter.sendMail({
    from: `Staunch Orders <${from}>`,
    to: businessEmail,
    replyTo: customerEmail,
    subject: businessMail.subject,
    text: businessMail.text,
    html: businessMail.html,
  });
}
