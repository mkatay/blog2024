export const elapsedTime = (serverTimestamp) => {
   // Konvertáljuk a Firestore időbélyeget egy Date objektummá
  const serverTime = new Date(serverTimestamp.seconds * 1000 + serverTimestamp.nanoseconds / 1000000);
  const elapsedMilliseconds = Date.now() - serverTime.getTime();

  const timeFrames = [
    { limit: 1000, label: "másodperce", divisor: 1000 },
    { limit: 60 * 1000, label: "perce", divisor: 60 * 1000 },
    { limit: 60 * 60 * 1000, label: "órája", divisor: 60 * 60 * 1000 },
    { limit: 24 * 60 * 60 * 1000, label: "napja", divisor: 24 * 60 * 60 * 1000 },
    { limit: 7 * 24 * 60 * 60 * 1000, label: "hete", divisor: 7 * 24 * 60 * 60 * 1000 }
  ];

  for (const { limit, label, divisor } of timeFrames) {
    if (elapsedMilliseconds < limit) {
      return `${Math.floor(elapsedMilliseconds / divisor)} ${label}`;
    }
  }
//Ha az eltelt idő meghaladja az összes definiált időkeret (maximálisan 7 nap, azaz egy hét), akkor a fennmaradó időt hetekben adja vissza
  return `${Math.floor(elapsedMilliseconds / (7 * 24 * 60 * 60 * 1000))} hete`;
};

