import React from "react";
import Header from "./components/Header";
import styled from "styled-components";
import "./App.css";
import CardList from "./components/CardList";

const ReadCheckbox = styled.input`
  margin-left: 1rem;
  margin-top: 1rem;
`;

function App() {
  const [isReadMode, setReadMode] = React.useState(false);
  const [isAddMode, setAddMode] = React.useState(false);
  const [cardsData, setCardsData] = React.useState([
    {
      id: 2314,
      header: "Great News",
      text:
        "Импликация, следовательно, контролирует бабувизм, открывая новые горизонты.",
    },
    {
      id: 4656,
      header: "Hello",
      text:
        "Интеллект естественно понимает под собой интеллигибельный закон внешнего мира.",
    },
    {
      id: 3442,
      header: "My little friend",
      text:
        "Отсюда естественно следует, что автоматизация дискредитирует предмет деятельности.",
    },
    {
      id: 6891,
      header: "Parapapa",
      text: "Сомнение рефлектирует естественный закон исключённого третьего.",
    },
    {
      id: 1743,
      header: "Cool headar",
      text:
        "Наряду с этим ощущение мира решительно контролирует непредвиденный гравитационный парадокс.",
    },
    {
      id: 5124,
      header: "False confidence",
      text: " Смысл жизни, следовательно, творит данный закон внешнего мира.",
    },
    {
      id: 2733,
      header: "Lol",
      text:
        "Апостериори, гравитационный парадокс амбивалентно понимает под собой интеллигибель.",
    },
    {
      id: 5473,
      header: "Wgite lor",
      text: "Дискретность амбивалентно транспонирует гравитационный парадокс.",
    },
  ]);
  const cardsToRemove = [];
  const changeCard = (id) => (newData) => {
    const cards = cardsData.map((card) => {
      if (card.id === id) {
        card.header = newData.header;
        card.text = newData.text;
      }
      return card;
    });
    setCardsData(cards);
  };

  const setRemove = (id) => () => {
    const index = cardsToRemove.indexOf(id);
    if (index === -1) {
      cardsToRemove.push(id);
    } else {
      cardsToRemove.splice(index, 1);
    }
  };

  const [values, setValues] = React.useState({
    header: "",
    text: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div>
      <Header></Header>
      <div>
        <ReadCheckbox
          type="checkbox"
          onChange={() => setReadMode(!isReadMode)}
        />
        <label>"Режим чтения"</label>
        <input
          type="button"
          value={isAddMode ? "Добавить" : "Добавить новый элемент"}
          onClick={() => {
            if (isAddMode) {
              cardsData.push({
                id: Math.floor(Math.random() * (9999 - 1000)) + 1000,
                header: values.header,
                text: values.text,
              });
              setValues({
                header: "",
                text: "",
              });
              setAddMode(false);
            } else {
              setAddMode(true);
            }
          }}
          style={{ margin: "1rem" }}
        />
        {isAddMode && (
          <input
            type="button"
            value="Отмена"
            onClick={() => {
              setValues({
                header: "",
                text: "",
              });
              setAddMode(false);
            }}
          />
        )}
        <input
          type="button"
          value="Удалить выделенные элементы"
          onClick={() => {
            setCardsData(
              cardsData.filter((card) => !cardsToRemove.includes(card.id))
            );
            cardsToRemove.splice(0, cardsToRemove.length);
          }}
          style={{ margin: "1rem" }}
        />
      </div>
      {isAddMode && (
        <div>
          <input
            type="text"
            onChange={handleChange("header")}
            style={{ margin: "5px" }}
          />
          <textarea
            style={{ margin: "5px", resize: "none", width: "90%" }}
            rows="10"
            onChange={handleChange("text")}
          ></textarea>
        </div>
      )}
      <CardList
        isReadMode={isReadMode}
        cardsData={cardsData}
        changeCard={changeCard}
        setRemove={setRemove}
      />
    </div>
  );
}

export default App;
