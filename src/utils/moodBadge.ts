export function moodVariant(
  mood: string
) {

  switch (mood) {

    case "HAPPY":
      return "success";

    case "PRODUCTIVE":
      return "info";

    case "STRESSED":
      return "danger";

    case "TIRED":
      return "warning";

    default:
      return "info";
  }
}