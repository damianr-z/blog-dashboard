export async function getCurrentUser(clerkUser) {
  if (!clerkUser) return null;
  return clerkUser;
}

export async function updateCurrentUser({
  clerkUser,
  firstName,
  lastName,
  avatar,
}) {
  if (!clerkUser) {
    throw new Error('No user logged in');
  }

  try {
    // Update Clerk user profile (firstName, lastName)
    const updates = {};

    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;

    if (Object.keys(updates).length > 0) {
      await clerkUser.update(updates);
    }

    // Update avatar if provided (File object)
    if (avatar) {
      await clerkUser.setProfileImage({ file: avatar });
    }

    // Reload user data to get latest updates
    await clerkUser.reload();

    return clerkUser;
  } catch (error) {
    throw new Error(error.message || 'Failed to update user');
  }
}

export async function updateAuthorInSupabase(supabaseClient, clerkUser) {
  const fullName = `${clerkUser.firstName || ''} ${
    clerkUser.lastName || ''
  }`.trim();

  const { data, error } = await supabaseClient
    .from('author')
    .update({
      name: fullName,
      email: clerkUser.primaryEmailAddress?.emailAddress,
    })
    .eq('user_id', clerkUser.id)
    .select()
    .single();

  if (error) {
    console.error('Error updateing author in Supabase', error);
    throw new Error(error.message);
  }

  return data;
}
