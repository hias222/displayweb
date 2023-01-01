export default function stringToBoolean(string) {
  if (string === undefined) {
    return false;
  } else {
    switch (string.toLowerCase().trim()) {
      case "true":
      case "yes":
      case "1":
        return true;
      case "false":
      case "no":
      case "0":
      case undefined:
      case null:
        return false;
      default:
        return Boolean(string);
    }
  }
}
