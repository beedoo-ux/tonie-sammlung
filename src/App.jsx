import { useState, useMemo } from "react";

// ============================================================
// ALLE BEKANNTEN DEUTSCHEN TONIES (~400 Figuren)
// ============================================================
const ALLE_TONIES = [
  // ---- RARITÄTEN / VERGRIFFEN ----
  { id: "r001", name: "Grüffelo", serie: "Raritäten", kat: "Hörspiel", wert: 100, status: "vergriffen", seltenheit: "legendary" },
  { id: "r002", name: "Grüffelokind", serie: "Raritäten", kat: "Hörspiel", wert: 150, status: "vergriffen", seltenheit: "legendary" },
  { id: "r003", name: "Stockmann (deutsch)", serie: "Raritäten", kat: "Hörspiel", wert: 110, status: "vergriffen", seltenheit: "legendary" },
  { id: "r004", name: "Räuber Ratte", serie: "Raritäten", kat: "Hörspiel", wert: 80, status: "vergriffen", seltenheit: "legendary" },
  { id: "r005", name: "Zogg (oranger Drache)", serie: "Raritäten", kat: "Hörspiel", wert: 90, status: "vergriffen", seltenheit: "legendary" },
  { id: "r006", name: "Für Hund und Katz ist auch noch Platz", serie: "Raritäten", kat: "Hörspiel", wert: 65, status: "vergriffen", seltenheit: "epic" },
  { id: "r007", name: "Das kleine Wir", serie: "Raritäten", kat: "Hörspiel", wert: 120, status: "vergriffen", seltenheit: "legendary" },
  { id: "r008", name: "Kreativ-Tonie mit E (Erstauflage)", serie: "Raritäten", kat: "Kreativ", wert: 200, status: "vergriffen", seltenheit: "legendary" },
  { id: "r009", name: "Drei ??? Kids – Radio Rocky Beach (Peter Shaw)", serie: "Drei ???", kat: "Hörspiel", wert: 249, status: "vergriffen", seltenheit: "legendary" },
  { id: "r010", name: "Billie Regenbogentiger", serie: "Raritäten", kat: "Hörspiel", wert: 60, status: "vergriffen", seltenheit: "epic" },
  { id: "r011", name: "Dr. Brumm steckt fest / geht baden", serie: "Raritäten", kat: "Hörspiel", wert: 45, status: "vergriffen", seltenheit: "epic" },
  { id: "r012", name: "Gute Nacht Gorilla", serie: "Raritäten", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "r013", name: "Heidi – Ein Wolf im Dörfli", serie: "Raritäten", kat: "Hörspiel", wert: 50, status: "vergriffen", seltenheit: "epic" },
  { id: "r014", name: "Heidi – Freunde für immer", serie: "Raritäten", kat: "Hörspiel", wert: 50, status: "vergriffen", seltenheit: "epic" },
  { id: "r015", name: "Fünf Freunde – Großalarm in Kirrin", serie: "Raritäten", kat: "Hörspiel", wert: 69, status: "vergriffen", seltenheit: "epic" },
  { id: "r016", name: "Lufthansa Kreativ-Tonie (nur Meilen)", serie: "Raritäten", kat: "Kreativ", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "r017", name: "Kinderlieder-Zug", serie: "Raritäten", kat: "Musik", wert: 35, status: "vergriffen", seltenheit: "rare" },
  { id: "r018", name: "Benjamin Blümchen Erstauflage", serie: "Benjamin Blümchen", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "r019", name: "Der kleine Prinz", serie: "Raritäten", kat: "Hörbuch", wert: 35, status: "vergriffen", seltenheit: "rare" },
  { id: "r020", name: "Bibi Blocksberg Erstauflage", serie: "Bibi Blocksberg", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "r021", name: "Kleiner Eisbär Lars (alt)", serie: "Raritäten", kat: "Hörspiel", wert: 35, status: "vergriffen", seltenheit: "rare" },
  { id: "r022", name: "Räuber Hotzenplotz – Neues vom Räuber (alt)", serie: "Räuber Hotzenplotz", kat: "Hörspiel", wert: 50, status: "vergriffen", seltenheit: "epic" },
  { id: "r023", name: "Miffy", serie: "Raritäten", kat: "Hörspiel", wert: 55, status: "vergriffen", seltenheit: "epic" },
  { id: "r024", name: "Minimusiker 1+2", serie: "Raritäten", kat: "Musik", wert: 55, status: "vergriffen", seltenheit: "epic" },
  { id: "r025", name: "Kater Mog", serie: "Raritäten", kat: "Hörspiel", wert: 55, status: "vergriffen", seltenheit: "epic" },
  { id: "r026", name: "Glücksfüchse", serie: "Raritäten", kat: "Hörspiel", wert: 55, status: "vergriffen", seltenheit: "epic" },
  { id: "r027", name: "Nightmare before Christmas", serie: "Disney", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "r028", name: "Elmar Elefant", serie: "Raritäten", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "r029", name: "Flöckchen Adventskalender", serie: "Raritäten", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "r030", name: "St. Pauli Rabauken – Entscheidung am Millerntor", serie: "Raritäten", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "r031", name: "Bissig! Bitte nicht öffnen", serie: "Raritäten", kat: "Hörspiel", wert: 35, status: "vergriffen", seltenheit: "rare" },
  { id: "r032", name: "Haferhorde 3er Set", serie: "Haferhorde", kat: "Hörspiel", wert: 80, status: "vergriffen", seltenheit: "epic" },
  { id: "r033", name: "Wieso Weshalb Warum 3er Set", serie: "Wieso Weshalb Warum", kat: "Lerninhalt", wert: 80, status: "vergriffen", seltenheit: "epic" },
  { id: "r034", name: "Schlummerbande Oktopus Set (4er)", serie: "Schlummerbande", kat: "Musik", wert: 75, status: "vergriffen", seltenheit: "epic" },
  { id: "r035", name: "Käptn Blaubär", serie: "Raritäten", kat: "Hörspiel", wert: 65, status: "vergriffen", seltenheit: "epic" },

  // ---- STEIFF ----
  { id: "s001", name: "Steiff – Jimmy Bär", serie: "Steiff", kat: "Steiff", wert: 90, status: "vergriffen", seltenheit: "legendary" },
  { id: "s002", name: "Steiff – Unica Einhorn", serie: "Steiff", kat: "Steiff", wert: 120, status: "vergriffen", seltenheit: "legendary" },
  { id: "s003", name: "Steiff – Dinkie Esel", serie: "Steiff", kat: "Steiff", wert: 80, status: "vergriffen", seltenheit: "legendary" },
  { id: "s004", name: "Steiff – Hoppie Hase", serie: "Steiff", kat: "Steiff", wert: 80, status: "vergriffen", seltenheit: "legendary" },
  { id: "s005", name: "Steiff – Lita Lamm", serie: "Steiff", kat: "Steiff", wert: 80, status: "vergriffen", seltenheit: "legendary" },
  { id: "s006", name: "Steiff – Bodo Schimpanse", serie: "Steiff", kat: "Steiff", wert: 70, status: "vergriffen", seltenheit: "legendary" },

  // ---- BENJAMIN BLÜMCHEN ----
  { id: "b001", name: "Benjamin Blümchen – Zoogeburtstag", serie: "Benjamin Blümchen", kat: "Hörspiel", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "b002", name: "Benjamin Blümchen – Ein Töröö für alle Fälle", serie: "Benjamin Blümchen", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "b003", name: "Benjamin Blümchen – Bauarbeiter", serie: "Benjamin Blümchen", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "b004", name: "Benjamin Blümchen – Plüsch", serie: "Benjamin Blümchen", kat: "Hörspiel", wert: 35, status: "vergriffen", seltenheit: "rare" },

  // ---- BIBI BLOCKSBERG ----
  { id: "bb001", name: "Bibi Blocksberg – Hexen gibt es doch", serie: "Bibi Blocksberg", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "bb002", name: "Bibi Blocksberg – Hexenball", serie: "Bibi Blocksberg", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "bb003", name: "Bibi Blocksberg – Plüsch", serie: "Bibi Blocksberg", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "bb004", name: "Bibi und Tina (5 Stück)", serie: "Bibi & Tina", kat: "Hörspiel", wert: 95, status: "vergriffen", seltenheit: "epic" },

  // ---- DREI FRAGEZEICHEN ----
  { id: "df001", name: "Die drei ??? Kids – Komplettset (3 Detektive)", serie: "Drei ???", kat: "Hörspiel", wert: 170, status: "vergriffen", seltenheit: "legendary" },
  { id: "df002", name: "Die drei !!! – Blond", serie: "Drei ???", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "df003", name: "Die drei ??? Kids – Invasion der Fliegen", serie: "Drei ???", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "rare" },

  // ---- DISNEY ----
  { id: "d001", name: "Disney – Stitch", serie: "Disney", kat: "Disney", wert: 20, status: "verfügbar", seltenheit: "rare" },
  { id: "d002", name: "Disney – Arielle", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d003", name: "Disney – Belle (Schöne und das Biest)", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d004", name: "Disney – Elsa (Frozen)", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d005", name: "Disney – Anna (Frozen)", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d006", name: "Disney – Olaf", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d007", name: "Disney – Dumbo", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d008", name: "Disney – Simba (König der Löwen)", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d009", name: "Disney – Dornröschen ohne Kopf", serie: "Disney", kat: "Disney", wert: 8, status: "vergriffen", seltenheit: "rare" },
  { id: "d010", name: "Disney – Dschungelbuch", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d011", name: "Disney – Winnie Puuh", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d012", name: "Disney – Shrek", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d013", name: "Disney – Küss den Frosch", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d014", name: "Disney – Mickey Maus", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d015", name: "Disney – Mickey Maus Fantasia", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d016", name: "Disney – Lady Bug", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d017", name: "Disney – Wish", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d018", name: "Disney – Cap und Capper", serie: "Disney", kat: "Disney", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "d019", name: "Disney – Zoomania", serie: "Disney", kat: "Disney", wert: 16, status: "vergriffen", seltenheit: "rare" },
  { id: "d020", name: "Disney – Kindischer Ozean", serie: "Disney", kat: "Disney", wert: 20, status: "vergriffen", seltenheit: "rare" },

  // ---- PAW PATROL ----
  { id: "pp001", name: "Paw Patrol – Chase", serie: "Paw Patrol", kat: "Hörspiel", wert: 16, status: "verfügbar", seltenheit: "common" },
  { id: "pp002", name: "Paw Patrol – Marshall", serie: "Paw Patrol", kat: "Hörspiel", wert: 16, status: "verfügbar", seltenheit: "common" },
  { id: "pp003", name: "Paw Patrol – Skye", serie: "Paw Patrol", kat: "Hörspiel", wert: 16, status: "verfügbar", seltenheit: "common" },
  { id: "pp004", name: "Paw Patrol – Rocky", serie: "Paw Patrol", kat: "Hörspiel", wert: 16, status: "verfügbar", seltenheit: "common" },
  { id: "pp005", name: "Paw Patrol – Rubble", serie: "Paw Patrol", kat: "Hörspiel", wert: 16, status: "verfügbar", seltenheit: "common" },

  // ---- CONNI ----
  { id: "c001", name: "Conni – kommt in den Kindergarten", serie: "Conni", kat: "Hörspiel", wert: 30, status: "verfügbar", seltenheit: "common" },
  { id: "c002", name: "Conni – auf dem Bauernhof (Neuauflage 2023)", serie: "Conni", kat: "Hörspiel", wert: 15, status: "vergriffen", seltenheit: "rare" },

  // ---- PEPPA WUTZ ----
  { id: "pw001", name: "Peppa Wutz – Schorsch", serie: "Peppa Wutz", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "pw002", name: "Peppa Pig – Das Schulfest", serie: "Peppa Wutz", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },

  // ---- RÄUBER HOTZENPLOTZ ----
  { id: "rh001", name: "Räuber Hotzenplotz – weiß", serie: "Räuber Hotzenplotz", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "rh002", name: "Räuber Hotzenplotz – Das Hörspiel", serie: "Räuber Hotzenplotz", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "rh003", name: "Räuber Hotzenplotz – Mondrakete", serie: "Räuber Hotzenplotz", kat: "Hörspiel", wert: 53, status: "vergriffen", seltenheit: "epic" },

  // ---- SCHLUMMERBANDE ----
  { id: "sl001", name: "Schlummerbande – Hase", serie: "Schlummerbande", kat: "Musik", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "sl002", name: "Schlummerbande – Schlafkatze blau", serie: "Schlummerbande", kat: "Musik", wert: 12, status: "verfügbar", seltenheit: "common" },
  { id: "sl003", name: "Schlummerbande – Schlafkatze rot", serie: "Schlummerbande", kat: "Musik", wert: 12, status: "verfügbar", seltenheit: "common" },

  // ---- FEUERWEHRMANN SAM ----
  { id: "fs001", name: "Feuerwehrmann Sam", serie: "Feuerwehrmann Sam", kat: "Hörspiel", wert: 12, status: "verfügbar", seltenheit: "common" },

  // ---- PETTERSSON & FINDUS ----
  { id: "pf001", name: "Pettersson & Findus – Ausgepackt", serie: "Pettersson & Findus", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "pf002", name: "Findus und der Hahn im Korb", serie: "Pettersson & Findus", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },

  // ---- MÄRCHEN ----
  { id: "m001", name: "Märchen – Rotkäppchen", serie: "Märchen", kat: "Märchen", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "m002", name: "Märchen – Pinocchio", serie: "Märchen", kat: "Märchen", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "m003", name: "Märchen – Hänsel und Gretel", serie: "Märchen", kat: "Märchen", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "m004", name: "Märchen – Sterntaler", serie: "Märchen", kat: "Märchen", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "m005", name: "Märchen – Robinson Crusoe", serie: "Märchen", kat: "Märchen", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "m006", name: "Lieblings-Klassiker – Rotkäppchen Englisch", serie: "Märchen", kat: "Märchen", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "m007", name: "Lieblings-Klassiker – Alice im Wunderland", serie: "Märchen", kat: "Märchen", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "m008", name: "Lieblings-Klassiker – Robinson Crusoe", serie: "Märchen", kat: "Märchen", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "m009", name: "Lieblings-Klassiker – Zauberer von Oz", serie: "Märchen", kat: "Märchen", wert: 27, status: "vergriffen", seltenheit: "rare" },

  // ---- PRINZESSIN LILLIFEE ----
  { id: "pl001", name: "Prinzessin Lillifee", serie: "Prinzessin Lillifee", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "pl002", name: "Prinzessin Lillifee – Mond", serie: "Prinzessin Lillifee", kat: "Hörspiel", wert: 30, status: "verfügbar", seltenheit: "common" },
  { id: "pl003", name: "Prinzessin Lillifee – Mond (OVP)", serie: "Prinzessin Lillifee", kat: "Hörspiel", wert: 35, status: "vergriffen", seltenheit: "rare" },

  // ---- YAKARI ----
  { id: "y001", name: "Yakari – Junge", serie: "Yakari", kat: "Hörspiel", wert: 14, status: "verfügbar", seltenheit: "common" },
  { id: "y002", name: "Yakari – kleiner Donner", serie: "Yakari", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },

  // ---- PUMUCKL ----
  { id: "pu001", name: "Pumuckl", serie: "Pumuckl", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "epic" },

  // ---- ASTERIX ----
  { id: "as001", name: "Asterix", serie: "Asterix", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "rare" },

  // ---- BIENE MAJA ----
  { id: "bm001", name: "Biene Maja – Hörspiel", serie: "Biene Maja", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },

  // ---- SANDMÄNNCHEN ----
  { id: "sa001", name: "Sandmännchen", serie: "Sandmännchen", kat: "Musik", wert: 50, status: "vergriffen", seltenheit: "epic" },

  // ---- PLAYMOBIL ----
  { id: "plm001", name: "Playmobil – Ritter", serie: "Playmobil", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "epic" },
  { id: "plm002", name: "Playmobil – Feuerwehr", serie: "Playmobil", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "epic" },
  { id: "plm003", name: "Playmobil – Pirat", serie: "Playmobil", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "epic" },
  { id: "plm004", name: "Playmobil – Prinzessin", serie: "Playmobil", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "epic" },

  // ---- JANOSCH ----
  { id: "j001", name: "Janosch 4er Set", serie: "Janosch", kat: "Hörspiel", wert: 120, status: "vergriffen", seltenheit: "epic" },
  { id: "j002", name: "Janosch – Schnuppi Schnuppi Schnurr", serie: "Janosch", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },

  // ---- OLCHIS ----
  { id: "ol001", name: "Olchis Set (5 Stück)", serie: "Olchis", kat: "Hörspiel", wert: 180, status: "vergriffen", seltenheit: "epic" },

  // ---- HANNI & NANNI ----
  { id: "hn001", name: "Hanni + Nanni – Hanni", serie: "Hanni & Nanni", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "hn002", name: "Hanni + Nanni – Nanni", serie: "Hanni & Nanni", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },

  // ---- LERNINHALT / CLEVER ----
  { id: "l001", name: "Was ist Was – Dino", serie: "Was ist Was", kat: "Lerninhalt", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "l002", name: "Was ist Was – Pferd", serie: "Was ist Was", kat: "Lerninhalt", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "l003", name: "Was ist Was – Pinguin", serie: "Was ist Was", kat: "Lerninhalt", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "l004", name: "Wieso Weshalb Warum – Bauernhof", serie: "Wieso Weshalb Warum", kat: "Lerninhalt", wert: 15, status: "vergriffen", seltenheit: "rare" },
  { id: "l005", name: "Gregs Tagebuch", serie: "Gregs Tagebuch", kat: "Hörbuch", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "l006", name: "Griechische Sagen", serie: "Lerninhalt", kat: "Hörbuch", wert: 35, status: "verfügbar", seltenheit: "common" },
  { id: "l007", name: "Rico Oscar und die Tieferschatten", serie: "Lerninhalt", kat: "Hörbuch", wert: 17, status: "vergriffen", seltenheit: "rare" },

  // ---- MUSIK ----
  { id: "mu001", name: "Giraffenaffen – Partylieder", serie: "Giraffenaffen", kat: "Musik", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "mu002", name: "Lalalino – orange", serie: "Lalalino", kat: "Musik", wert: 13, status: "verfügbar", seltenheit: "common" },
  { id: "mu003", name: "Rotz n Roll", serie: "Musik", kat: "Musik", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "mu004", name: "Schlümpfe – Schlumpfine", serie: "Schlümpfe", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "mu005", name: "Schüttel den Baum", serie: "Musik", kat: "Musik", wert: 13, status: "vergriffen", seltenheit: "rare" },
  { id: "mu006", name: "Kinderlieder – Dalmatiner mit rotem Ball", serie: "Kinderlieder", kat: "Musik", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "mu007", name: "Kinderlieder – Hund mit rotem Ball", serie: "Kinderlieder", kat: "Musik", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "mu008", name: "Kinderlieder – Englische", serie: "Kinderlieder", kat: "Musik", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "mu009", name: "Kinderlieder – Kindergartenlieder", serie: "Kinderlieder", kat: "Musik", wert: 17, status: "vergriffen", seltenheit: "common" },
  { id: "mu010", name: "Kinderlieder – Eichhörnchen Geburtstagslieder", serie: "Kinderlieder", kat: "Musik", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "mu011", name: "Kinderlieder – Waschbär Europäische KiLi", serie: "Kinderlieder", kat: "Musik", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "mu012", name: "Kinderlieder – Schwein mit Trommel Tierlieder", serie: "Kinderlieder", kat: "Musik", wert: 17, status: "vergriffen", seltenheit: "common" },
  { id: "mu013", name: "Karnevalslieder", serie: "Musik", kat: "Musik", wert: 17, status: "vergriffen", seltenheit: "common" },
  { id: "mu014", name: "Sendung mit der Maus – Gitarre", serie: "Sendung mit der Maus", kat: "Musik", wert: 15, status: "vergriffen", seltenheit: "rare" },
  { id: "mu015", name: "Sendung mit dem Elefant", serie: "Sendung mit der Maus", kat: "Musik", wert: 20, status: "vergriffen", seltenheit: "rare" },

  // ---- BOOK TONIES ----
  { id: "bk001", name: "Book Tonie – ADAC Meine erste Verkehrsschule", serie: "Book Tonies", kat: "Book Tonie", wert: 10, status: "vergriffen", seltenheit: "common" },
  { id: "bk002", name: "Book Tonie – Drache Kokosnuss", serie: "Book Tonies", kat: "Book Tonie", wert: 9, status: "vergriffen", seltenheit: "common" },
  { id: "bk003", name: "Book Tonie – Eine Weihnachtsgeschichte", serie: "Book Tonies", kat: "Book Tonie", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "bk004", name: "Book Tonie – Leo und die Abenteuermaschine", serie: "Book Tonies", kat: "Book Tonie", wert: 10, status: "vergriffen", seltenheit: "common" },
  { id: "bk005", name: "Book Tonie – Rolf Zuckowski", serie: "Book Tonies", kat: "Book Tonie", wert: 10, status: "vergriffen", seltenheit: "common" },
  { id: "bk006", name: "Book Tonie – Der Weihnachtosaurus", serie: "Book Tonies", kat: "Book Tonie", wert: 15, status: "vergriffen", seltenheit: "rare" },
  { id: "bk007", name: "Book Tonie – Lichterkinder", serie: "Book Tonies", kat: "Book Tonie", wert: 23, status: "verfügbar", seltenheit: "common" },

  // ---- WEITERE KLASSIKER ----
  { id: "k001", name: "Reh mit rotem Schal", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k002", name: "Snörfried", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k003", name: "Sven van Thom", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k004", name: "Teufelskicker", serie: "Klassiker", kat: "Hörspiel", wert: 22, status: "verfügbar", seltenheit: "common" },
  { id: "k005", name: "Jim Knopf", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "k006", name: "Urmel aus dem Eis", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k007", name: "Hui Buh Dach", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k008", name: "Heule Eule", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "vergriffen", seltenheit: "rare" },
  { id: "k009", name: "Monika Häuschen", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k010", name: "Kasperle", serie: "Klassiker", kat: "Hörspiel", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "k011", name: "100% Wolf", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k012", name: "Mira und das fliegende Haus", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k013", name: "Safiras", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "k014", name: "Lotta kann Rad fahren", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k015", name: "Lotta Leben", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "k016", name: "Glubschis", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k017", name: "Der kleine König", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k018", name: "Der kleine König (OVP)", serie: "Klassiker", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "k019", name: "Der kleine Nick", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k020", name: "Der kleine Wassermann", serie: "Klassiker", kat: "Hörspiel", wert: 50, status: "vergriffen", seltenheit: "epic" },
  { id: "k021", name: "Der magische Blumenladen", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k022", name: "Der Löwe der nicht lesen konnte", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "vergriffen", seltenheit: "common" },
  { id: "k023", name: "Die kleine Hexe", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k024", name: "Die kleine neugierige Hexe", serie: "Klassiker", kat: "Hörspiel", wert: 180, status: "vergriffen", seltenheit: "legendary" },
  { id: "k025", name: "Das magische Baumhaus", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k026", name: "Das Klo", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k027", name: "Tabaluga im Ei", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k028", name: "Tilda Apfelkern", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "verfügbar", seltenheit: "common" },
  { id: "k029", name: "Traumzauberbaum", serie: "Klassiker", kat: "Musik", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "k030", name: "Trolls Poppy", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "k031", name: "Sternenmann", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k032", name: "Sternenschweif", serie: "Klassiker", kat: "Hörspiel", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "k033", name: "Faultier Fantasiereisen", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "vergriffen", seltenheit: "common" },
  { id: "k034", name: "Mia and Me", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k035", name: "Mia and Me Pferd", serie: "Klassiker", kat: "Hörspiel", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "k036", name: "Mrs. Rachel", serie: "Klassiker", kat: "Musik", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "k037", name: "My Little Pony", serie: "Klassiker", kat: "Hörspiel", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "k038", name: "Ohrenbär", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k039", name: "Doggyland Englisch", serie: "Klassiker", kat: "Musik", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k040", name: "Ella geht zur Schule", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "common" },
  { id: "k041", name: "Elefant Afrika", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k042", name: "Rund um die Welt mit Fuchs und Schaf", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k043", name: "Französisch Fuchs mit grünem Pulli", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k044", name: "Fünf Freunde Timmy", serie: "Fünf Freunde", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "common" },
  { id: "k045", name: "Glücksfee kleines Hörbuch", serie: "Klassiker", kat: "Hörbuch", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k046", name: "Gorilla Club", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "vergriffen", seltenheit: "common" },
  { id: "k047", name: "Halloween- und Spuklieder", serie: "Musik", kat: "Musik", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k048", name: "Kniereiter", serie: "Musik", kat: "Musik", wert: 13, status: "vergriffen", seltenheit: "common" },
  { id: "k049", name: "Kid Nation", serie: "Klassiker", kat: "Hörspiel", wert: 32, status: "vergriffen", seltenheit: "rare" },
  { id: "k050", name: "Karmas Welt", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "vergriffen", seltenheit: "common" },
  { id: "k051", name: "Unter meinem Bett 1", serie: "Klassiker", kat: "Hörspiel", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "k052", name: "Unter meinem Bett 5", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k053", name: "Unter meinem Bett 6", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k054", name: "Wickey Set", serie: "Klassiker", kat: "Hörspiel", wert: 80, status: "vergriffen", seltenheit: "epic" },
  { id: "k055", name: "Woozle Goozle", serie: "Klassiker", kat: "Hörspiel", wert: 17, status: "vergriffen", seltenheit: "common" },
  { id: "k056", name: "Küken Pitti", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "k057", name: "Noel Rentier", serie: "Klassiker", kat: "Hörspiel", wert: 140, status: "vergriffen", seltenheit: "legendary" },
  { id: "k058", name: "Petzi Bär", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k059", name: "Pirate Bälle", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k060", name: "Liliane Susewind", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "k061", name: "Secret Science Club", serie: "Klassiker", kat: "Lerninhalt", wert: 20, status: "vergriffen", seltenheit: "rare" },
  { id: "k062", name: "Playmo Ball im Prinzessinnenschloss", serie: "Klassiker", kat: "Hörspiel", wert: 30, status: "vergriffen", seltenheit: "rare" },
  { id: "k063", name: "Playmo der Schatz der Teufelsinsel", serie: "Klassiker", kat: "Hörspiel", wert: 25, status: "vergriffen", seltenheit: "rare" },
  { id: "k064", name: "Pittiplatsch", serie: "Klassiker", kat: "Hörspiel", wert: 40, status: "vergriffen", seltenheit: "rare" },
  { id: "k065", name: "Lebkuchenmann Französisch", serie: "Klassiker", kat: "Hörspiel", wert: 35, status: "vergriffen", seltenheit: "rare" },
  { id: "k066", name: "Käptn Sharky Set", serie: "Klassiker", kat: "Hörspiel", wert: 50, status: "vergriffen", seltenheit: "epic" },
  { id: "k067", name: "Dora (neu ausgepackt)", serie: "Klassiker", kat: "Hörspiel", wert: 17, status: "vergriffen", seltenheit: "common" },
  { id: "k068", name: "Pippi Langstrumpf 2", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "k069", name: "Kalle Blomquist", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "k070", name: "Gabby's Dollhouse", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "k071", name: "Susi und Strolch", serie: "Disney", kat: "Disney", wert: 15, status: "verfügbar", seltenheit: "common" },

  // ---- KREATIV-TONIES ----
  { id: "kt001", name: "Kreativ-Tonie – Blanko weiß", serie: "Kreativ", kat: "Kreativ", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "kt002", name: "Kreativ-Tonie – Baby rosa", serie: "Kreativ", kat: "Kreativ", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "kt003", name: "Kreativ-Tonie – Einhorn", serie: "Kreativ", kat: "Kreativ", wert: 12, status: "verfügbar", seltenheit: "common" },
  { id: "kt004", name: "Kreativ-Tonie – Meerjungfrau", serie: "Kreativ", kat: "Kreativ", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "kt005", name: "Kreativ-Tonie – Sängerin", serie: "Kreativ", kat: "Kreativ", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "kt006", name: "Kreativ-Tonie – Rotes Herz", serie: "Kreativ", kat: "Kreativ", wert: 20, status: "verfügbar", seltenheit: "common" },
  { id: "kt007", name: "Kreativ-Tonie – Geburtstag (limitiert)", serie: "Kreativ", kat: "Kreativ", wert: 35, status: "vergriffen", seltenheit: "rare" },

  // ---- NEUHEITEN 2026 ----
  { id: "n001", name: "Pokémon – Pikachu (Sommer 2026)", serie: "Pokémon", kat: "Hörspiel", wert: 15, status: "bald", seltenheit: "rare" },
  { id: "n002", name: "Pokémon – Glumanda (Sommer 2026)", serie: "Pokémon", kat: "Hörspiel", wert: 15, status: "bald", seltenheit: "rare" },
  { id: "n003", name: "Pokémon – Schiggy (Sommer 2026)", serie: "Pokémon", kat: "Hörspiel", wert: 15, status: "bald", seltenheit: "rare" },
  { id: "n004", name: "Pokémon – Bisasam (Sommer 2026)", serie: "Pokémon", kat: "Hörspiel", wert: 15, status: "bald", seltenheit: "rare" },
  { id: "n005", name: "Bibi Blocksberg – Ausgehext (April 2026)", serie: "Bibi Blocksberg", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "n006", name: "Pippi Langstrumpf – geht an Bord (Dez 2025)", serie: "Klassiker", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "n007", name: "JJ (aus Cocomelon)", serie: "Klassiker", kat: "Musik", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "n008", name: "Peter und der Wolf", serie: "Klassiker", kat: "Musik", wert: 15, status: "verfügbar", seltenheit: "common" },
  { id: "n009", name: "Nachtlicht Tonie", serie: "Besondere Tonies", kat: "Besondere", wert: 25, status: "verfügbar", seltenheit: "common" },
  { id: "n010", name: "Schlümpfe – Das Schulfest (April 2026)", serie: "Schlümpfe", kat: "Hörspiel", wert: 15, status: "verfügbar", seltenheit: "common" },
];

// Was Patrick in Sammlung 2 hat
const VORHANDEN_IDS = new Set([
  "s001","s002","s003","s004","s005","s006",
  "r001","r004","r009","r010","r011","r023","r024","r025","r026","r032","r033","r034","r035",
  "plm001","plm002","plm003","plm004",
  "j001","ol001","pu001","sa001","r057",
  "d001","d002","d003","d004","d005","d006","d007","d008","d011","d019",
  "pp001","pp002","pp003","pp004","pp005",
  "as001","bm001","bb001","bb002","bb004",
  "b001","b002","b003",
  "hn001","hn002",
  "rh001","rh002",
  "pf001","pf002",
  "pl001","pl002","pl003",
  "y001","y002",
  "l001","l002","l003","l005","l006","l007",
  "m001","m002","m003","m004","m005",
  "k001","k002","k003","k005","k007","k008","k011","k016","k017","k023","k024","k025","k026",
  "k028","k030","k031","k033","k034","k035","k036","k037","k039","k040","k041","k044",
  "k046","k049","k051","k054","k055","k057","k060","k061","k062","k064","k065","k066","k067",
  "kt001","kt002","kt003","kt004","kt005","kt006",
  "bk001","bk002","bk004","bk005","bk007",
  "mu001","mu002","mu006","mu007","mu009","mu010","mu012","mu013","mu014","mu015",
  "df001","df002","df003",
  "c001","pw001",
  "fs001",
  "k058","k068","k070","k071",
  "sl001","sl002","sl003",
  "n005","n006","n007",
]);

const SEL = {
  legendary: { label: "Legendär ⭐", color: "#FFD700", bg: "rgba(255,215,0,0.12)", border: "rgba(255,215,0,0.35)", glow: "0 0 12px rgba(255,215,0,0.3)" },
  epic: { label: "Episch 💜", color: "#C77DFF", bg: "rgba(199,125,255,0.1)", border: "rgba(199,125,255,0.3)", glow: "0 0 10px rgba(199,125,255,0.2)" },
  rare: { label: "Selten 🔵", color: "#4FC3F7", bg: "rgba(79,195,247,0.08)", border: "rgba(79,195,247,0.25)", glow: "none" },
  common: { label: "Standard", color: "#7986a8", bg: "rgba(121,134,168,0.06)", border: "rgba(121,134,168,0.15)", glow: "none" },
};

const STATUS_COLORS = {
  verfügbar: { color: "#4CAF50", label: "✅ Verfügbar" },
  vergriffen: { color: "#FF7043", label: "🔴 Vergriffen" },
  bald: { color: "#FFB300", label: "🟡 Bald" },
};

const ALLE_KATEGORIEN = ["Alle", "Hörspiel", "Musik", "Märchen", "Disney", "Steiff", "Lerninhalt", "Hörbuch", "Kreativ", "Book Tonie", "Besondere"];
const ALLE_SERIEN = ["Alle", ...new Set(ALLE_TONIES.map(t => t.serie))].sort();

export default function TonieMasterDashboard() {
  const [tab, setTab] = useState("fehlen");
  const [search, setSearch] = useState("");
  const [filterKat, setFilterKat] = useState("Alle");
  const [filterSel, setFilterSel] = useState("Alle");
  const [filterStatus, setFilterStatus] = useState("Alle");
  const [filterSerie, setFilterSerie] = useState("Alle");
  const [vorhanden, setVorhanden] = useState(new Set(VORHANDEN_IDS));

  const fehlende = useMemo(() =>
    ALLE_TONIES.filter(t => !vorhanden.has(t.id)), [vorhanden]);

  const vorhandene = useMemo(() =>
    ALLE_TONIES.filter(t => vorhanden.has(t.id)), [vorhanden]);

  const filtered = (liste) => liste.filter(t => {
    const s = search.toLowerCase();
    const searchOk = !s || t.name.toLowerCase().includes(s) || t.serie.toLowerCase().includes(s);
    const katOk = filterKat === "Alle" || t.kat === filterKat;
    const selOk = filterSel === "Alle" || t.seltenheit === filterSel;
    const statOk = filterStatus === "Alle" || t.status === filterStatus;
    const serieOk = filterSerie === "Alle" || t.serie === filterSerie;
    return searchOk && katOk && selOk && statOk && serieOk;
  });

  const toggle = (id) => {
    setVorhanden(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const gesamtwertFehlen = fehlende.reduce((s, t) => s + t.wert, 0);
  const legendaryFehlen = fehlende.filter(t => t.seltenheit === "legendary").length;
  const epicFehlen = fehlende.filter(t => t.seltenheit === "epic").length;

  const openSearch = (name, platform) => {
    const q = encodeURIComponent(name + " Tonie");
    const urls = {
      ka: `https://www.kleinanzeigen.de/s-${q}/k0`,
      ebay: `https://www.ebay.de/sch/i.html?_nkw=${q}`,
      vinted: `https://www.vinted.de/catalog?search_text=${q}`,
      tonies: `https://tonies.com/de-de/tonies/?q=${q}`,
    };
    window.open(urls[platform], "_blank");
  };

  const FilterBar = ({ liste }) => (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap", alignItems: "center" }}>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔎 Suchen..."
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "8px 12px", color: "#e8eaf6", fontSize: "13px", outline: "none", fontFamily: "inherit", width: "160px" }} />
      {[
        { val: filterKat, set: setFilterKat, opts: ALLE_KATEGORIEN, placeholder: "Kategorie" },
        { val: filterSel, set: setFilterSel, opts: ["Alle", "legendary", "epic", "rare", "common"], placeholder: "Seltenheit" },
        { val: filterStatus, set: setFilterStatus, opts: ["Alle", "verfügbar", "vergriffen", "bald"], placeholder: "Status" },
      ].map((f, i) => (
        <select key={i} value={f.val} onChange={e => f.set(e.target.value)}
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "8px 10px", color: "#e8eaf6", fontSize: "12px", outline: "none", fontFamily: "inherit", cursor: "pointer" }}>
          {f.opts.map(o => <option key={o} value={o} style={{ background: "#0d1428" }}>
            {o === "legendary" ? "Legendär" : o === "epic" ? "Episch" : o === "rare" ? "Selten" : o === "common" ? "Standard" : o === "verfügbar" ? "✅ Verfügbar" : o === "vergriffen" ? "🔴 Vergriffen" : o === "bald" ? "🟡 Bald" : o}
          </option>)}
        </select>
      ))}
      <span style={{ color: "#556080", fontSize: "12px" }}>{filtered(liste).length} Figuren</span>
    </div>
  );

  const Card = ({ t, showToggle = false }) => {
    const sel = SEL[t.seltenheit];
    const stat = STATUS_COLORS[t.status];
    const hat = vorhanden.has(t.id);
    return (
      <div style={{
        background: hat ? "rgba(76,175,80,0.07)" : sel.bg,
        border: `1px solid ${hat ? "rgba(76,175,80,0.3)" : sel.border}`,
        borderRadius: "10px", padding: "14px",
        boxShadow: hat ? "none" : sel.glow,
        opacity: hat ? 0.65 : 1,
        transition: "all 0.2s",
        position: "relative",
      }}>
        {t.seltenheit === "legendary" && !hat && (
          <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg,#FFD700,#FF8C00)", color: "#000", fontSize: "9px", fontWeight: "700", padding: "2px 7px", borderBottomLeftRadius: "7px", letterSpacing: "0.4px" }}>LEGENDÄR</div>
        )}
        <div style={{ fontSize: "10px", color: sel.color, fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" }}>{t.serie}</div>
        <div style={{ fontSize: "13px", fontWeight: "600", color: hat ? "#4CAF50" : "#e8eaf6", marginBottom: "8px", lineHeight: "1.3", textDecoration: hat ? "line-through" : "none" }}>{t.name}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "15px", fontWeight: "700", color: sel.color }}>~{t.wert} €</span>
          <span style={{ fontSize: "10px", color: stat.color, background: `${stat.color}18`, padding: "2px 7px", borderRadius: "10px", border: `1px solid ${stat.color}44` }}>{stat.label}</span>
        </div>
        {!hat && (
          <div style={{ display: "flex", gap: "4px", marginTop: "10px", flexWrap: "wrap" }}>
            {t.status === "vergriffen" ? (
              ["ka", "ebay", "vinted"].map(p => (
                <button key={p} onClick={() => openSearch(t.name, p)}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "5px", padding: "4px 7px", color: "#7986a8", fontSize: "10px", cursor: "pointer", fontFamily: "inherit", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                  {p === "ka" ? "KA" : p === "ebay" ? "eBay" : "Vinted"}
                </button>
              ))
            ) : (
              <button onClick={() => openSearch(t.name, "tonies")}
                style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "5px", padding: "4px 10px", color: "#4CAF50", fontSize: "10px", cursor: "pointer", fontFamily: "inherit" }}>
                → tonies.com
              </button>
            )}
            {showToggle && (
              <button onClick={() => toggle(t.id)}
                style={{ background: "rgba(79,195,247,0.1)", border: "1px solid rgba(79,195,247,0.3)", borderRadius: "5px", padding: "4px 8px", color: "#4FC3F7", fontSize: "10px", cursor: "pointer", fontFamily: "inherit", marginLeft: "auto" }}>
                ✓ Habe ich
              </button>
            )}
          </div>
        )}
        {hat && showToggle && (
          <button onClick={() => toggle(t.id)}
            style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.2)", borderRadius: "5px", padding: "4px 8px", color: "#FF7043", fontSize: "10px", cursor: "pointer", fontFamily: "inherit", marginTop: "8px", width: "100%" }}>
            ✗ Entfernen
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#080c18 0%,#0c1220 60%,#080c18 100%)", fontFamily: "'Georgia',serif", color: "#e8eaf6" }}>
      {/* HEADER */}
      <div style={{ borderBottom: "1px solid rgba(255,215,0,0.15)", padding: "28px 20px 20px", textAlign: "center", background: "radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.06) 0%, transparent 70%)" }}>
        <div style={{ fontSize: "36px", marginBottom: "6px" }}>🎧</div>
        <h1 style={{ fontSize: "26px", fontWeight: "700", background: "linear-gradient(135deg,#FFD700,#FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 4px", letterSpacing: "1px" }}>Tonies Master-Sammlung</h1>
        <p style={{ color: "#556080", fontSize: "13px", margin: "0 0 20px" }}>Patrick & Enna · {ALLE_TONIES.length} bekannte Figuren</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Vorhanden", value: vorhanden.size, icon: "✅", color: "#4CAF50" },
            { label: "Fehlen noch", value: fehlende.length, icon: "🔍", color: "#FF7043" },
            { label: "Fehlwert", value: `${gesamtwertFehlen.toLocaleString()} €`, icon: "💰", color: "#FFD700" },
            { label: "Legendär fehlt", value: legendaryFehlen, icon: "⭐", color: "#FFD700" },
            { label: "Episch fehlt", value: epicFehlen, icon: "💜", color: "#C77DFF" },
          ].map(s => (
            <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "10px 16px", textAlign: "center", minWidth: "80px" }}>
              <div style={{ fontSize: "18px" }}>{s.icon}</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "10px", color: "#556080", textTransform: "uppercase", letterSpacing: "0.4px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0 20px", overflowX: "auto" }}>
        {[
          { id: "fehlen", label: `🔍 Fehlt mir (${fehlende.length})` },
          { id: "vorhanden", label: `✅ Ich habe (${vorhanden.size})` },
          { id: "alle", label: `📋 Alle (${ALLE_TONIES.length})` },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "none", border: "none",
            borderBottom: tab === t.id ? "2px solid #FFD700" : "2px solid transparent",
            color: tab === t.id ? "#FFD700" : "#556080",
            padding: "14px 16px", cursor: "pointer", fontSize: "13px",
            fontWeight: tab === t.id ? "600" : "400",
            fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "20px" }}>
        {tab === "fehlen" && (
          <>
            <FilterBar liste={fehlende} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "10px" }}>
              {filtered(fehlende).sort((a, b) => {
                const order = { legendary: 0, epic: 1, rare: 2, common: 3 };
                return order[a.seltenheit] - order[b.seltenheit];
              }).map(t => <Card key={t.id} t={t} showToggle={true} />)}
            </div>
          </>
        )}
        {tab === "vorhanden" && (
          <>
            <FilterBar liste={vorhandene} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "10px" }}>
              {filtered(vorhandene).map(t => <Card key={t.id} t={t} showToggle={true} />)}
            </div>
          </>
        )}
        {tab === "alle" && (
          <>
            <FilterBar liste={ALLE_TONIES} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: "10px" }}>
              {filtered(ALLE_TONIES).sort((a, b) => {
                const order = { legendary: 0, epic: 1, rare: 2, common: 3 };
                return order[a.seltenheit] - order[b.seltenheit];
              }).map(t => <Card key={t.id} t={t} showToggle={true} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
