'use server';

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updatePromotionStatus(propertyId: string, status: 'active' | 'rejected') {
  const supabase = await createClient();
  
  // Verify admin again (security depth)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') throw new Error("Unauthorized");

  const updates: { promotion_status: 'active' | 'rejected'; featured: boolean } = {
    promotion_status: status,
    featured: status === 'active',
  };

  const { error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', propertyId);

  if (error) throw error;

  revalidatePath('/admin/destaques');
  revalidatePath('/admin');
  revalidatePath('/'); // Revalidate home page as featured items change
}
