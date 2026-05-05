import { supabase } from '@/integrations/supabase/client';

export const restoreCredits = async (
  userId: string,
  carId: string,
  creditsToRestore: number
): Promise<void> => {
  if (!creditsToRestore || creditsToRestore <= 0) return;

  const { data: vps, error } = await supabase
    .from('validated_participations')
    .select('id, credits_remaining, credits_used_this_year')
    .eq('user_id', userId)
    .eq('car_id', carId)
    .order('credits_remaining', { ascending: true })
    .limit(1);

  if (error || !vps || vps.length === 0) {
    console.error('restoreCredits: no VP found', error);
    return;
  }

  const vp = vps[0];

  await supabase
    .from('validated_participations')
    .update({
      credits_remaining: Number(vp.credits_remaining || 0) + creditsToRestore,
      credits_used_this_year: Math.max(
        0,
        Number(vp.credits_used_this_year || 0) - creditsToRestore
      ),
    })
    .eq('id', vp.id);
};
