import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-3xl font-bold text-red-500">Payment Cancelled</h1>
      <p className="text-gray-600">You can try again anytime.</p>
      <Link href="/tutors" className="btn btn-primary">
        Back to Tutors
      </Link>
    </div>
  );
}