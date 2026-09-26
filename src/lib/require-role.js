import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * EasyBuy-style role guard (JavaScript version)
 * Checks session via Better Auth + role
 * Redirects to /login or /unauthorized
 */
export async function requireRole(requiredRole) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // role field Better Auth user object e thakte hobe
  const role = session.user.role || "student";

  if (role !== requiredRole) {
    console.warn(
      `Access Denied. Required: ${requiredRole}, Found: ${role} (user: ${session.user.email})`
    );
    redirect("/unauthorized");
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role,
  };
}