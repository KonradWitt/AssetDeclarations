task = """
Cel Zadania:
Twoim zadaniem jest przetworzenie tekstu polskiego oświadczenia majątkowego (dostarczonego jako wynik OCR) i wygenerowanie na jego obiektu JSON. Musisz ściśle przestrzegać dostarczonych modeli JSON oraz poniższych reguł. Kluczowa jest precyzja, dokładność i zgodność z formatem oraz językiem polskim.


Dane Wejściowe:
Otrzymasz tekst będący wynikiem OCR dokumentu oświadczenia majątkowego polskiego polityka. Tekst będzie w języku polskim i może zawierać typowe dla OCR artefakty lub błędy, które należy zignorować lub zinterpretować w kontekście.

Otrzymasz równieź plik CSV. Z pliku CSV musisz odczytać imię osoby, link do PDF oraz link do obrazu. Odpowiadają one późniejszym polom Person.name, AssetDeclaration.documentUrl oraz Person.imageUrl.


Dane Wyjściowe:
Masz zwrócić model JSON Person, który będzie zawierał należące do danej osoby oświadczenie majątkowe (Asset Declaration).

Modele JSON (Schematy):
Musisz ściśle przestrzegać struktury następujących modeli JSON.
Person
AssetDeclaration
CashPosition
SecurityPosition
RealEstate
Liability
PersonalProperty
Income
Receivable
BusinessActivity

Kluczowe Zasady i Wymagania:


Brak ID: Absolutnie nie wypełniaj pola id w żadnym generowanym obiekcie JSON (ani w Person, ani w AssetDeclaration, ani w żadnym obiekcie zagnieżdżonym jak CashPosition, RealEstate itp.). Pola te mają pozostać niewypełnione lub zostać całkowicie pominięte w wynikowym JSON. Podobnie, nie wypełniaj pól assetDeclarationId w obiektach zagnieżdżonych oraz pola personId w obiekcie AssetDeclaration.
Język Polski: Cała treść generowana w JSON, która ma charakter tekstowy (np. wartości pól description, name, legalTitle, businessName, businessType, currency dla niestandardowych walut) musi być w języku polskim.
Poprawność Językowa: Zwróć szczególną uwagę na poprawność ortograficzną i gramatyczną wszystkich tekstów w języku polskim w wygenerowanym JSON.
Dokładność Danych: Precyzyjnie ekstrahuj wszystkie wartości liczbowe (kwoty, powierzchnie, ilości) i tekstowe (opisy, nazwy, tytuły prawne) z dokumentu źródłowego. Nie zaokrąglaj kwot, chyba że w dokumencie źródłowym są podane w formie przybliżonej (np. "około").
Obsługa "Nie dotyczy": Jeżeli w oświadczeniu dana sekcja lub rubryka jest oznaczona jako "Nie dotyczy" lub jest pusta, odpowiadający jej atrybut w JSON powinien być null (dla pojedynczych wartości) lub pustą tablicą [] (dla list/tablic obiektów, np. cashPositions, realEstate itp.).
Kompletność: Staraj się wyekstrahować wszystkie informacje pasujące do modeli JSON, które są obecne w oświadczeniu.
Jeżeli w dokumencie wejściowym znajduje się również korekta do oświadczenia majątkowego, wszystkie dane uwzględnione w korekcie powinny być potraktowane jako ważniejsze i zastępujące dane sprzed korekty.

Szczegółowe Instrukcje dla Poszczególnych Modeli i Pól:


Person:
name: Wyekstrahuj pełne imię i nazwisko osoby składającej oświadczenie (np. "Sławomir Jerzy Mentzen"). Imię ma pochodzić z pliku CSV, ale jeżli informacja w pliku CSV i w oświadczeniu majątkowym się nie zgadza, zwróć błąd.Nie zwracaj błędu jedynie jeżeli różnica wynika z uwzględnienia drugiego imienia w jednym ze źródeł - w takim przypadku kontynuuj z imieniem zgodnie z plikiem CSV.
dateOfBirth: Wyekstrahuj datę urodzenia. W oświadczeniu będzie prawdopodobnie w formacie DD.MM.RRRR (np. "20.11.1986"). Przekonwertuj ją do formatu YYYY-MM-DDTHH:mm:ss, używając T00:00:00 jako części czasowej (np. "1986-11-20T00:00:00").
placeOfBirth: Wyekstrahuj miejsce urodzenia (np. "w Toruniu" -> "Toruń").
imageUrl będzie dostarczone razem z danymi wejściowymi.
assetDeclarations: lista oświadczeń majątkowych. W Twoim wynikowym JSONie, ta lista powinna mieć jeden element.
Pozostałe pola (partyId,  isHighlight) pozostaw jako null lub zgodnie z ich domyślnymi wartościami w modelu, chyba że informacja jest dostępna (co jest mało prawdopodobne w typowym oświadczeniu).


AssetDeclaration:
date: Wyekstrahuj datę złożenia oświadczenia. Zazwyczaj znajduje się na końcu dokumentu obok podpisu (np. "22 kwietnia 2024 r."). Przekonwertuj ją do formatu YYYY-MM-DDTHH:mm:ss (np. "2024-04-22T00:00:00").
documentUrl: będzie dostarczone razem z danymi wejściowymi.


cashPositions (Tablica CashPosition):
Znajdź sekcję "Zasoby pieniężne" To sekcja oznaczona rzymskim numerem I.
Dla każdej pozycji:
currency: Kod waluty (np. "PLN", "EUR", "USD", "GBP"). Obsłuż również kryptowaluty (np. "BTC", "ETH") oraz inne specyficzne tokeny wymienione w oświadczeniu (np. "OmegaEUR", "KangaCoin").
currencyValue: Wartość w danej walucie (liczba zmiennoprzecinkowa).
baseValue: Wartość przeliczona na PLN. Wypełnij tę wartość tylko wtedy, gdy jest ona jawnie podana w oświadczeniu (np. "33,7 Bitcoinów o wartości 5 652 501 zł" -> currency: "BTC", currencyValue: 33.7, baseValue: 5652501.0). Jeśli wartość w PLN nie jest podana dla waluty obcej, postaraj przeliczyć ją po średnim kursie NBP z daty oświadczenia majątkowego lub dla kursu wymiany z jak najbliższej daty do daty wypełnienia oświadczenia. Dla PLN, baseValue jest równe currencyValue.


securityPositions (Tablica SecurityPosition):
Znajdź sekcje dotyczące papierów wartościowych, akcji i udziałów w spółkach handlowych (często sekcje I, IV, V).
Dla każdej pozycji:
name: Opis papieru wartościowego, akcji lub udziału, w tym nazwa emitenta/spółki (np. "Akcje Mirbud SA", "Udziały Kancelaria Mentzen sp. z o.o.").
quantity: Liczba posiadanych jednostek (jako string lub liczba, model dopuszcza string?, więc preferuj string, np. "7500", "1000").
value: Wartość pakietu. Jeśli w oświadczeniu podana jest tylko liczba/ilość, a nie wartość, ustaw value na null. Czasem podana jest wartość nominalna/wniesiona i wartość rynkowa/szacunkowa - użyj tej drugiej, jeśli jest dostępna jako główna wartość pakietu.


realEstate (Tablica RealEstate):
Znajdź sekcję "Nieruchomości" (często sekcja II).
Dla każdej nieruchomości (dom, mieszkanie, działka, inne):
description: Krótki opis, zawierający typ nieruchomości, powierzchnię użytkową, powierzchnię działki (jeśli dotyczy), ewentualnie adres (jeśli nie jest zamazany). Np. "Dom 370 m² na działce 1175 m²".
value: Wartość nieruchomości podana w oświadczeniu.
legalTitle: Tytuł prawny (np. "współwłasność małżeńska", "własność", "użytkowanie wieczyste").
liabilities (Tablica Liability):


Znajdź sekcję "Zobowiązania pieniężne" (często sekcja XI).
Dla każdego zobowiązania (kredyt, pożyczka) powyżej 10 000 zł:
description: Opis zobowiązania, w tym rodzaj (np. "Kredyt hipoteczny"), cel (np. "na zakup domu"), wierzyciela (np. "w ING Bank Śląski"). Jeśli zobowiązanie jest w walucie obcej, zaznacz to w opisie (np. "Umowa ... kwoty 230 000 EUR z ...").
value: Wartość zobowiązania. Zazwyczaj podawana jest kwota pozostała do spłaty lub pierwotna kwota zobowiązania. Użyj wartości podanej w oświadczeniu. Jeśli zobowiązanie jest w walucie obcej, zapisz wartość liczbową w tej walucie (np. 230000.0 dla zobowiązania w EUR).


personalProperties (Tablica PersonalProperty):
Znajdź sekcję "Składniki mienia ruchomego" o wartości powyżej 10 000 zł (często sekcja X).
Dla każdego składnika:
description: Opis mienia (np. "Samochód Mercedes Coupe Klasy E, rok 2022", "Zabudowa kuchenna", "Pozostałe meble i sprzęt elektroniczny").
value: Wartość składnika podana w oświadczeniu. Jeśli wartość nie jest podana, ustaw value na null. Dla wartości przybliżonych (np. "około 200 000 zł"), zapisz wartość liczbową (200000.0).


incomes (Tablica Income):
Znajdź sekcję "Inne dochody" (sekcja IX)
Dla każdego źródła dochodu:
description: Opis źródła dochodu.
yearlyValue: Roczna kwota dochodu z danego źródła. Użyj wartości podanej w oświadczeniu (często jest to dochód za rok ubiegły).


receivables (Tablica Receivable):
Znajdź sekcję "Wierzytelności pieniężne" (często w sekcji XI lub X lub jako osobna część).
Dla każdej wierzytelności powyżej 10 000 zł:
description: Opis wierzytelności (np. "Pożyczka udzielona osobie fizycznej", "Pożyczka udzielona osobie prawnej").
value: Wartość wierzytelności.


businessActivities (Tablica BusinessActivity):
Znajdź sekcję dotyczącą prowadzenia działalności gospodarczej lub udziału w spółkach (sekcje III do IIX)
Dla każdej prowadzonej (nawet zawieszonej) działalności:
businessName: Nazwa firmy lub opis (np. "Jednoosobowa działalność gospodarcza Sławomir Mentzen").
businessType: Forma prawna (np. "jednoosobowa działalność gospodarcza", "spółka cywilna").
description: Dodatkowe informacje, np. przedmiot działalności, pełniona funkcja
income: Dochód (lub przychód, jeśli dochód nie jest podany) osiągnięty z tej działalności w roku ubiegłym. W oświadczeniu mogą być podane obie wartości - priorytetem jest "Dochód".

Kontrola Jakości:
Po wygenerowaniu obu obiektów JSON:
Sprawdź Zgodność ze Schematem: Upewnij się, że struktura JSON jest dokładnie taka, jak w dostarczonych modelach.
Sprawdź Brak ID: Potwierdź, że żadne pole id nie zostało wypełnione.

Sprawdź Język i Poprawność: Przeczytaj wszystkie wartości tekstowe w JSON, aby upewnić się, że są w języku polskim i nie zawierają błędów ortograficznych ani gramatycznych.

Sprawdź Dokładność Wartości: Porównaj kluczowe wartości liczbowe i opisy z dokumentem źródłowym.

Sprawdź Kompletność: Upewnij się, że wszystkie istotne sekcje oświadczenia zostały uwzględnione.

Sprawdź przejrzystośc: Jeżli niektóre dane są zbyt opisowe i dałoby się je uprościc nie tracąc informacji, możesz je uprościć. Na przykład: jeżeli osoba deklaruje 20 różnych rodzajów obligacji skarbowych i wypisuje nazwy każdej z nich, możesz je pogrupować w jeden element nazwany po prostu “opbligacje skarbowe” i zsumować ich wartość. Ta sama zasada ma zastosowanie przy opisach nieruchomości lub jakiekolwiek innej pozycji - jeżli jest zbyt opisowa, możesz ją uprościć.

Pytania i Niejasności:
Jeśli napotkasz jakiekolwiek niejasności w tekście źródłowym lub w interpretacji zasad, lepiej zadać pytanie wyjaśniające, niż wygenerować niepoprawne dane.

Twoją odpowiedzią powinien być tylko i wyłącznie wynikowy obiekt JSON. Jeżeli napotkasz jakikolwiek problem lub będziesz miał jakąkolwiek wątpliwość, nie zwracaj obiektu JSON, a zamiast tego rozpocznij wiadomość zwrotną od “error”, a później opisz w czym problem.
"""


test ="""
{
  "name": "Andrzej Adamczyk",
  "dateOfBirth": "1959-01-04T00:00:00",
  "placeOfBirth": "Krzeszowice",
  "imageUrl": "https://orka.sejm.gov.pl/Poslowie10.nsf/0/88B85DA957FD27D3C1258A51003B9AFF/$File/001.jpg",
  "assetDeclarations": [
    {
      "date": "2024-04-29T00:00:00",
      "documentUrl": "https://orka.sejm.gov.pl/osw10.nsf/0/C921BFB762E770D8C1258B1600300D89/%24File/OSW101_001.pdf",
      "cashPositions": [
        {
          "currency": "PLN",
          "currencyValue": 446015.08,
          "baseValue": 446015.08,
          "description": "wspólność majątkowa"
        },
        {
          "currency": "EUR",
          "currencyValue": 3100.0,
          "baseValue": 13391.69,
          "description": "wspólność majątkowa"
        },
        {
          "currency": "USD",
          "currencyValue": 420.0,
          "baseValue": 1692.56,
          "description": "wspólność majątkowa"
        }
      ],
      "securityPositions": [
        {
          "name": "Udziały w Spółka z o.o. Agrokompleks w Sance",
          "quantity": "342",
          "value": 17100.0
        }
      ],
      "realEstate": [
        {
          "description": "Dom o powierzchni 187,1 m²",
          "value": 520000.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Działki budowlane (11,20 a i 8,58 a)",
          "value": 350000.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Udziały w działkach drogowych (nr 3: 84/1176 z 2,142 a; nr 5: 1/2 z 0,84 a)",
          "value": 2000.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Udział 1/4 w działce drogowej (nr 4: 0,365 a)",
          "value": 400.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Udział 84/1176 w działce drogowej (nr 6: 1 a)",
          "value": 500.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Działka budowlana (nr 7: 6,77 a)",
          "value": 120000.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Udział 1/2 w działce (nr 8: 0,30 a)",
          "value": 2000.0,
          "legalTitle": "Własność"
        },
        {
          "description": "Działka (nr 9: 0,46 a)",
          "value": 8000.0,
          "legalTitle": "Własność"
        }
      ],
      "liabilities": [],
      "personalProperties": [
        {
          "description": "Samochód osobowy Volkswagen Passat 2.0 TDI, rok produkcji 2005",
          "value": null
        },
        {
          "description": "Samochód osobowy Audi A6, rok produkcji 2013",
          "value": null
        }
      ],
      "incomes": [
        {
          "description": "Dieta parlamentarna",
          "yearlyValue": 45679.92
        },
        {
          "description": "Dochód uzyskany w Ministerstwie Infrastruktury",
          "yearlyValue": 247112.64
        },
        {
          "description": "Dochód z udziałów w Spółka z o.o. Agrokompleks w Sance",
          "yearlyValue": 5000.0
        }
      ],
      "receivables": [],
      "businessActivities": []
    }
  ]
}
"""