function convertSecondsNanosToDate(seconds: number, nanos: number): Date {
  // Convert nanoseconds to milliseconds
  const milliseconds = seconds * 1000 + nanos / 1000000;
  // Create a new Date object
  return new Date(milliseconds);
}

export { convertSecondsNanosToDate };
