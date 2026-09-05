import { createServerSupabaseClient } from './server';

export async function verifyAdminUser() {
  const supabase = await createServerSupabaseClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { isAdmin: false, user: null };
  }

  // Check app_metadata or user_metadata for role === 'admin'
  const appRole = user.app_metadata?.role;
  const userRole = user.user_metadata?.role;

  const isAdmin = appRole === 'admin' || userRole === 'admin';

  return { isAdmin, user };
}

export async function requireAdmin() {
  const { isAdmin, user } = await verifyAdminUser();
  if (!isAdmin || !user) {
    throw new Error('Unauthorized: Administrative credentials required.');
  }
  return user;
}
