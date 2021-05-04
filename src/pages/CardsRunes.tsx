import { useState, useEffect } from "react";
import { CardRune } from "../types";
import Card from "../components/UI/Card";
import SearchBar from "../components/UI/Searchbar";
import LoadingCards from "../components/UI/LoadingCards";

type CardsRunesProps = {
  cardsRunes: Array<CardRune>;
  setCardsRunes: Function;
  cardsRunesLoaded: Boolean;
  setCardsRunesLoaded: Function;
};

function CardsRunes({
  cardsRunes,
  setCardsRunes,
  cardsRunesLoaded,
  setCardsRunesLoaded,
}: CardsRunesProps) {
  const [search, setSearch] = useState<string>("");

  async function loadCardsRunes() {
    fetch("cards-runes.json")
      .then((response) => response.json())
      .then((initialItems: any) => {
        setCardsRunesLoaded(true);
        setCardsRunes(initialItems);
      });
  }

  useEffect(() => {
    loadCardsRunes();
  });
  return (
    <>
        <SearchBar placeholder="XVIII - The Moon" onChange={setSearch} />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {!cardsRunesLoaded && <LoadingCards number={20} />}
          {cardsRunesLoaded && (
            <>
              {cardsRunes
                .filter((cardsRune) =>
                  cardsRune.name.toLowerCase().includes(search)
                )
                .map((cardsRune) => (
                  <Card
                    key={cardsRune.name}
                    image={cardsRune.image}
                    name={cardsRune.name}
                    description={cardsRune.description}
                    message={cardsRune.message}
                    unlock={cardsRune.unlock ?? "Always available"}
                  />
                ))}
            </>
          )}
        </div>
    </>
  );
}

export default CardsRunes;