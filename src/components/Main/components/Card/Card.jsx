import Trash from "../../../../images/Trash.png";
import like from "../../../../images/like.png";
import ImagePopup from "../../../../components/Main/components/Popup/components/ImagePopup/ImagePopup";

export default function Card(props) {
  const { name, link /* isLiked */ } = props.card;
  const { handleOpenPopup } = props;
  const imageComponent = { children: <ImagePopup card={props.card} /> };

  return (
    <div className="elements__box">
      <img src={Trash} alt="lixeira" className="elements__trash" />
      <img
        src={link}
        alt={name}
        className="elements__image"
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <div className="elements__contaner-title-like">
        <h3 className="elements__title">{name}</h3>
        <img className="elements__like" src={like} alt="like" />
      </div>
    </div>
  );
}
