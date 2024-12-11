import { useState } from "react";
import add from "../../images/add.png";
import edit from "../../images/edit.png";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Main/components/Popup/Popup";
import NewCard from "../../components/Main/components/Popup/components/NewCard/NewCard";
import EditProfile from "../../components/Main/components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "../../components/Main/components/Popup/components/EditAvatar/EditAvatar";
import Card from "../../components/Main/components/Card/Card";

function Main() {
  const [popup, setPopup] = useState(null);
  const newCardPopup = { title: "New card", children: <NewCard /> };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = {
    title: "Alterar a foto do perfil",
    children: <EditAvatar />,
  };

  const cards = [
    {
      isLiked: false,
      _id: "5d1f0611d321eb4bdcd707dd",
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: "2019-07-05T08:10:57.741Z",
    },
    {
      isLiked: false,
      _id: "5d1f064ed321eb4bdcd707de",
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
      owner: "5d1f0611d321eb4bdcd707dd",
      createdAt: "2019-07-05T08:11:58.324Z",
    },
  ];

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-container">
            <img alt="Avatar" className="profile__image" />
            <button
              className="profile__edit-avatar-button"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__info-name-edit-button">
              <p className="profile__info-name"></p>

              <button
                className="profile__edit-button"
                onClick={() => handleOpenPopup(editProfilePopup)}
              >
                <img src={edit} alt="Editar" />
              </button>
            </div>
            <p className="profile__info-sobre-mim"></p>
          </div>

          <button
            className="profile__add-button"
            onClick={() => handleOpenPopup(newCardPopup)}
          >
            <img src={add} alt="Adicionar" />
          </button>
        </section>
        <section className="elements">
          {/* ---- card template ----- */}

          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={handleOpenPopup}
            />
          ))}
        </section>

        <Footer />
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </main>
    </>
  );
}

export default Main;
