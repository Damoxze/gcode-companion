const gcodeDescriptions = {
  G0: "Szybki ruch bez cięcia",
  G1: "Ruch roboczy – cięcie z określoną prędkością",
  G2: "Ruch po łuku zgodnie z ruchem wskazówek",
  G3: "Ruch po łuku przeciwnie do ruchu wskazówek",
  G4: "Zatrzymanie (czasowe)",
  G10: "Ustawienie wartości narzędzia lub układu współrzędnych",
  G17: "Wybór płaszczyzny XY",
  G18: "Wybór płaszczyzny XZ",
  G19: "Wybór płaszczyzny YZ",
  G20: "Jednostki w calach",
  G21: "Jednostki w milimetrach",
  G28: "Powrót do punktu odniesienia",
  G30: "Drugi punkt odniesienia",
  G40: "Anuluj kompensację promienia narzędzia",
  G41: "Kompensacja promienia – lewa strona",
  G42: "Kompensacja promienia – prawa strona",
  G43: "Kompensacja długości narzędzia (dodatnia)",
  G49: "Anuluj kompensację długości",
  G53: "Ruch w układzie maszynowym",
  G54: "Układ współrzędnych 1",
  G55: "Układ współrzędnych 2",
  G56: "Układ współrzędnych 3",
  G57: "Układ współrzędnych 4",
  G58: "Układ współrzędnych 5",
  G59: "Układ współrzędnych 6",
  G80: "Anuluj cykl wiercenia",
  G81: "Cykl wiercenia",
  G82: "Cykl wiercenia z zatrzymaniem",
  G83: "Wiercenie głębokie (peck drilling)",
  G84: "Gwintowanie",
  G90: "Pozycjonowanie absolutne",
  G91: "Pozycjonowanie przyrostowe",
  G92: "Ustaw aktualną pozycję jako zadaną",
  G94: "Prędkość posuwu w mm/min",
  G95: "Prędkość posuwu na obrót wrzeciona",
  G98: "Powrót do punktu początkowego po cyklu",
  G99: "Powrót do punktu R po cyklu",
  M0: "Zatrzymanie programu – pauza",
  M1: "Zatrzymanie warunkowe (opcjonalne)",
  M2: "Koniec programu (Fanuc)",
  M3: "Włącz wrzeciono zgodnie z ruchem wskazówek",
  M4: "Włącz wrzeciono przeciwnie do ruchu wskazówek",
  M5: "Wyłącz wrzeciono",
  M6: "Zmiana narzędzia",
  M8: "Włącz chłodziwo",
  M9: "Wyłącz chłodziwo",
  M19: "Pozycjonowanie wrzecona",
  M30: "Koniec programu i przewinięcie",
  M98: "Wywołanie podprogramu",
  M99: "Powrót z podprogramu / pętla"
};


function interpretGcode() {
  const input = document.getElementById("gcode-input").value;
  const lines = input.split("\n");
  let output = "";

  lines.forEach((line, index) => {
    const original = line.trim();
    if (!original) return;

    const words = original.split(" ");
    let explanation = `<div><strong>🔹 Linia ${index + 1}:</strong> <code>${original}</code><br/>`;

    words.forEach(word => {
      const code = word.toUpperCase().match(/^([A-Z]+)([0-9]+)$/);
      if (code) {
        const command = code[1] + code[2];
        if (gcodeDescriptions[command]) {
          explanation += `<span class="cmd" title="${gcodeDescriptions[command]}">${command}</span>: <span class="desc">${gcodeDescriptions[command]}</span><br/>`;
        } else {
          explanation += `<span class="cmd unknown">${command}</span>: <span class="desc">❓ Nieznana komenda</span><br/>`;
        }
      }
    });

    explanation += `</div><br/>`;
    output += explanation;
  });

  document.getElementById("output").innerHTML = output;
}



function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');

  // Zapamiętaj preferencję
  if (body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'true');
  } else {
    localStorage.setItem('darkMode', 'false');
  }
}

// Załaduj tryb ciemny przy starcie, jeśli był zapamiętany
window.addEventListener('DOMContentLoaded', () => {
  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  if (darkModeEnabled) {
    document.body.classList.add('dark');
  }
});
