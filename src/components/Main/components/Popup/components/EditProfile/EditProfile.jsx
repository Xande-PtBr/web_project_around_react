export default function EditProfile() {
  return (
    <form className="popup__form">
      <input
        type="text"
        className="popup__form-input popup__input-name"
        id="name-input"
        name="name"
        placeholder="Nome"
        required
        minLength="2"
        maxLength="40"
      />
      <span id="name-input-error" className="popup__message-input-error"></span>
      <input
        type="text"
        className="popup__form-input popup__input-sobre-mim"
        id="about-input"
        name="about"
        placeholder="Sobre mim"
        required
        minLength="2"
        maxLength="200"
      />
      <span
        id="about-input-error"
        className="popup__message-input-error"
      ></span>
      <button type="submit" className="popup__button-save">
        Salvar
      </button>
    </form>
  );
}
