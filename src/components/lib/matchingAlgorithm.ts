import { supabase } from "../../App";

export type Match = {
  user_id: string;
  name: string;
  username: string;
  avatar_url: string;
  sharedCourses: string[];
  sharedInterests: string[];
  score: number;
};

export async function getMatchesForUser(currentUserId: string): Promise<Match[]> {
  const { data: userCourses, error: courseError } = await supabase
    .from("user_courses")
    .select("course_code")
    .eq("user_id", currentUserId);

  const { data: userInterests, error: interestError } = await supabase
    .from("user_interests")
    .select("interests")
    .eq("user_id", currentUserId);

  if (courseError || interestError || !userCourses || !userInterests) {
    console.error("Error fetching current user's data:", courseError, interestError);
    return [];
  }

  const courseCodes = userCourses.map((uc) => uc.course_code);
  const interests = userInterests.map((ui) => ui.interests);

  console.log(courseCodes);
  console.log(interests);

  const { data: allProfiles, error: profileError } = await supabase
    .from("profiles")
    .select("user_id, name, username, avatar_url");

  if (profileError || !allProfiles) {
    console.error("Error fetching profiles:", profileError);
    return [];
  }

  const otherUsers = allProfiles.filter((p) => p.user_id !== currentUserId);

  const matches: Match[] = [];

  for (const user of otherUsers) {
    const [ucRes, uiRes] = await Promise.all([
      supabase
        .from("user_courses")
        .select("course_code")
        .eq("user_id", user.user_id),
      supabase
        .from("user_interests")
        .select("interests")
        .eq("user_id", user.user_id),
    ]);

    if (!ucRes.data || !uiRes.data) continue;

    const theirCourses = ucRes.data.map((uc) => uc.course_code);
    const theirInterests = uiRes.data.map((ui) => ui.interests);

    const sharedCourses = theirCourses.filter((c) => courseCodes.includes(c));
    const sharedInterests = theirInterests.filter((i) => interests.includes(i));

    const score = sharedCourses.length + sharedInterests.length;

    if (score > 0) {
      matches.push({
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        avatar_url: user.avatar_url,
        sharedCourses,
        sharedInterests,
        score,
      });
    }
  }

  matches.sort((a, b) => b.score - a.score);

  return matches;
}
