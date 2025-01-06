import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    api.getInitialCards().then((apiCards) => setCards(apiCards));
  }, []);

  useEffect(() => {
    api.getUserInfo().then((apiUser) => setCurrentUser(apiUser));
  }, []);

  async function handleCardDelete(card) {
    api.deleteCard(card._id).then((res) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
    // Verificar mais uma vez se esse cartão já foi curtido
  }

  async function handleCardLike(card) {
    // Verificar mais uma vez se esse cartão já foi curtido
    const isLiked = card.isLiked;

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleUpdateUser(data) {
    await api.setUserInfo(data).then((newData) => {
      setCurrentUser(newData);
    });
    handleClosePopup();
  }

  async function handleUpdateAvatar(avatar) {
    await api.profilePictureUpdate(avatar).then((newData) => {
      setCurrentUser(newData);
    });
    handleClosePopup();
  }

  const handleAddPlaceSubmit = async (newCard) => {
    console.log(newCard);
    await api.addNewCard(newCard.name, newCard.link).then((newCard) => {
      setCards([newCard, ...cards]);
    });
    handleClosePopup();
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    console.log(cards),
    (
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <div className="page">
          <Header />
          <Main
            handleCardLike={handleCardLike}
            cards={cards}
            onCardDelete={handleCardDelete}
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            popup={popup}
          />
        </div>
      </CurrentUserContext.Provider>
    )
  );
}

export default App;
