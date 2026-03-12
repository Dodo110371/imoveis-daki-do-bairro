'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function registerAgency(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Você precisa estar logado para cadastrar uma imobiliária.' };
  }

  const name = formData.get('name') as string;
  const creci = formData.get('creci') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const address = formData.get('address') as string;
  const description = formData.get('description') as string;
  const rawPlan = (formData.get('plan') as string) || '';
  const plan =
    rawPlan === 'plan-5'
      ? 'bronze'
      : rawPlan === 'plan-10'
        ? 'silver'
        : rawPlan === 'plan-15' || rawPlan === 'plan-20'
          ? 'gold'
          : rawPlan;

  if (!['free', 'bronze', 'silver', 'gold'].includes(plan)) {
    return { error: 'Plano inválido. Selecione um plano novamente.' };
  }

  // Insert into agencies table
  // Note: This assumes the table has 'owner_id' and 'status' columns.
  // If not, the user will need to run the migration script.
  const { error } = await supabase
    .from('agencies')
    .insert({
      name,
      creci,
      email,
      phone,
      address,
      description,
      plan,
      owner_id: user.id,
      status: 'pending' // Moderation required
    });

  if (error) {
    console.error('Error registering agency:', error);
    return { error: error.message || 'Erro ao cadastrar imobiliária. Tente novamente.' };
  }

  // Optionally, update user role to 'agency_owner' if needed, but 'user' is fine for now.

  revalidatePath('/imobiliarias');
  return { success: true };
}
