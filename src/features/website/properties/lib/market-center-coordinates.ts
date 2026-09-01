// La API de Market Centers (src/shared/lib/market-centers-api.ts) no expone
// latitud/longitud, solo dirección en texto. Para poder calcular "cuál Market
// Center está más cerca de mi ubicación" sin geocodificar en cada carga de
// página (Nominatim no permite geocodificar en bulk en cada visita — ver
// src/shared/lib/geocoding-api.ts), esta tabla se generó una sola vez
// geocodificando la dirección de cada Market Center con ese mismo servicio.
//
// Clave = MarketCenter.ID (el identificador que ya se usa como key/URL en
// MarketCenterCard.tsx). Si se da de alta un Market Center nuevo y su ID no
// aparece aquí, simplemente no participa en el cálculo de cercanía — el
// listado sigue funcionando normal, solo no se reordena por él.
export const MARKET_CENTER_COORDINATES: Record<number, { lat: number; lng: number }> = {
  1: { lat: 20.5922997, lng: -100.3917424 }, // KW Central Qro
  2: { lat: 20.9142238, lng: -100.7437840 }, // KW Allende
  3: { lat: 20.6407176, lng: -105.2203060 }, // KW Bahia
  4: { lat: 24.1619948, lng: -110.3158532 }, // KW Baja
  5: { lat: 31.6907979, lng: -106.4253215 }, // KW Campestre
  6: { lat: 28.6368669, lng: -106.0767450 }, // KW Cantera
  7: { lat: 32.6245314, lng: -115.4526040 }, // KW Centinela
  8: { lat: 19.3701838, lng: -99.3581568 }, // KW City
  9: { lat: 20.9670759, lng: -89.6237402 }, // KW Ciudad Blanca
  10: { lat: 23.2035785, lng: -106.4208391 }, // KW El Faro
  11: { lat: 19.2758411, lng: -99.6036884 }, // KW Enlace
  12: { lat: 20.7211203, lng: -103.3913671 }, // KW Grand
  13: { lat: 21.1493016, lng: -101.6908264 }, // KW Leon Norte
  14: { lat: 19.3780899, lng: -99.1562465 }, // KW Mas
  15: { lat: 25.5750610, lng: -103.4101585 }, // KW Milenio
  16: { lat: 19.7484873, lng: -101.2214568 }, // KW Monarca
  17: { lat: 19.4788356, lng: -99.2327986 }, // KW Pani-Barragán
  18: { lat: 25.4230425, lng: -100.9927509 }, // KW Paramo
  19: { lat: 19.2880603, lng: -99.1669733 }, // KW Pedregal
  20: { lat: 22.1516472, lng: -100.9763993 }, // KW Potosí
  21: { lat: 19.3718796, lng: -99.1577010 }, // KW PREMIER
  22: { lat: 19.0519385, lng: -98.2976151 }, // KW Prestige
  23: { lat: 16.7538010, lng: -93.1159590 }, // KW REAL
  24: { lat: 25.6802019, lng: -100.3152580 }, // KW Regio
  25: { lat: 25.7558021, lng: -100.2896480 }, // KW Regio Norte
  26: { lat: 21.1527467, lng: -86.8425761 }, // KW Riviera Maya
  27: { lat: 32.5317397, lng: -117.0195290 }, // KW Rio
}
