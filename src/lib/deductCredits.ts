import { supabase } from '@/integrations/supabase/client';

export const deductCredits = async (
  userId: string,
  carId: string,
  creditsToDeduct: number
): Promise<{ success: boolean; error?: string }> => {
  if (!creditsToDeduct || creditsToDeduct <= 0) return { success: true };

  const { data: vps, error } = await supabase
    .from('validated_participations')
    .select('id, credits_remaining, credits_used_this_year')
    .eq('user_id', userId)
    .eq('car_id', carId)
    .order('participation_number', { ascending: true })
    .limit(1);

  if (error || !vps || vps.length === 0) {
    return { success: false, error: 'No se encontró participación validada' };
  }

  const vp = vps[0];

  if (Number(vp.credits_remaining || 0) < creditsToDeduct) {
    return {
      success: false,
      error: `Créditos insuficientes. Tienes ${vp.credits_remaining} créditos disponibles y necesitas ${creditsToDeduct}.`,
    };
  }

  const { error: updateError } = await supabase
    .from('validated_participations')
    .update({
      credits_remaining: Number(vp.credits_remaining || 0) - creditsToDeduct,
      credits_used_this_year: Number(vp.credits_used_this_year || 0) + creditsToDeduct,
    })
    .eq('id', vp.id);

  if (updateError) return { success: false, error: updateError.message };
  return { success: true };
};
